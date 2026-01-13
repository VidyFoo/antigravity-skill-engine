# ⚡ Antigravity Skills Engine (ASE)

> **Antigravity Skills Engine (ASE)** is a high-performance **AI agent skills library** and **workflow engine**. It transforms a single **LLM** into an industrial-grade **expert system** through a dynamic registry of specialized skills. It acts as the "Central Nervous System" for your AI Agent.

**Version**: 2.1.0 (Slim) | **Status**: Production Ready

---

## 🏛️ Core Architecture: Registry V2

ASE 2.1 moves beyond simple tool calling. It implements a **Map-based Registry Architecture** that categorizes skills into 5 strategic domains. The `/ase` agent dynamically reads this registry to understand its capabilities.

### 🗂️ The 5 Domains of Expertise

| Domain | Focus | Key Skills |
| :--- | :--- | :--- |
| **🎨 Visual & Design** | UI/UX, Assets | `visual-design-system` (Unified), `brand-guidelines` |
| **📄 Document Engineering** | Office Formats | `docx`, `pdf`, `pptx`, `xlsx`, `doc-coauthoring` |
| **⚙️ Fullstack Dev** | Code & Architecture | `system-architecture-design`, `backend-dev-guidelines`, `frontend-dev-guidelines`, `mcp-builder` |
| **🧠 Analysis & Review** | QA & Insights | **`intelligent-code-review`** (New!), `systematic-debugging`, `meeting-insights-analyzer` |
| **🚀 System Evolution** | Meta-Skills | `skill-creator`, `product-requirements-mastery`, `internal-comms` |

## 📂 Project Structure

```text
.agent/
├── skills/
│   ├── registry.json             # Single Source of Truth (Map-based)
│   ├── intelligent-code-review/  # Example Multi-Persona Skill
│   │   ├── SKILL.md              # Routing Logic
│   │   └── resources/            # External Knowledge (Checklists, Templates)
│   │       └── personas/         # "Silent Hunter", "Type Architect", etc.
│   └── ...
└── workflows/
    └── ase.md                    # The /ase super-workflow (Dynamic Router)
```

## 🛠️ Usage

### Summoning the Council: `/ase`

Just type `/ase` in your chat.
The engine will enter **Discovery Mode**, scanning `registry.json` and presenting you with the Expert Matrix.

Then, ask naturally:
> *"Review my code for error handling bugs."*
> (Activates `intelligent-code-review` -> `Silent Hunter` persona)

> *"Design a premium glassmorphism landing page."*
> (Activates `visual-design-system` -> `Premium Mode`)

## 💎 Key Features 2.1

*   **Slim & Unified**: Merged fragmented design skills into `visual-design-system`; removed bloatware (`slack-gif`, `video-downloader`).
*   **Protocol-First**: Skills like `intelligent-code-review` enforce strict execution protocols (e.g., "Must read checklist before reviewing").
*   **Resources > Context**: Heavy knowledge is offloaded to `resources/` files to save context window tokens until needed.

## 🚀 Creating New Skills

Want to add a new expert?
1.  Summon the **Skill Creator**: `Create a new skill for [Topic]`.
2.  It will generate the `SKILL.md` and register it in `registry.json` automatically.
3.  The new skill is instantly available via `/ase`.

---
*Antigravity: Speeding up your workflow with precision.*
