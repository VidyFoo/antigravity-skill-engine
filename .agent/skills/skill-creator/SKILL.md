---
name: skill-creator
description: Create and manage ASE skills following best practices. Use when creating new skills, modifying skill-rules.json, understanding trigger patterns, working with hooks, debugging skill activation, or implementing progressive disclosure. Covers skill structure, YAML frontmatter, trigger types (keywords, intent patterns, file paths, content patterns), enforcement levels (block, suggest, warn), hook mechanisms, session tracking, and the 500-line rule.
---

# Skill Creator Guide

## Purpose

Comprehensive guide for creating and managing skills in the Antigravity Skill Engine (ASE) with auto-activation system, following best practices including the 500-line rule and progressive disclosure pattern.

## When to Use This Skill

Automatically activates when you mention:
- Creating or adding skills
- Modifying skill triggers or rules
- Understanding how skill activation works
- Debugging skill activation issues
- Working with registry.json
- Hook system mechanics
- Progressive disclosure
- YAML frontmatter
- 500-line rule

---

## System Overview

### ASE Skill Structure

```
skill-name/
├── SKILL.md (required)       # Main skill content
├── scripts/                  # Executable tooling
├── references/               # Deep-dive documentation
└── assets/                   # Static resources
```

### Key Principles

1. **500-Line Rule**: Keep SKILL.md under 500 lines
2. **Progressive Disclosure**: Use reference files for detailed information
3. **Rich Descriptions**: Include all trigger keywords (max 1024 chars)
4. **Gerund Naming**: Prefer verb + -ing (e.g., "processing-pdfs")

---

## Creating a New Skill

### Step 1: Create Directory Structure

```bash
.agent/skills/your-skill-name/
├── SKILL.md
├── scripts/
│   └── (optional tooling)
└── references/
    └── (optional detailed docs)
```

### Step 2: Write SKILL.md

**Required Frontmatter:**
```yaml
---
name: your-skill-name
description: Brief description of what the skill does and when to use it. Include trigger keywords for auto-activation.
---
```

**Body Structure:**
1. Purpose (what this skill does)
2. When to Use (activation conditions)
3. Quick Start (minimal instructions)
4. Key Concepts (core knowledge)
5. Anti-Patterns (what to avoid)
6. Reference Files (links to deep-dive docs)

### Step 3: Register in registry.json

Add entry to `.agent/skills/registry.json`:

```json
{
    "id": "your-skill-name",
    "intent_keywords": [
        "primary keyword",
        "secondary keyword"
    ],
    "skill_path": ".agent/skills/your-skill-name/SKILL.md",
    "description": "Same as SKILL.md frontmatter description"
}
```

---

## Trigger Types

### Keyword Triggers
Case-insensitive substring matching in user prompts.
```json
"intent_keywords": ["layout", "grid", "toolbar"]
```

### Intent Patterns (Advanced)
Regex patterns for implicit intent detection.
```regex
(add|create|implement).*?(feature|endpoint|route)
```

See [TRIGGER_TYPES.md](references/TRIGGER_TYPES.md) for complete documentation.

---

## Progressive Disclosure Pattern

**Level 1: Metadata** (Always loaded)
- Name + description from frontmatter
- Used for routing decisions

**Level 2: SKILL.md Body** (Loaded on activation)
- Core instructions and quick start
- Keep under 500 lines

**Level 3: References** (Loaded on demand)
- Deep-dive documentation
- Examples and troubleshooting
- Add table of contents for files > 100 lines

---

## Best Practices

### ✅ DO:
- Keep SKILL.md concise and actionable
- Use clear, unambiguous keywords
- Test triggers with real prompts
- Include anti-patterns section
- Document when NOT to use the skill

### ❌ DON'T:
- Exceed 500 lines in SKILL.md
- Use overly generic keywords ("system", "work")
- Nest references more than one level deep
- Include implementation details users don't need

---

## Troubleshooting

See [TROUBLESHOOTING.md](references/TROUBLESHOOTING.md) for debugging activation issues.

**Quick Debug:**
1. Is skill listed in `registry.json`?
2. Do `intent_keywords` match your input?
3. Is SKILL.md valid YAML frontmatter + markdown?

---

## Reference Files

| Topic | File |
|-------|------|
| Complete trigger types | [TRIGGER_TYPES.md](references/TRIGGER_TYPES.md) |
| Hook mechanisms | [HOOK_MECHANISMS.md](references/HOOK_MECHANISMS.md) |
| Patterns library | [PATTERNS_LIBRARY.md](references/PATTERNS_LIBRARY.md) |
| Skill rules schema | [SKILL_RULES_REFERENCE.md](references/SKILL_RULES_REFERENCE.md) |
| Troubleshooting | [TROUBLESHOOTING.md](references/TROUBLESHOOTING.md) |
| Advanced topics | [ADVANCED.md](references/ADVANCED.md) |
| **Skill Review Checklist** | [skill-review.md](resources/skill-review.md) |
| **MCP Integration** | [mcp-integration-guide.md](resources/mcp-integration-guide.md) |

---

**Skill Status**: COMPLETE ✅
**Line Count**: < 500 ✅
**Progressive Disclosure**: 6 reference files ✅
