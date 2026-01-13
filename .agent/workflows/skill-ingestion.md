---
description: 自动化技能移植流水线，用于将外部专家能力标准化地集成到 ASE 引擎中。
---

# ⚡ 技能集成工作流 (Skill Asset Ingestion)

此工作流用于将外部技能（如 Claude Skills）合规、闭环地移植到当前项目的 ASE 体系中。

## 核心原则

🚨 **CLI First, LLM for Intelligence Only**

| 操作类型 | 使用工具 | 说明 |
|----------|----------|------|
| 下载/克隆 | `git clone` | 一条命令完成，零 token 消耗 |
| 扫描目录 | `find`, `tree`, `ls` | CLI 原生高效 |
| 文件移动/复制 | `mv`, `cp` | 简单 shell 命令 |
| 品牌替换 | `sed`, `powershell -replace` | 批量文本替换 |
| 文件删除 | `rm`, `Remove-Item` | CLI 直接执行 |
| **技能分析** | **LLM** | 解析 frontmatter，理解技能描述 |
| **注册表生成** | **LLM** | 生成 intent_keywords 和 description |
| **冲突判断** | **LLM** | 分析语义重叠，给出合并建议 |

---

## 输入参数
- `source`: 技能来源（GitHub URL 或本地路径）

---

## 执行协议

### Phase 1: Git Clone 完整下载
// turbo

**用一条 `git clone` 命令完成所有下载工作。**

```powershell
# Windows PowerShell
$REPO_URL = "https://github.com/owner/repo"
$TEMP_DIR = ".agent/skills/_import"

# 创建临时目录
New-Item -ItemType Directory -Force -Path $TEMP_DIR | Out-Null

# 克隆仓库（浅克隆节省时间）
git clone --depth 1 $REPO_URL "$TEMP_DIR/repo-name"

# 验证
tree /F "$TEMP_DIR/repo-name/skills" 2>$null || ls -R "$TEMP_DIR/repo-name/skills"
```

```bash
# macOS/Linux
REPO_URL="https://github.com/owner/repo"
TEMP_DIR=".agent/skills/_import"

mkdir -p "$TEMP_DIR"
git clone --depth 1 "$REPO_URL" "$TEMP_DIR/repo-name"

tree "$TEMP_DIR/repo-name/skills" || find "$TEMP_DIR/repo-name/skills" -name "SKILL.md"
```

**⏸️ 输出**：显示已克隆的技能目录树。

---

### Phase 2: CLI 扫描 + LLM 分析
// turbo

**CLI 扫描目录结构，LLM 解析技能元数据。**

#### Step 2.1: CLI 扫描（零 token）
```powershell
# 列出所有技能目录
Get-ChildItem -Path ".agent/skills/_import/repo-name/skills" -Directory | Select-Object Name

# 或使用 find
cmd /c "dir /B /AD .agent\skills\_import\repo-name\skills"
```

#### Step 2.2: LLM 解析 SKILL.md（需要智能）

**仅读取 frontmatter 部分（<50 行），提取：**
- `name` / `id`
- `description`
- 资源文件数量（通过 CLI 统计）

```powershell
# CLI 统计资源文件数
(Get-ChildItem -Path ".agent/skills/_import/repo-name/skills/skill-a" -Recurse -File).Count
```

#### Step 2.3: 检查存量冲突（CLI）
```powershell
# 检查正式目录是否已存在
Test-Path ".agent/skills/skill-name"
```

**⏸️ 输出**：技能清单表格，等待用户选择。

---

### Phase 3: 冲突处理

| 场景 | 处理方式 |
|------|----------|
| 不存在 | ✅ 直接进入 Phase 4 |
| 已存在 | ⚠️ LLM 分析语义重叠，建议处理方式 |

---

### Phase 4: CLI 批量 De-branding
// turbo

**使用 CLI 批量替换，不逐文件调用 LLM。**

```powershell
# Windows PowerShell - 批量替换 Claude → The Agent
$skillPath = ".agent/skills/_import/repo-name/skills/skill-name"
Get-ChildItem -Path $skillPath -Recurse -Include *.md,*.txt,*.json | ForEach-Object {
    (Get-Content $_.FullName -Raw) -replace 'Claude', 'The Agent' | Set-Content $_.FullName -NoNewline
}

# 验证
Select-String -Path "$skillPath\*" -Pattern "Claude" -Recurse
```

```bash
# macOS/Linux
find ".agent/skills/_import/repo-name/skills/skill-name" -type f \( -name "*.md" -o -name "*.txt" -o -name "*.json" \) \
    -exec sed -i 's/Claude/The Agent/g' {} \;

# 验证
grep -r "Claude" ".agent/skills/_import/repo-name/skills/skill-name"
```

---

### Phase 5: CLI 正式移动
// turbo

```powershell
# Windows
Move-Item -Path ".agent/skills/_import/repo-name/skills/skill-name" -Destination ".agent/skills/skill-name" -Force
```

```bash
# macOS/Linux
mv ".agent/skills/_import/repo-name/skills/skill-name" ".agent/skills/"
```

---

### Phase 6: LLM 注册表更新

**这是需要 LLM 智能的步骤**：生成合适的 `intent_keywords` 和优化 `description`。

**LLM 输入**（最小化）：
- 技能 ID
- SKILL.md frontmatter 的 description（<200 字）

**LLM 输出**：
```json
{
    "id": "skill-name",
    "intent_keywords": ["keyword1", "keyword2"],
    "skill_path": ".agent/skills/skill-name/SKILL.md",
    "description": "优化后的描述"
}
```

---

### Phase 7: CLI 清理
// turbo

```powershell
# 删除已移植的技能临时文件
Remove-Item -Path ".agent/skills/_import/repo-name/skills/skill-name" -Recurse -Force

# 如果仓库目录已空，删除整个仓库
$remaining = (Get-ChildItem ".agent/skills/_import/repo-name/skills" -Directory).Count
if ($remaining -eq 0) {
    Remove-Item -Path ".agent/skills/_import/repo-name" -Recurse -Force
}
```

---

## Token 消耗对比

| 阶段 | 旧方案 | 新方案 |
|------|--------|--------|
| Phase 1: 下载 | MCP 获取 + read_url + write_to_file（高） | `git clone`（零） |
| Phase 2: 扫描 | list_dir + view_file 全文（高） | CLI 扫描 + 仅读 frontmatter（低） |
| Phase 3: 冲突 | 全文对比（中） | CLI 检测 + LLM 判断（低） |
| Phase 4: De-brand | grep + 逐文件替换（高） | CLI 批量 sed/replace（零） |
| Phase 5: 移动 | Agent 调用 mv（低） | CLI 直接执行（零） |
| Phase 6: 注册 | LLM 生成（必需） | LLM 生成（必需） |
| Phase 7: 清理 | Agent 调用 rm（低） | CLI 直接执行（零） |

**Token 节省估算**：~70-80%

---

## 快速执行脚本（可选）

如果技能来源固定，可创建一键执行脚本：

```powershell
# .agent/scripts/ingest-skills.ps1
param(
    [Parameter(Mandatory=$true)]
    [string]$RepoUrl,
    
    [Parameter(Mandatory=$false)]
    [string[]]$SkillNames
)

$TEMP_DIR = ".agent/skills/_import"
$repoName = ($RepoUrl -split '/')[-1]

# Phase 1: Clone
Write-Host "📦 Cloning repository..."
git clone --depth 1 $RepoUrl "$TEMP_DIR/$repoName"

# Phase 2: List skills
Write-Host "`n📋 Available skills:"
Get-ChildItem -Path "$TEMP_DIR/$repoName/skills" -Directory | ForEach-Object {
    $count = (Get-ChildItem $_.FullName -Recurse -File).Count
    Write-Host "  - $($_.Name) ($count files)"
}

# Pause for selection
if (-not $SkillNames) {
    Write-Host "`n⏸️ Please specify skills to import using -SkillNames parameter"
    exit 0
}

# Phase 4-5: De-brand and move each selected skill
foreach ($skill in $SkillNames) {
    $srcPath = "$TEMP_DIR/$repoName/skills/$skill"
    $dstPath = ".agent/skills/$skill"
    
    if (-not (Test-Path $srcPath)) {
        Write-Host "❌ Skill not found: $skill"
        continue
    }
    
    # De-brand
    Write-Host "🔧 De-branding $skill..."
    Get-ChildItem -Path $srcPath -Recurse -Include *.md,*.txt,*.json | ForEach-Object {
        (Get-Content $_.FullName -Raw) -replace 'Claude', 'The Agent' | Set-Content $_.FullName -NoNewline
    }
    
    # Move
    Write-Host "📁 Moving to production..."
    Move-Item -Path $srcPath -Destination $dstPath -Force
    
    Write-Host "✅ $skill imported successfully"
}

# Phase 7: Cleanup
Write-Host "`n🧹 Cleaning up..."
Remove-Item -Path "$TEMP_DIR/$repoName" -Recurse -Force -ErrorAction SilentlyContinue

Write-Host "`n🎉 Done! Please update registry.json manually or use LLM."
```

---

## 流程图

```
┌─────────────────────────────────────────────────────────────┐
│  Phase 1: git clone --depth 1                               │
│  🔧 CLI Only - 零 Token                                     │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  Phase 2: CLI 扫描 + LLM 解析 frontmatter                    │
│  🔧 CLI 扫描目录结构                                         │
│  🤖 LLM 仅解析 <50 行 frontmatter                            │
│  ⏸️ 用户选择技能                                             │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  Phase 3: CLI 检测 + LLM 判断（如冲突）                       │
│  🔧 Test-Path 检测存量                                       │
│  🤖 LLM 仅在冲突时介入                                       │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  Phase 4: CLI 批量 De-branding                              │
│  🔧 sed/powershell -replace - 零 Token                       │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  Phase 5: CLI Move                                          │
│  🔧 mv/Move-Item - 零 Token                                  │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  Phase 6: LLM 注册表更新                                     │
│  🤖 生成 intent_keywords 和 description                      │
│  📝 这是唯一必须使用 LLM 的核心步骤                           │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  Phase 7: CLI Cleanup                                       │
│  🔧 Remove-Item/rm - 零 Token                                │
└─────────────────────────────────────────────────────────────┘
```

---

## 关键约束

| 约束 | 说明 |
|------|------|
| 🔧 **CLI First** | 下载、扫描、移动、删除、替换全用 CLI |
| 🤖 **LLM for Intelligence** | 仅用于：解析 frontmatter、生成注册表、冲突判断 |
| 📉 **Minimal Context** | 读取文件时只读必要部分（frontmatter <50行） |
| ⏸️ **User Checkpoints** | Phase 2（技能选择）和 Phase 3（冲突处理） |
| 🚀 **一键脚本可选** | 固定来源可用 PowerShell 脚本自动化 |

---

> 遵循准则：CLI First, LLM for Intelligence Only。Token 是稀缺资源。
