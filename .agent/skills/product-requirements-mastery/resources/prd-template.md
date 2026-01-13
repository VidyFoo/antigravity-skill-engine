# Product Requirements Document (PRD) Template

Use this template when creating `spec.md` or `AM_PRD.md`.

## 1. Executive Summary
*One or two sentences describing what we are building and why.*

## 2. The Problem
*What pain point are we solving? Who is experiencing it?*
- Users currently cannot...
- The existing workflow is slow because...

## 3. Goals & Success Metrics
*How will we know if this is successful?*
- **Metric**: Reduce load time by 50%.
- **Metric**: 90% of users can complete flow without support.

## 4. Non-Goals (Out of Scope)
*What are we explicitly NOT doing right now?*
- We will not support mobile layout in v1.
- No integration with 3rd party auth yet.

## 5. User Stories (Acceptance Criteria)

### Epic: [Name]
| ID | As a... | I want to... | So that... | Acceptance Criteria |
| :--- | :--- | :--- | :--- | :--- |
| US-1 | User | View my profile | I can see my stats | - Avatar is visible<br>- Name is editable |
| US-2 | Admin | Ban users | I can remove bad actors | - "Ban" button in table<br>- Confirmation modal |

## 6. Technical Spec (High Level)
*Briefly describe the architectural approach. Link to `system-architecture-design` outputs if available.*
- **Frontend**: New route `/profile`.
- **Backend**: New endpoint `GET /api/me`.
- **Database**: Add `bio` column to `User` table.

## 7. Open Questions
*What is still unknown?*
- [ ] Do we need email notifications?
