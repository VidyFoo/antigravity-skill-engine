# ⚡ Antigravity Skill Engine (ASE)

> **Antigravity Skill Engine (ASE)** 是一套基于 AI 原生感知架构的专家能力引擎。它将单一的大模型转化为具备 16 轨专业能力的工业级协同系统。

## 🏛️ 核心理念：三位一体 (The Trinity)

ASE 摒弃了传统的碎片化工具调用，转而采用一种更符合 AI 认知的“三位一体”资产结构：

*   **灵魂 (Soul)**: 位于 `SKILL.md`，承载专家的背景、逻辑与决策树。
*   **骨骼 (Bone)**: 位于 `scripts/`，提供原子化、高性能的工程工具。
*   **血肉 (Flesh)**: 位于 `examples/`，提供可供 AI 学习与复用的最佳实践。

## 🚀 快速启动

### 1. 注入引擎
将 `.agent/` 目录合并到您的项目根目录。

### 2. 唤醒专家
在大模型环境中，输入：
```bash
/ase
```
此时，系统会启动“动态自省”，为您展示当前的专家名录并进入意图匹配模式。

## 专家阵容 (Current Experts)

目前系统预置了以下四个领域的 16 位顶级专家：

*   🎨 **视觉与设计**: `frontend-design`, `canvas-design`, `algorithmic-art`, `theme-factory`
*   📄 **重型文档工程**: `pdf`, `docx`, `xlsx`, `pptx`, `doc-coauthoring`
*   ⚙️ **全栈开发与工具**: `webapp-testing`, `mcp-builder`, `web-artifacts-builder`
*   🚀 **系统演进与管理**: `skill-creator`, `internal-comms`, `brand-guidelines`, `slack-gif-creator`

## 💎 特色功能

- **隐式语义感知**: 无需精确关键词。你说“分析表格”，系统自动唤醒 `xlsx` 与 `pdf` 专家。
- **原地生成准则**: 强制要求脚本直接生成在技能目录下，保持目录极致整洁。
- **全景自省**: `/ase` 空触发即可浏览技能树，无需记忆。

## 📚 参考来源与声明

本项目中的专家能力（Expert Skills）均深度参考并转换自 **Claude** 系列开源库（包括但不限于 `Claude Engineer`, `Claude-Architect` 等知识体系）。

我们针对 **Antigravity** 环境进行了以下深度适配，确保所有专家技能均可 **完美执行**：
- **语义路由优化**: 针对 Antigravity 的感知架构重写了意图匹配逻辑。
- **环境闭合性**: 修正了所有文件系统与工具调用路径，确保在 Antigravity 容器内无缝运行。
- **本地工具集成**: 完美支持本地 PythonRecalc、Playwright 自动化及各类文档处理引擎。

## 📜 开源协议

本项目采用 [MIT License](LICENSE)。

---
*Antigravity: Perfecting expert execution with precision.*
