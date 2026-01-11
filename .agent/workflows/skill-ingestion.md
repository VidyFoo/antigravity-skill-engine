---
description: 自动化技能移植流水线，用于将外部专家能力标准化地集成到 ASE 引擎中。
---

# ⚡ 技能集成工作流 (Skill Asset Ingestion)

此工作流用于将外部技能（如 Claude Skills）合规、闭环地移植到当前项目的 ASE 体系中。

## 输入参数
- `source`: 技能来源，支持以下两种形式：
    - **本地路径**: 如 `d:\path\to\skill-folder`
    - **GitHub URL**: 如 `https://github.com/user/repo/tree/main/skills/skill-name`

## 前置处理 (Pre-processing)

### 0. 来源识别与获取 (Source Resolution)
// turbo
- **如果是 GitHub URL**:
    1. 使用 `mcp_GitHubMCP_get_file_contents` 或 `git clone --sparse` 拉取目标目录。
    2. 将内容下载到临时目录 `.agent/skills/_import/[SKILL_NAME]/`。
    3. 后续流程以该临时目录作为 `source_path`。
- **如果是本地路径**: 直接进入下一阶段。

## 执行阶段

### 1. 资源闭环化 (Localization & Upgrade)
// turbo
- **存量保护**: 如果 `.agent/skills/[SKILL_NAME]` 已存在，禁止直接覆盖。
- **升维移植 (Diff Plan)**: 
    - 将新版本复制到临时目录 `.agent/skills/tmp_[SKILL_NAME]/`。
    - 生成一份 **Diff Plan 报告**（对比文件差异、新增脚本、指令变化）。
    - 提交给用户审核，由用户决定执行覆盖、合并还是保持现状。
- **全新集成**: 如果本地不存在，则完整复制源目录。

### 2. 全量身份重塑 (Global De-branding)
// turbo
执行递归扫描，涵盖技能包内的所有文件（包含子目录下的 `.md`, `.py`, `.json`, `.js` 等），将 `Claude` 标识替换为 `The Agent`，并确保全局以 UTF-8 编码重写。

### 3. 解耦与业务逻辑保留 (Decoupling)
- **保留核心**: 全量保留技能包内的所有异构与业务逻辑资源（如 `ooxml/`, `fonts/`），即使它们不符合三位一体结构。
- **结构对齐**: 保持 `SKILL.md` 位于根目录的核心地位。

### 4. 注册表智能维护 (Intelligent Registry Update)
在更新 `.agent/skills/registry.json` 时：
- **自动消歧**: 如果新技能的 `id` 或 `intent_keywords` 与存量技能冲突，Agent 应尝试添加语义后缀（如 `-v2` 或 `-advanced`）或合并关键词，确保注册成功。
- **自动生成条目**: 优先使用文件夹名作为 ID，防止 meta 数据幻觉。

### 5. 验证性加载与报告
- 进行 `task_boundary` 验证。
- 提交集成总结，若涉及“升维移植”，需重点高亮 Diff Plan 路径。

---
> 遵循准则：资产入库即为永恒知识。
