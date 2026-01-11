# ASE 注册表变更日志 (Registry Changelog)

所有对 `.agent/skills/registry.json` 的结构性变更都将记录于此。

---


## [1.1.1] - 2026-01-11

### 变更 (Changed)
- 测试版本控制机制

---
## [1.1.0] - 2026-01-11

### 新增 (Added)
- 完成 16 轨技能的全量集成
- 引入完整语义描述 (description) 用于隐式意图匹配
- 新技能: `algorithmic-art`, `brand-guidelines`, `canvas-design`, `doc-coauthoring`, `docx`, `internal-comms`, `pptx`, `skill-creator`, `slack-gif-creator`, `theme-factory`, `web-artifacts-builder`, `xlsx`

### 变更 (Changed)
- 将 `pdf-processing` 合并为 `pdf`
- 所有技能描述已完成去标识化 (Claude -> The Agent)

### 移除 (Removed)
- 删除冗余的 `pdf-processing` 条目

---

## [1.0.0] - 2026-01-11 (Initial)

### 新增 (Added)
- 初始注册表结构
- 核心技能: `webapp-testing`, `mcp-builder`, `pdf-processing`, `frontend-design`
- 基础 `intent_keywords` 关键词路由

---
*格式遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)*
