# ⚡ Antigravity Skill Engine (ASE) 技能库

欢迎使用 ASE 技能库。本目录是 Antigravity AI 的“专家大脑”存放处，采用了**完全闭环、意图驱动、自我演进**的设计架构。

## 🏗 架构设计：三位一体 (The Trinity)

ASE 推荐（但不强制）技能包采用以下三个维度进行组织。一个基本的技能只需包含 `SKILL.md`即可生效，而“三位一体”是技能走向成熟与工程化的理想状态：

1.  **灵魂 (The Soul)**: `SKILL.md`
    -   存放该领域的专家级背景知识、最佳实践与决策树。
    -   负责改变 Agent 的思考状态，使其从“通用模式”切换为“专家模式”。

2.  **骨骼 (The Bone)**: `scripts/`
    -   存放经过验证、具备工业级鲁棒性的黑盒工具脚本。
    -   负责处理跨进程管理、环境检测等“脏活累活”，确保工程确定性。

3.  **血肉 (The Flesh)**: `examples/`
    -   存放各种场景下的标准化操作规范 (SOP) 示例。
    -   Agent 通过模仿这些代码范例，现场生成当前任务的执行路径。

## ⚡ 专家操作准则

所有专家在执行任务时，必须严格遵守 `ase-loader.md` 中定义的**三大原则**：
-   **资产复用优先**: 优先审计并调用 `scripts/` 下的既有工具。
-   **工程确定性优先**: 遇到环境问题优先配置环境，而非降级到低质方案。
-   **闭环回馈优先**: 任务中生成的成熟脚本必须回流至 `scripts/` 并更新文档。

## 📦 当前注册技能

| 技能 ID | 核心能力 | 本地路径 |
| :--- | :--- | :--- |
| `algorithmic-art` | Creating algorithmic art using p5.js with seeded randomness and interactive parameter exploration. Use this when users request creating art using code... | `./algorithmic-art/` |
| `brand-guidelines` | Applies The Agent's official brand colors and typography to any sort of artifact that may benefit from having The Agent's look-and-feel. Use it when b... | `./brand-guidelines/` |
| `canvas-design` | Create beautiful visual art in .png and .pdf documents using design philosophy. You should use this skill when the user asks to create a poster, piece... | `./canvas-design/` |
| `doc-coauthoring` | Guide users through a structured workflow for co-authoring documentation. Use when user wants to write documentation, proposals, technical specs, deci... | `./doc-coauthoring/` |
| `docx` | Comprehensive document creation, editing, and analysis with support for tracked changes, comments, formatting preservation, and text extraction. When ... | `./docx/` |
| `frontend-design` | Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, a... | `./frontend-design/` |
| `internal-comms` | A set of resources to help me write all kinds of internal communications, using the formats that my company likes to use. The Agent should use this sk... | `./internal-comms/` |
| `mcp-builder` | Guide for creating high-quality MCP (Model Context Protocol) servers that enable LLMs to interact with external services through well-designed tools. ... | `./mcp-builder/` |
| `pdf` | Comprehensive PDF manipulation toolkit for extracting text and tables, creating new PDFs, merging/splitting documents, and handling forms. When The Ag... | `./pdf/` |
| `pptx` | Presentation creation, editing, and analysis. When The Agent needs to work with presentations (.pptx files) for: (1) Creating new presentations, (2) M... | `./pptx/` |
| `skill-creator` | Guide for creating effective skills. This skill should be used when users want to create a new skill (or update an existing skill) that extends The Ag... | `./skill-creator/` |
| `slack-gif-creator` | Knowledge and utilities for creating animated GIFs optimized for Slack. Provides constraints, validation tools, and animation concepts. Use when users... | `./slack-gif-creator/` |
| `theme-factory` | Toolkit for styling artifacts with a theme. These artifacts can be slides, docs, reportings, HTML landing pages, etc. There are 10 pre-set themes with... | `./theme-factory/` |
| `web-artifacts-builder` | Suite of tools for creating elaborate, multi-component the agent.ai HTML artifacts using modern frontend web technologies (React, Tailwind CSS, shadcn... | `./web-artifacts-builder/` |
| `webapp-testing` | Toolkit for interacting with and testing local web applications using Playwright. Supports verifying frontend functionality, debugging UI behavior, ca... | `./webapp-testing/` |
| `xlsx` | Comprehensive spreadsheet creation, editing, and analysis with support for formulas, formatting, data analysis, and visualization. When The Agent need... | `./xlsx/` |

---
*Antigravity: Speeding up your workflow with precision.*
