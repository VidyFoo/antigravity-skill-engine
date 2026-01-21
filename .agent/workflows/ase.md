---
description: Antigravity Skill Engine Central Nervous System. Routes user intent to experts via Registry V3.
---

# ⚡ Antigravity Skill Engine (ASE) Hyper-Workflow

This is the Central Nervous System of Antigravity. It routes user intent to the correct Specialist Expert through the Registry V3.

**⚠️ LANGUAGE RULE (语言规则)**: 
You MUST use **Chinese (Simplified)** for all thoughts (Thinking Process), explanations, and outputs when executing this workflow.

## 0. Discovery Protocol

When the user invokes `/ase`, you MUST:

1.  **Read the Registry**:
    ```bash
    view_file .agent/skills/registry.json
    ```
2.  **Display the Expert Matrix**:
    - Iterate through the `categories` in `registry.json`.
    - Present a structured list of available experts under each category.
    - Skills are organized by domain: `1-dev/`, `2-audit/`, `3-sys/`, `4-tools/`, `external/`.
    - **Do NOT** output the entire file content. Summarize it nicely.

## 1. Activation Protocol (Lifecycle)

> **⚡ TRACE MODE**: You MUST output the trace marker at the START of each phase. This provides clear visibility into the ASE execution process.

### Phase -1: Inheritance (继承知识)

**Trace Output:**
```
⚡ ASE [Phase -1: INHERIT] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Before taking any action, you MUST:
1.  **Read Rule1**: `view_file .agent/rules/rule-one.md` (Behavioral boundaries).
2.  **Read Memory**: `view_file doc/memory.md` (Project-specific context & TL;DR).

### Phase 0: Identification

**Trace Output:**
```
⚡ ASE [Phase 0: IDENTIFY] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 Matched: [Skill ID] [Skill Name]
```

1.  **Lookup**: Find the skill ID in `registry.json` matching the intent keywords.
2.  **Load Skill**: Read `skill_path` (e.g., `.agent/skills/1-dev/architecting/SKILL.md`).

### Phase 1: Execution

**Trace Output:**
```
⚡ ASE [Phase 1: EXECUTE] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⏳ Activating: [Skill Name]
📖 Using:
   ├─ SKILL.md (protocol)
   └─ resources/xxx.md (referenced)
```

1.  **Set Boundary**: Explicitly state the trace output above.
2.  **Follow Protocol**: Follow the `Protocol` defined in the skill's `SKILL.md`.
3.  **Log Resource Usage**: When you `view_file` any resource from the skill directory during execution, add it to the "Using" section of the trace. This helps the user understand exactly which files influenced the output.

### Phase Final: Deposit (沉淀经验)

**Trace Output:**
```
⚡ ASE [Phase F: DEPOSIT] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 Synthesizing learnings...
🌾 Harvesting: [resource name] → [target skill] (if applicable)
```

When the task is complete:
1.  **Synthesize**: Extract `[CORE]`, `[PATTERN]`, `[DECISION]`, and `[TIP]`.
2.  **Update Memory**: Update `doc/memory.md` according to the [Maintenance Protocol](file:///d:/Projects/Letaice/doc/explanation/system-dev.md).
3.  **Resource Harvesting** (if applicable):
    - **Detect**: Identify reusable artifacts produced during execution (templates, configs, debugging patterns, doc fragments).
    - **Evaluate**: Is this universally valuable or project-specific?
      - **Universal** → Generalize (remove hardcoded values, add placeholders) → Archive to `.agent/skills/{category}/{skill}/resources/`
      - **Project-specific** → Archive to `doc/` only
    - **Trace**: Output `🌾 Harvesting:` line with resource name and target skill.

## 2. Maintenance Protocol

- **Doc Standards**: Follow Diátaxis in `doc/`. Maintain the clear separation between `rule-one.md` (Global) and `memory.md` (Local).
- **Purge**: Every 3 months, archive old memory entries to `doc/archive/`.

---
*Antigravity v4.0: CNS Evolution Protocol (Registry V3).*

