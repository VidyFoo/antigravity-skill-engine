# ⚡ Antigravity Skills Engine (ASE)

> **Antigravity Skills Engine (ASE)** 是一个高性能的 **AI Agent 技能库** 与 **工作流引擎**。它通过动态的 **专家技能注册表**，将单个 LLM 转化为工业级的 **专家系统**。它是让您的 AI Agent 拥有“职业技能”的中枢神经系统。

**版本**: 2.1.0 (Slim) | **状态**: 生产就绪 (Production Ready)

---

## 🏛️ 核心架构：Registry V2

ASE 2.1 超越了简单的 Tool Calling。它实现了一个基于 Map 结构的 **注册表架构 (Registry Architecture)**，将技能科学地划分为 5 大战略领域。`/ase` 能够动态读取此注册表，实时感知并调用自身能力。

### 🗂️ 五大专家领域 (The 5 Domains)

| 领域 | 核心关注 | 关键技能 |
| :--- | :--- | :--- |
| **🎨 视觉与设计** | UI/UX, 素材资产 | `visual-design-system` (统一引擎), `brand-guidelines` |
| **📄 文档工程** | Office 格式处理 | `docx`, `pdf`, `pptx`, `xlsx`, `doc-coauthoring` |
| **⚙️ 全栈开发** | 代码与架构 | `system-architecture-design`, `backend-dev-guidelines`, `frontend-dev-guidelines`, `mcp-builder` |
| **🧠 分析与审查** | 质检与洞察 | **`intelligent-code-review`** (New!), `systematic-debugging`, `meeting-insights-analyzer` |
| **🚀 系统演进** | 元技能 (Meta) | `skill-creator`, `product-requirements-mastery`, `internal-comms` |

## 📂 项目结构

```text
.agent/
├── skills/
│   ├── registry.json             #单一真理来源 (Map-based Registry)
│   ├── intelligent-code-review/  # 多角色技能示例
│   │   ├── SKILL.md              # 路由与核心逻辑
│   │   └── resources/            # 外部“脑容量” (检查单, 模板)
│   │       └── personas/         # "Silent Hunter", "Type Architect" 等角色
│   └── ...
└── workflows/
    └── ase.md                    # /ase 超级工作流 (动态路由器)
```

## 🛠️ 使用指南

### 召唤委员会：`/ase`

在对话中输入 `/ase`。
引擎将进入 **发现模式 (Discovery Mode)**，扫描 `registry.json` 并向您展示当前的专家矩阵。

然后，您可以使用自然语言下达指令：
> *"Review my code for error handling bugs."*
> (激活 `intelligent-code-review` -> `Silent Hunter` 角色)

> *"Design a premium glassmorphism landing page."*
> (激活 `visual-design-system` -> `Premium Mode` 模式)

## 💎 ASE 2.1 关键特性

*   **精简统一 (Slim & Unified)**: 将分散的设计技能合并为 `visual-design-system`；移除了 `slack-gif`, `video-downloader` 等非核心工具。
*   **协议优先 (Protocol-First)**: 像 `intelligent-code-review` 这样的技能强制执行严格的**执行协议**（例如：“必须在审查前读取检查清单”），拒绝幻觉。
*   **资源挂载 (Resources > Context)**: 重型知识（检查单、原理）被卸载到 `resources/` 文件中，仅在需要时加载，节省 Token 并保持上下文清晰。

## 🚀 创建新技能

想要添加一位新专家？
1.  召唤 **Skill Creator**：`Create a new skill for [Topic]`。
2.  它会自动生成标准的 `SKILL.md` 并注册到 `registry.json`。
3.  新技能将即刻通过 `/ase` 可用。

---
*Antigravity: Speeding up your workflow with precision.*
