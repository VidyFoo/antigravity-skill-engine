---
name: skill-creator
description: Guide for creating effective skills. This skill should be used when users want to create a new skill (or update an existing skill) that extends The Agent's capabilities with specialized knowledge, workflows, or tool integrations.
license: Complete terms in LICENSE.txt
---

# Skill Creator

## About Skills

Skills are modular, self-contained packages that extend The Agent's capabilities by providing specialized knowledge, workflows, and tools.

## Anatomy of a Skill

Every skill consists of a required SKILL.md file and optional bundled resources:

```
skill-name/
├── SKILL.md (required)
└── Bundled Resources (optional)
    ├── scripts/
    ├── references/
    └── assets/
```

## Progressive Disclosure
Skills use a three-level loading system to manage context efficiently:
1. Metadata (name + description)
2. SKILL.md body
3. Bundled resources
