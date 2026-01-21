# Changelog

All notable changes to the Antigravity Skills Engine (ASE) will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [3.2.0] - 2026-01-21

### ✨ New Skills

| ID | Skill | Description |
| :--- | :--- | :--- |
| 4.3 | `pptx-creating` | PPTX presentation creation, editing & analysis. Ported from [anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/pptx) |

### 📦 PPTX Creating Features

- **Create from scratch**: Use `html2pptx.js` to convert HTML slides to PowerPoint with accurate positioning
- **Edit existing**: Direct OOXML manipulation for comments, speaker notes, layouts, and animations
- **Template-based**: Duplicate, rearrange, and replace placeholder text in template presentations
- **Analysis tools**: Text extraction with markitdown, thumbnail grid generation

### 🛠️ Included Scripts

- `scripts/html2pptx.js` - HTML → PowerPoint converter
- `scripts/inventory.py` - Extract text shapes inventory
- `scripts/rearrange.py` - Duplicate and reorder slides
- `scripts/replace.py` - Batch replace placeholder text
- `scripts/thumbnail.py` - Generate slide thumbnail grids

---

## [3.1.0] - 2026-01-21

### 🏗️ Architecture

- **Registry V3**: Introduced category-based registry architecture with 5 strategic domains
  - `1-dev` - Development Domain
  - `2-audit` - Audit Domain  
  - `3-sys` - System Domain
  - `4-tools` - Tools Domain
  - `external` - External Dependencies
- **Numerical Prefixes**: Skills now use hierarchical IDs (e.g., `1.1`, `2.3`, `E.1`) for easier navigation

### ✨ New Skills

| ID | Skill | Description |
| :--- | :--- | :--- |
| 1.3 | `session-managing` | Auto-triggered session lifecycle management (INHERIT + DEPOSIT) |
| 2.2 | `scientific-debugging` | Scientific debugging: Observe → Hypothesize → Experiment → Fix |
| 2.3 | `webapp-testing` | Playwright-based toolkit for testing local web applications |
| 3.1 | `ecosystem-managing` | System ecosystem engineer (Release / Maintain / Purge) |
| 3.3 | `doc-bootstrapping` | One-click project documentation system initialization |
| 3.4 | `mcp-building` | Guide for creating high-quality MCP servers |

### 🔄 Renamed / Reorganized Skills

| Old Name | New ID | New Name |
| :--- | :--- | :--- |
| `system-architecture-design` | 1.1 | `architecting` |
| `frontend-dev-guidelines` + `backend-dev-guidelines` | 1.2 | `fullstack-guide` (merged) |
| `intelligent-code-review` | 2.1 | `code-auditing` |
| `systematic-debugging` | 2.2 | `scientific-debugging` |
| `skill-creator` | 3.2 | `skills-managing` |
| `visual-design-system` | 4.2 | `visual-designing` |
| `docx` + `pdf` + `pptx` + `xlsx` | 4.1 | `doc-writing` (unified) |

### 🗑️ Removed

- `slack-gif` - Non-core bloatware
- `video-downloader` - Non-core bloatware
- `doc-coauthoring` - Merged into `doc-writing`

### 📁 Project Structure

- Utility scripts are embedded within their respective skill directories:
  - `skills-managing/scripts/safe_replace.py` - De-branding replacement utility
  - `ecosystem-managing/scripts/version_control.py` - Semantic version management

### 📖 Documentation

- Bilingual README (English + 中文) with full skills registry
- Added collapsible skill tables with detailed descriptions
- Documented ASE lifecycle phases (INHERIT → IDENTIFY → EXECUTE → DEPOSIT)

---

## [2.1.0] - 2025-12-XX

### 🏗️ Architecture

- **Registry V2**: Map-based registry architecture
- Organized skills into 5 conceptual domains (Visual & Design, Document Engineering, Fullstack Dev, Analysis & Review, System Evolution)

### ✨ Features

- Protocol-First Design: Skills enforce strict execution protocols
- Resources > Context: Heavy knowledge offloaded to `resources/` files
- Slim & Unified: Merged fragmented design skills

### Skills (V2.1)

- `visual-design-system` (Unified visual design engine)
- `brand-guidelines`
- `intelligent-code-review` (Multi-persona: Silent Hunter, Type Architect, etc.)
- `systematic-debugging`
- `system-architecture-design`
- `backend-dev-guidelines`
- `frontend-dev-guidelines`
- `mcp-builder`
- `skill-creator`
- `product-requirements-mastery`
- `internal-comms`
- `meeting-insights-analyzer`
- Document skills: `docx`, `pdf`, `pptx`, `xlsx`, `doc-coauthoring`

---

## [1.0.0] - 2025-XX-XX

### 🎉 Initial Release

- Basic skills library structure
- Simple workflow routing
- Foundation for AI Agent skill system
