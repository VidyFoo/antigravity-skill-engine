#!/usr/bin/env node
import fs from "fs";
import path from "path";

const repoRoot = process.cwd();
const assembledFlag = path.join(repoRoot, ".assembled");
const coreDir = path.join(repoRoot, "core");
const overlayDir = path.join(repoRoot, "overlay");
const scaffoldDir = path.join(repoRoot, "scaffold");
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
    if (!shouldCopyFromCore(entry.name)) {
      continue;
    }
    const sourcePath = path.join(coreDir, entry.name);
    const targetPath = path.join(repoRoot, entry.name);
    if (entry.isDirectory()) {
      ensureDir(targetPath);
      if (entry.name === ".github") {
        copyDirectory(sourcePath, targetPath, (relativePath) => {
          if (!relativePath) return true;
          const normalized = relativePath.split(path.sep).join("/");
          if (normalized.startsWith("workflows/")) {
            const parts = normalized.split("/");
            const fileName = parts[parts.length - 1];
            return !TEMPLATE_MANAGED_WORKFLOWS.has(fileName);
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
