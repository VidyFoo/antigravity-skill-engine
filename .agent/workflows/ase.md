---
description: ASE 技能大合集：整合感知、路由与专家准则的超级工作流。
---

# ⚡ Antigravity Skill Engine (ASE) 超级工作流

此工作流是 ASE 引擎的“全景大脑”。基于“AI 原生认知”设计，它将索引、协议与执行逻辑合而为一。

## 0. 动态检索模式 (Discovery Mode)

**如果用户仅输入 `/ase` 而未提供具体任务：**

1.  **自动自省**：Agent 必须深度遍历 `.agent/skills/` 目录，实时生成一份**分类专家名录**。
2.  **分类展示标准**：
    *   🎨 **视觉与设计** (frontend-design, canvas-design, algorithmic-art, theme-factory)
    -   📄 **重型文档工程** (pdf, docx, xlsx, pptx, doc-coauthoring)
    -   ⚙️ **全栈开发与工具** (webapp-testing, mcp-builder, web-artifacts-builder)
    -   🚀 **系统演进与管理** (skill-creator, internal-comms, brand-guidelines, slack-gif-creator)
3.  **搜索引导**：输出一个带代码块的“搜索框” UI 示意，提示用户可以通过输入具体需求来触发底层的语义匹配。

## 1. 专家矩阵 (Expert Matrix)

以下是当前 ASE 引擎支持的全量专家索引。请根据用户意图进行**隐式语义识别**：

```json
{
    "version": "1.2.0 (Hyper-Workflow)",
    "skills": [
        {
            "id": "algorithmic-art",
            "intent": ["algorithmic", "art", "generative"],
            "description": "基于 p5.js 创建算法艺术、动态背景或数学美感视觉。优先输出原生 Canvas 代码。",
            "path": ".agent/skills/algorithmic-art/SKILL.md"
        },
        {
            "id": "brand-guidelines",
            "intent": ["brand", "typography", "official style"],
            "description": "应用 Antigravity 官方配色与排版规范，确保产物视觉一致性。",
            "path": ".agent/skills/brand-guidelines/SKILL.md"
        },
        {
            "id": "canvas-design",
            "intent": ["poster", "infographic", "visual art"],
            "description": "创作精美的 PNG/PDF 平面设计稿、海报或信息图。精通排版几何学。",
            "path": ".agent/skills/canvas-design/SKILL.md"
        },
        {
            "id": "doc-coauthoring",
            "intent": ["documentation", "proposal", "technical spec"],
            "description": "引导用户进行深度长文档合著，遵循“上下文-草稿-迭代-验证”流程。",
            "path": ".agent/skills/doc-coauthoring/SKILL.md"
        },
        {
            "id": "docx",
            "intent": ["word", "tracked changes", "redlining", "professional docs"],
            "description": "专业的 Office Word 文档工程，支持修订模式、批注、复杂格式保留。",
            "path": ".agent/skills/docx/SKILL.md"
        },
        {
            "id": "frontend-design",
            "intent": ["ui", "ux", "dashboard", "react component"],
            "description": "创作生产力级的 Web 界面。擅长玻璃拟态、液态渐变等追求极致审美的 UI。",
            "path": ".agent/skills/frontend-design/SKILL.md"
        },
        {
            "id": "internal-comms",
            "intent": ["status reports", "newsletter", "faq", "comms"],
            "description": "产出符合公司标准语境的内部通讯，如进度报告、周报、FAQ。",
            "path": ".agent/skills/internal-comms/SKILL.md"
        },
        {
            "id": "mcp-builder",
            "intent": ["mcp", "protocol", "external tools"],
            "description": "构建 MCP (Model Context Protocol) 协议服务器，扩展 Agent 外部能力。",
            "path": ".agent/skills/mcp-builder/SKILL.md"
        },
        {
            "id": "pdf",
            "intent": ["pdf extraction", "forms", "merge pdf", "render"],
            "description": "重型 PDF 处理。支持表格提取、表单填充、页面旋转、高质量 PDF 导出。",
            "path": ".agent/skills/pdf/SKILL.md"
        },
        {
            "id": "pptx",
            "intent": ["presentation", "slides", "deck", "speaker notes"],
            "description": "专业的幻灯片工程，支持母版逻辑、内容分级排版及自动化生成。",
            "path": ".agent/skills/pptx/SKILL.md"
        },
        {
            "id": "skill-creator",
            "intent": ["new skill", "clone skill", "meta skill"],
            "description": "元技能：协助用户创建、打包或优化新的 ASE 专家技能。",
            "path": ".agent/skills/skill-creator/SKILL.md"
        },
        {
            "id": "slack-gif-creator",
            "intent": ["gif", "slack optimization", "animation"],
            "description": "创作针对 Slack 优化的动图。精通体积压缩与视觉节奏调优。",
            "path": ".agent/skills/slack-gif-creator/SKILL.md"
        },
        {
            "id": "theme-factory",
            "intent": ["theme", "color palette", "styling factory"],
            "description": "主题工厂。提供 10 种顶级审美（Midnight, Aurora 等）的主题全量注入。",
            "path": ".agent/skills/theme-factory/SKILL.md"
        },
        {
            "id": "web-artifacts-builder",
            "intent": ["multicomponent web", "shadcn", "complex artifacts"],
            "description": "构建多组件、带状态管理的复杂 React Web 应用。",
            "path": ".agent/skills/web-artifacts-builder/SKILL.md"
        },
        {
            "id": "webapp-testing",
            "intent": ["playwright", "browser test", "debug ui", "screenshots"],
            "description": "基于 Playwright 的浏览器全自动测试、UI 诊断与日志捕获。",
            "path": ".agent/skills/webapp-testing/SKILL.md"
        },
        {
            "id": "xlsx",
            "intent": ["excel", "data analysis", "formulas", "pivots"],
            "description": "重型 Spreadsheet 处理。理解公式重算、透视表及数据可视化。",
            "path": ".agent/skills/xlsx/SKILL.md"
        }
    ]
}
```

## 2. 专家激活流程 (Activation Protocol)

1.  **意图扫描**：Agent 通过阅读上述 `Expert Matrix`，锁定与用户任务最匹配的 1 个或多个技能。
2.  **知识注入**：
    -   立即更新 `task_boundary` 为 `⚡ [Skill] {Name}`。
    -   使用 `view_file` 读取对应的 `Path`。
    -   **内化指令**：全面吸收 `SKILL.md` 中的逻辑，进入“专家模式”。

## 3. 十大操作准则 (Expert Principles)

1.  **领域锚定**：在执行前，必须明确自己当前代表哪位专家。
2.  **资产复用优先**：优先调用 `scripts/` 下的成熟 Bone。
3.  **原地生成原则**：新工具直接写入对应技能的 `scripts/` 目录，严禁在根目录生存。
4.  **工程确定性**：不因环境缺失退缩，优先修复环境而非弃用方案。
5.  **去标识化**：严禁出现 `Claude` 或 `Anthropic` 字样，统一使用 `The Agent`。
6.  **感知回显**：在任务开始时主动声明已激活的专家技能。
7.  **闭环更新**：完成新工具编写后，立即更新对应的 `SKILL.md`。
8.  **隐式协同**：支持多个专家在同一工作流中接力协同。
9.  **Token 效率**：在全景感知后，仅在必要时读取底层大型脚本，避免上下文污染。
10. **最终回溯**：在 `Walkthrough` 中注明支撑该成果的专家能力。

---
*Antigravity: Speeding up your workflow with precision.*
