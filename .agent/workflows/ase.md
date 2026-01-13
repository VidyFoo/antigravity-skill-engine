---
description: Antigravity Skill Engine Central Nervous System. Routes user intent to experts via Registry V2.
---

# ⚡ Antigravity Skill Engine (ASE) Hyper-Workflow

This is the Central Nervous System of Antigravity. It routes user intent to the correct Specialist Expert through the Registry V2.

## 0. Discovery Protocol

When the user invokes `/ase`, you MUST:

1.  **Read the Registry**:
    ```bash
    view_file .agent/skills/registry.json
    ```
2.  **Display the Expert Matrix**:
    - Iterate through the `categories` in `registry.json`.
    - Present a structured list of available experts under each category.
    - **Do NOT** output the entire file content. Summarize it nicely.

## 1. Activation Protocol

When a specific intent is identified (e.g., "Build a React Artifact"):

1.  **Lookup**: Find the skill ID in `registry.json` matching the intent keywords.
2.  **Load Skill**:
    - Read the file at `skills[id].skill_path`.
    - If `required_resources` are listed, read them as well (on demand or strictly as defined by the skill).
3.  **Set Boundary**:
    - Explicitly state: `⚡ ACTIVATING SKILL: [Skill Name]`
    - Follow the `Protocol` defined in that skill's `SKILL.md`.

## 2. Maintenance Protocol

- **New Skills**: Use the `skill-creator` skill to add entries to `registry.json`.
- **Debugging**: If a skill fails to trigger, check:
    1. Is it valid JSON in `registry.json`?
    2. Do the `intent_keywords` match?
    3. Does the `skill_path` exist?

---
*Antigravity v2.0: Powered by Dynamic Registry.*
