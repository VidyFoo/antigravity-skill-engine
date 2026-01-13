# TEMPLATE_ANTIGRAVITY 私有模板仓库 + 自动同步体系落地指南

> 适用仓库：`CORE_PUBLIC = https://github.com/VidyFoo/antigravity-skill-engine`（分支 `main`）
> 目标模板仓库：`VidyFoo/TEMPLATE_ANTIGRAVITY`（私有 + template）

本指南按阶段给出 **可复制粘贴的命令**、**需要的 GitHub UI 路径**、以及 **所有新增/修改文件的完整内容**。默认分支为 `main`，如实际不同请将所有 `main` 替换为实际默认分支。

## ✅ 已直接落地的模板文件位置
本仓库已内置 **可直接复制** 的模板文件，请使用以下目录作为真实模板内容来源：  
`template/`（包含 `.github/workflows/`、`scaffold/`、`README.template.md`、`.gitignore` 等完整文件）。

---

## 阶段 1：创建 TEMPLATE_ANTIGRAVITY（私有 + template）

### 1.1 使用 GitHub CLI 创建私有仓库
```bash
gh repo create VidyFoo/TEMPLATE_ANTIGRAVITY --private --confirm
```

### 1.2 在 GitHub UI 勾选 Template repository
路径：
- **GitHub → VidyFoo/TEMPLATE_ANTIGRAVITY → Settings → General → Template repository（勾选）**

### 1.3 克隆并初始化目录结构
```bash
# 克隆
mkdir -p ~/work
cd ~/work
git clone https://github.com/VidyFoo/TEMPLATE_ANTIGRAVITY.git
cd TEMPLATE_ANTIGRAVITY

# 初始化目录结构
mkdir -p core overlay scaffold .github/workflows
```

---

## 阶段 2：把 CORE_PUBLIC 同步进 TEMPLATE_ANTIGRAVITY/core（subtree）
在 TEMPLATE_ANTIGRAVITY 仓库目录执行：
```bash
# 添加 core 上游
 git remote add core-upstream https://github.com/VidyFoo/antigravity-skill-engine.git
 git fetch core-upstream

# subtree 导入 core/
 git subtree add --prefix=core core-upstream/main --squash

# 首次提交
 git add -A
 git commit -m "chore: add core subtree"
 git push origin main
```

---

## 阶段 3：实现组装脚本 scaffold/assemble.mjs

**说明**
- Node.js 18+。
- 不依赖额外 npm 包。
- 作用：组装 `core/ + overlay/` 到仓库根，并完成变量替换与模板目录迁移。

### 3.1 新建文件：`scaffold/assemble.mjs`
```js
#!/usr/bin/env node
import fs from "fs";
import path from "path";

const repoRoot = process.cwd();
const assembledFlag = path.join(repoRoot, ".assembled");
const coreDir = path.join(repoRoot, "core");
const overlayDir = path.join(repoRoot, "overlay");
const scaffoldDir = path.join(repoRoot, "scaffold");
const templateReadme = path.join(repoRoot, "README.template.md");
const templateDir = path.join(repoRoot, ".template");

const TEMPLATE_MANAGED = new Set([
  "core",
  "overlay",
  "scaffold",
  "README.template.md",
  ".template",
  ".assembled",
]);

const TEMPLATE_MANAGED_WORKFLOWS = new Set([
  "sync-core.yml",
  "first-boot-assemble.yml",
  "propagate-downstream.yml",
]);

const TEXT_EXTENSIONS = new Set([
  ".md",
  ".markdown",
  ".txt",
  ".json",
  ".yml",
  ".yaml",
  ".js",
  ".mjs",
  ".cjs",
  ".ts",
  ".tsx",
  ".css",
  ".scss",
  ".html",
]);

const CONFIG_FILE = path.join(scaffoldDir, "config.json");
const CONFIG_EXAMPLE_FILE = path.join(scaffoldDir, "config.example.json");

function log(message) {
  process.stdout.write(`${message}\n`);
}

function exists(filePath) {
  try {
    fs.accessSync(filePath);
    return true;
  } catch {
    return false;
  }
}

function ensureDir(dirPath) {
  if (!exists(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function copyFileSync(source, target) {
  ensureDir(path.dirname(target));
  fs.copyFileSync(source, target);
}

function shouldCopyFromCore(relativePath) {
  if (!relativePath) return false;
  const parts = relativePath.split(path.sep);
  if (parts.length === 0) return false;
  if (TEMPLATE_MANAGED.has(parts[0])) return false;
  return true;
}

function copyDirectory(sourceDir, targetDir, filterFn) {
  if (!exists(sourceDir)) return;
  const entries = fs.readdirSync(sourceDir, { withFileTypes: true });
  for (const entry of entries) {
    const sourcePath = path.join(sourceDir, entry.name);
    const relativePath = path.relative(sourceDir, sourcePath);
    if (filterFn && !filterFn(relativePath, entry)) {
      continue;
    }
    const targetPath = path.join(targetDir, entry.name);
    if (entry.isDirectory()) {
      ensureDir(targetPath);
      copyDirectory(sourcePath, targetPath, filterFn ? (innerPath, innerEntry) => {
        const combined = path.join(entry.name, innerPath);
        return filterFn(combined, innerEntry);
      } : undefined);
    } else if (entry.isFile()) {
      copyFileSync(sourcePath, targetPath);
    }
  }
}

function copyCore() {
  if (!exists(coreDir)) {
    throw new Error("core/ 目录不存在，无法组装。");
  }
  const entries = fs.readdirSync(coreDir, { withFileTypes: true });
  for (const entry of entries) {
    const relativePath = entry.name;
    if (!shouldCopyFromCore(relativePath)) {
      continue;
    }
    const sourcePath = path.join(coreDir, entry.name);
    const targetPath = path.join(repoRoot, entry.name);
    if (entry.isDirectory()) {
      ensureDir(targetPath);
      if (entry.name === ".github") {
        copyDirectory(sourcePath, targetPath, (relativePath, innerEntry) => {
          if (!relativePath) return true;
          const normalized = relativePath.split(path.sep).join("/");
          if (normalized.startsWith("workflows/")) {
            const parts = normalized.split("/");
            const fileName = parts[parts.length - 1];
            if (TEMPLATE_MANAGED_WORKFLOWS.has(fileName)) {
              return false;
            }
          }
          return true;
        });
      } else {
        copyDirectory(sourcePath, targetPath);
      }
    } else if (entry.isFile()) {
      copyFileSync(sourcePath, targetPath);
    }
  }
}

function copyOverlay() {
  if (!exists(overlayDir)) {
    log("overlay/ 不存在，跳过覆盖步骤。");
    return;
  }
  copyDirectory(overlayDir, repoRoot);
}

function loadConfig() {
  let configPath = CONFIG_FILE;
  if (!exists(CONFIG_FILE)) {
    log("未找到 scaffold/config.json，将使用 scaffold/config.example.json 作为变量来源。");
    configPath = CONFIG_EXAMPLE_FILE;
  }
  if (!exists(configPath)) {
    log("未找到配置文件，变量替换将被跳过。");
    return {};
  }
  const raw = fs.readFileSync(configPath, "utf8");
  return JSON.parse(raw);
}

function isTextFile(filePath) {
  return TEXT_EXTENSIONS.has(path.extname(filePath).toLowerCase());
}

function replaceTokensInFile(filePath, replacements) {
  if (!isTextFile(filePath)) return;
  const original = fs.readFileSync(filePath, "utf8");
  let updated = original;
  for (const [key, value] of Object.entries(replacements)) {
    const token = `{{${key}}}`;
    updated = updated.split(token).join(String(value));
  }
  if (updated !== original) {
    fs.writeFileSync(filePath, updated, "utf8");
  }
}

function walkAndReplace(dirPath, replacements) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      if (TEMPLATE_MANAGED.has(entry.name)) {
        continue;
      }
      walkAndReplace(fullPath, replacements);
    } else if (entry.isFile()) {
      if (fullPath.includes(`${path.sep}.git${path.sep}`)) continue;
      if (fullPath.includes(`${path.sep}.template${path.sep}`)) continue;
      replaceTokensInFile(fullPath, replacements);
    }
  }
}

function moveTemplateAssets() {
  ensureDir(templateDir);
  const itemsToMove = [
    "core",
    "overlay",
    "scaffold",
    "README.template.md",
  ];
  for (const item of itemsToMove) {
    const source = path.join(repoRoot, item);
    if (!exists(source)) continue;
    const target = path.join(templateDir, item);
    fs.renameSync(source, target);
  }
}

function moveTemplateWorkflows() {
  const workflowsDir = path.join(repoRoot, ".github", "workflows");
  if (!exists(workflowsDir)) return;
  const entries = fs.readdirSync(workflowsDir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isFile()) continue;
    if (!TEMPLATE_MANAGED_WORKFLOWS.has(entry.name)) continue;
    const source = path.join(workflowsDir, entry.name);
    const targetDir = path.join(templateDir, ".github", "workflows");
    ensureDir(targetDir);
    fs.renameSync(source, path.join(targetDir, entry.name));
  }
}

function assemble() {
  if (exists(assembledFlag)) {
    log("已检测到 .assembled，跳过组装。");
    return;
  }
  log("开始组装：复制 core/ -> 仓库根目录");
  copyCore();

  log("应用 overlay/ 覆盖");
  copyOverlay();

  log("执行变量替换");
  const config = loadConfig();
  if (Object.keys(config).length > 0) {
    walkAndReplace(repoRoot, config);
  }

  log("写入 .assembled 标记");
  fs.writeFileSync(assembledFlag, new Date().toISOString(), "utf8");

  log("移动模板管理目录到 .template/");
  moveTemplateAssets();
  moveTemplateWorkflows();

  log("组装完成。");
}

try {
  assemble();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
```

### 3.2 新建文件：`scaffold/config.example.json`
```json
{
  "PROJECT_NAME": "My Antigravity Project",
  "OWNER": "VidyFoo",
  "REPO_URL": "https://github.com/VidyFoo/your-repo",
  "DESCRIPTION": "Project created from TEMPLATE_ANTIGRAVITY"
}
```

### 3.3 新建文件：`README.template.md`
```markdown
# TEMPLATE_ANTIGRAVITY 模板说明

本仓库为私有模板仓库，核心代码来自 `core/`（通过 subtree 同步）。

## 组装机制
新建仓库后，首次 push 到 `main` 会触发 `first-boot-assemble`，自动执行：
1. 将 `core/` 内容复制到仓库根目录；
2. 叠加 `overlay/` 内容；
3. 进行 `scaffold/config.json` 中的变量替换；
4. 生成 `.assembled` 标记；
5. 将模板管理目录移动到 `.template/`。

## 彻底移除模板管理文件
如不需要保留模板管理资产，可在确认 `.template/` 内容无用后删除：
```
rm -rf .template
```
```

### 3.4 新建文件：`.gitignore`
```gitignore
# Node
node_modules/

# Local env
.env

# Assemble artifacts
.assembled
```

---

## 阶段 4：首次自动组装工作流 first-boot-assemble.yml

### 4.1 新建文件：`.github/workflows/first-boot-assemble.yml`
```yaml
name: first-boot-assemble

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: write

jobs:
  assemble:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Guard assembled
        id: guard
        run: |
          if [ -f .assembled ]; then
            echo "assembled=true" >> $GITHUB_OUTPUT
          else
            echo "assembled=false" >> $GITHUB_OUTPUT
          fi

      - name: Setup Node
        if: steps.guard.outputs.assembled == 'false'
        uses: actions/setup-node@v4
        with:
          node-version: 18

      - name: Assemble
        if: steps.guard.outputs.assembled == 'false'
        run: node scaffold/assemble.mjs

      - name: Commit changes
        if: steps.guard.outputs.assembled == 'false'
        run: |
          if [ -n "$(git status --porcelain)" ]; then
            git config user.name "template-bot"
            git config user.email "template-bot@users.noreply.github.com"
            git add -A
            git commit -m "chore: assemble template"
            git push origin HEAD:main
          fi
```

---

## 阶段 5：core 自动同步工作流 sync-core.yml

### 5.1 新建文件：`.github/workflows/sync-core.yml`
```yaml
name: sync-core

on:
  schedule:
    - cron: "0 * * * *"
  workflow_dispatch:

permissions:
  contents: write
  pull-requests: write

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Add core upstream
        run: |
          git remote add core-upstream https://github.com/VidyFoo/antigravity-skill-engine.git || true
          git fetch core-upstream

      - name: Sync core subtree
        id: sync
        run: |
          set -e
          if git subtree pull --prefix=core core-upstream/main --squash; then
            echo "status=success" >> $GITHUB_OUTPUT
          else
            echo "status=failed" >> $GITHUB_OUTPUT
          fi

      - name: Commit changes
        if: steps.sync.outputs.status == 'success'
        run: |
          if [ -n "$(git status --porcelain)" ]; then
            git config user.name "template-bot"
            git config user.email "template-bot@users.noreply.github.com"
            git add -A
            git commit -m "chore: sync core subtree"
            git push origin HEAD:main
          fi

      - name: Create PR on failure
        if: steps.sync.outputs.status == 'failed'
        run: |
          branch="sync-core-$(date +%Y%m%d%H%M%S)"
          git checkout -b "$branch"
          git subtree pull --prefix=core core-upstream/main --squash || true
          git add -A
          git commit -m "chore: sync core subtree (manual)" || true
          git push origin HEAD:"$branch"
          gh pr create --title "Sync core subtree" --body "Automated sync failed; please resolve conflicts." --base main --head "$branch"
        env:
          GH_TOKEN: ${{ github.token }}
```

---

## 阶段 6：下发到下游仓库工作流 propagate-downstream.yml + 脚本

### 6.1 新建文件：`scaffold/propagate.mjs`
```js
#!/usr/bin/env node
import { execSync } from "child_process";
import fs from "fs";
import os from "os";
import path from "path";

const OWNER = "VidyFoo";
const TOPIC = "from-template-antigravity";
const TEMPLATE_REPO = "VidyFoo/TEMPLATE_ANTIGRAVITY";
const TEMPLATE_BRANCH = "main";
const CONCURRENCY = Number(process.env.PROPAGATE_CONCURRENCY || 3);

const PAT = process.env.TEMPLATE_SYNC_PAT || "";

if (!PAT) {
  console.error(
    "缺少 TEMPLATE_SYNC_PAT。请在模板仓库 Secrets 中设置一个具有 repo scope 的 PAT。"
  );
  process.exit(1);
}

function run(cmd, options = {}) {
  return execSync(cmd, { stdio: "inherit", ...options });
}

function runQuiet(cmd, options = {}) {
  return execSync(cmd, { encoding: "utf8", ...options }).trim();
}

function ghApi(pathname) {
  const cmd = `gh api ${pathname}`;
  return JSON.parse(runQuiet(cmd));
}

function listRepos() {
  const repos = [];
  let page = 1;
  while (true) {
    const response = ghApi(`/search/repositories?q=topic:${TOPIC}+user:${OWNER}&per_page=100&page=${page}`);
    repos.push(...response.items.map((item) => item.full_name));
    if (response.items.length < 100) break;
    page += 1;
  }
  return repos;
}

function runWithConcurrency(items, concurrency, worker) {
  let index = 0;
  const results = [];
  return new Promise((resolve, reject) => {
    let running = 0;
    const next = () => {
      while (running < concurrency && index < items.length) {
        const item = items[index++];
        running += 1;
        worker(item)
          .then((result) => results.push(result))
          .catch((error) => results.push({ item, error }))
          .finally(() => {
            running -= 1;
            if (index >= items.length && running === 0) {
              resolve(results);
            } else {
              next();
            }
          });
      }
    };
    next();
  });
}

async function syncRepo(repoFullName) {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "template-sync-"));
  const repoDir = path.join(tmpDir, repoFullName.replace("/", "-"));
  const authRepoUrl = `https://${PAT}@github.com/${repoFullName}.git`;

  run(`git clone ${authRepoUrl} ${repoDir}`);
  run(`git -C ${repoDir} remote add upstream https://github.com/${TEMPLATE_REPO}.git`);
  run(`git -C ${repoDir} fetch upstream`);

  let mergeSuccess = true;
  try {
    run(`git -C ${repoDir} checkout ${TEMPLATE_BRANCH}`);
    run(`git -C ${repoDir} merge upstream/${TEMPLATE_BRANCH}`);
  } catch {
    mergeSuccess = false;
  }

  if (mergeSuccess) {
    run(`git -C ${repoDir} push origin ${TEMPLATE_BRANCH}`);
    return { repo: repoFullName, status: "pushed" };
  }

  const branchName = `sync-template-${Date.now()}`;
  run(`git -C ${repoDir} checkout -b ${branchName}`);
  run(`git -C ${repoDir} merge upstream/${TEMPLATE_BRANCH} || true`);
  run(`git -C ${repoDir} add -A`);
  run(`git -C ${repoDir} commit -m "chore: sync template" || true`);
  run(`git -C ${repoDir} push origin ${branchName}`);

  const prCmd = `gh pr create --repo ${repoFullName} --title "Sync template" --body "Automated template sync failed due to conflicts." --base ${TEMPLATE_BRANCH} --head ${branchName}`;
  run(prCmd, { env: { ...process.env, GH_TOKEN: PAT } });

  return { repo: repoFullName, status: "pr" };
}

async function main() {
  const repos = listRepos();
  if (repos.length === 0) {
    console.log("未找到任何下游仓库。");
    return;
  }
  console.log(`检测到 ${repos.length} 个下游仓库。`);
  await runWithConcurrency(repos, CONCURRENCY, syncRepo);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
```

### 6.2 新建文件：`.github/workflows/propagate-downstream.yml`
```yaml
name: propagate-downstream

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: write
  pull-requests: write

jobs:
  propagate:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 18

      - name: Propagate
        env:
          TEMPLATE_SYNC_PAT: ${{ secrets.TEMPLATE_SYNC_PAT }}
          GH_TOKEN: ${{ secrets.TEMPLATE_SYNC_PAT }}
          PROPAGATE_CONCURRENCY: 3
        run: node scaffold/propagate.mjs
```

---

## 阶段 7：验证清单

### 7.1 验证 TEMPLATE_ANTIGRAVITY 已是模板仓库
- UI 路径：**VidyFoo/TEMPLATE_ANTIGRAVITY → Settings → General → Template repository** 已勾选
- 或在仓库页面显示 "Use this template"

### 7.2 验证 core subtree 同步
1. 在 CORE_PUBLIC 某文件做小改动并合并到 `main`
2. 触发模板仓库的 `sync-core` workflow
3. 观察 `core/` 内容更新并被提交

### 7.3 验证首次组装
1. 用模板创建测试仓库（点击 "Use this template"）
2. 观察首次 push 后 `first-boot-assemble` 自动提交
3. 仓库根目录应出现 core 内容 + overlay 内容 + `.assembled`，并出现 `.template/`

### 7.4 验证下发
1. 给测试下游 repo 打 topic：`from-template-antigravity`
2. 触发模板仓库 `propagate-downstream` workflow
3. 若可写入则自动 push 合并；若有冲突或受保护则自动开 PR

---

## GitHub UI 必做设置

### 1) 模板勾选
- **VidyFoo/TEMPLATE_ANTIGRAVITY → Settings → General → Template repository（勾选）**

### 2) Secrets
- **VidyFoo/TEMPLATE_ANTIGRAVITY → Settings → Secrets and variables → Actions → New repository secret**
  - Name: `TEMPLATE_SYNC_PAT`
  - Value: 带 `repo` scope 的 PAT

### 3) Actions 权限（下游仓库）
- **DOWNSTREAM_* → Settings → Actions → Workflow permissions → Read and write permissions**
- 如主分支保护阻止 bot 写入，将自动退化为 PR

### 4) 下游仓库打标
- **DOWNSTREAM_* → About → Topics → 添加 `from-template-antigravity`**

---

## 从零开始的完整命令清单（按顺序）

```bash
# 1) 创建模板仓库
 gh repo create VidyFoo/TEMPLATE_ANTIGRAVITY --private --confirm

# 2) 克隆模板仓库
 mkdir -p ~/work
 cd ~/work
 git clone https://github.com/VidyFoo/TEMPLATE_ANTIGRAVITY.git
 cd TEMPLATE_ANTIGRAVITY

# 3) 创建目录结构
 mkdir -p core overlay scaffold .github/workflows

# 4) 直接复制本仓库已落地的模板文件
 cp -R /path/to/antigravity-skill-engine/template/. .

# 5) 添加 core subtree
 git remote add core-upstream https://github.com/VidyFoo/antigravity-skill-engine.git
 git fetch core-upstream
 git subtree add --prefix=core core-upstream/main --squash

# 6) 提交并推送
 git add -A
 git commit -m "chore: bootstrap template"
 git push origin main
```

---

## 附录：TEMPLATE_ANTIGRAVITY 文件清单
- `scaffold/assemble.mjs`
- `scaffold/config.example.json`
- `scaffold/propagate.mjs`
- `.github/workflows/first-boot-assemble.yml`
- `.github/workflows/sync-core.yml`
- `.github/workflows/propagate-downstream.yml`
- `README.template.md`
- `.gitignore`

> 以上文件内容已在本指南中提供完整内容。
