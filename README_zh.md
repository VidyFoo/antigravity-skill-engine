# ⚡ Antigravity Skills Engine (ASE)

> **Antigravity Skills Engine (ASE)** 是一个高性能的 **AI Agent 技能库** 与 **工作流引擎**。它通过动态的专家技能注册表，将单个 LLM 转化为工业级的 **专家系统**。它是让您的 AI Agent 拥有"职业技能"的 **中枢神经系统**。

**版本**: 3.2.0 | **状态**: 生产就绪 | **许可证**: MIT

---

## 🏛️ 核心架构：Registry V3

ASE 3.x 引入了 **基于类别的注册表架构**，将 15+ 项技能科学地划分为 5 大战略领域。`/ase` 超级工作流动态读取此注册表，实时发现、识别并激活合适的专家。

### 🗂️ 五大专家领域

| 代码 | 领域 | 核心关注 | 技能数 |
| :--- | :--- | :--- | :---: |
| **1-dev** | 🔧 DEV (开发域) | 功能架构、全栈指南、会话生命周期 | 3 |
| **2-audit** | 🔍 AUDIT (审计域) | 代码审计、科学调试、Web 应用测试 | 3 |
| **3-sys** | ⚙️ SYS (系统域) | 生态管理、技能管理、文档引导、MCP 构建 | 4 |
| **4-tools** | 🛠️ TOOLS (工具域) | 文档工程、视觉设计、PPTX 创建 | 3 |
| **external** | 🌐 EXTERNAL (外部依赖) | 品牌指南、内部通讯、会议洞察 | 3 |

### 📋 完整技能注册表

<details>
<summary><b>1-dev: 开发域</b></summary>

| ID | 技能 | 描述 |
| :--- | :--- | :--- |
| 1.1 | `architecting` | 全生命周期架构新功能 (设计 → 规划 → 实现) |
| 1.2 | `fullstack-guide` | 全栈开发规范百科全书 (React/TS/Node/Supabase) |
| 1.3 | `session-managing` | 自动触发的会话生命周期管理 (INHERIT + DEPOSIT) |

</details>

<details>
<summary><b>2-audit: 审计域</b></summary>

| ID | 技能 | 描述 |
| :--- | :--- | :--- |
| 2.1 | `code-auditing` | 系统化审计与代码优化 (Code Review / Simplifier / Council) |
| 2.2 | `scientific-debugging` | 科学调试专家：观察 → 假设 → 实验 → 修复 |
| 2.3 | `webapp-testing` | 基于 Playwright 的本地 Web 应用测试工具包 |

</details>

<details>
<summary><b>3-sys: 系统域</b></summary>

| ID | 技能 | 描述 |
| :--- | :--- | :--- |
| 3.1 | `ecosystem-managing` | 系统生态工程师 (发布 / 维护 / 清理) |
| 3.2 | `skills-managing` | 遵循最佳实践创建和管理 ASE 技能 |
| 3.3 | `doc-bootstrapping` | 一键建立项目文档系统 (Rule1, Memory, Diátaxis) |
| 3.4 | `mcp-building` | 高质量 MCP 服务器构建指南 |

</details>

<details>
<summary><b>4-tools: 工具域</b></summary>

| ID | 技能 | 描述 |
| :--- | :--- | :--- |
| 4.1 | `doc-writing` | 技术文档工程 (Diátaxis / PDF / DOCX / XLSX) |
| 4.2 | `visual-designing` | 视觉设计工具箱 (Canvas / Themes / Design System / Artifacts) |
| 4.3 | `pptx-creating` | PPTX 演示文稿创建、编辑与分析 (html2pptx / OOXML) |

</details>

<details>
<summary><b>external: 外部依赖</b></summary>

| ID | 技能 | 描述 |
| :--- | :--- | :--- |
| E.1 | `brand-guidelines` | 官方品牌色彩与排版规范 |
| E.2 | `internal-comms` | 内部通讯模板 (状态报告、简报等) |
| E.3 | `meeting-insights-analyzer` | 从会议中提取行为模式与沟通洞察 |

</details>

## 📂 项目结构

```text
.agent/
├── skills/
│   ├── registry.json           # 单一真理来源 (V3)
│   ├── 1-dev/                  # 开发域
│   │   ├── architecting/
│   │   ├── fullstack-guide/
│   │   └── session-managing/
│   ├── 2-audit/                # 审计域
│   │   ├── code-auditing/
│   │   ├── scientific-debugging/
│   │   └── webapp-testing/
│   ├── 3-sys/                  # 系统域
│   │   ├── doc-bootstrapping/
│   │   ├── ecosystem-managing/
│   │   ├── mcp-building/
│   │   └── skills-managing/
│   ├── 4-tools/                # 工具域
│   │   ├── doc-writing/
│   │   └── visual-designing/
│   └── external/               # 外部依赖
│       ├── brand-guidelines/
│       ├── internal-comms/
│       └── meeting-insights-analyzer/
└── workflows/
    └── ase.md                  # /ase 超级工作流 (动态路由器)
```

## 🛠️ 使用指南

### 召唤中枢神经系统：`/ase`

在对话中输入 `/ase`。引擎将进入 **发现模式 (Discovery Mode)**，扫描 `registry.json` 并向您展示当前的专家矩阵。

然后，您可以使用自然语言下达指令：

> *"Review my code for error handling bugs."*
> → 激活 `code-auditing` → Code Review 模式

> *"Design a premium glassmorphism landing page."*
> → 激活 `visual-designing` → Premium 模式

> *"Debug this intermittent crash."*
> → 激活 `scientific-debugging` → 假设驱动工作流

### 生命周期阶段

ASE 通过结构化的生命周期运作：

| 阶段 | 名称 | 目的 |
| :--- | :--- | :--- |
| -1 | **INHERIT** (继承) | 加载项目上下文 (Rule1, Memory) |
| 0 | **IDENTIFY** (识别) | 通过注册表匹配用户意图到技能 |
| 1 | **EXECUTE** (执行) | 激活技能协议并加载资源 |
| F | **DEPOSIT** (沉淀) | 综合学习成果，收割可复用工件 |

## 💎 核心特性 (V3.1)

- **基于类别的组织**：技能按逻辑领域分组，数字前缀便于导航
- **协议优先设计**：技能强制执行严格的执行协议与资源加载
- **渐进式披露**：重型知识卸载到 `resources/` 文件，按需加载
- **自动触发技能**：某些技能 (如 `session-managing`) 自动激活
- **追踪模式**：通过阶段标记清晰展示 ASE 执行过程

## 🚀 创建新技能

想要添加一位新专家？

1. 召唤 **Skills Manager**：调用技能 `3.2`
2. 它会自动生成标准的 `SKILL.md` 并注册到 `registry.json`
3. 新技能将即刻通过 `/ase` 可用

## 📚 文档

- [English Documentation](./README.md)
- 每个技能都包含详细协议的 `SKILL.md`

---

*Antigravity Lab © 2026 | 以精准加速您的工作流。*
