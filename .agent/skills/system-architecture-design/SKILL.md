---
name: system-architecture-design
description: Architecture design patterns for Antigravity projects. supporting two distinct modes; "Indie App" (speed, simplicity, shared types) and "Enterprise App" (scalability, strict boundaries, microservices). Use when planning new projects, defining system boundaries, or refactoring existing architectures. Integrates strictly with frontend-dev-guidelines and backend-dev-guidelines.
---

# System Architecture Design

## Purpose

To provide a decision framework and architectural blueprints for projects of varying scales. This skill helps the Agent shift from "coding mode" to "architect mode", ensuring the chosen structure matches the project's lifecycle stage.

## When to Use This Skill

- **New Project Initialization**: deciding how to structure the repo(s).
- **Major Refactoring**: splitting a monolith or reorganizing modules.
- **System Analysis**: understanding data flow and boundaries.
- **Scaling Pains**: moving from "Indie" to "Enterprise" patterns.

---

## 🏗️ Architectural Modes

### Mode A: Indie / Solo App (The Speed Demon)
**Goal**: Zero friction, shared types, single deployment unit.
**Best for**: Prototypes, MVP, Solo Founders.

- **Repo Structure**: Monorepo (Turborepo/Nx) or Single Repo.
- **Communication**: Direct HTTP/REST.
- **State**: Server State (TanStack Query) + Client State (Zustand/Context).
- **Database**: Single Postgres instance with Prisma.
- **Deployment**: Vercel (Frontend) + Railway/Render (Backend) OR Fullstack Next.js.
- **Key Advantage**: `Shared Types` (Frontend directly imports Zod schemas/TS types from Backend).

### Mode B: Enterprise App (The Scalable Giant)
**Goal**: Reliability, team independence, clear boundaries.
**Best for**: Large teams, high traffic, complex domain domains.

- **Repo Structure**: Polyrepo or Strict Boundary Monorepo.
- **Communication**: API Gateway (BFF), Event-Driven (RabbitMQ/Kafka) for inter-service.
- **Architecture**: Clean Architecture / Hexagonal (Ports & Adapters).
- **Database**: Per-service database schemas (logical or physical isolation).
- **Observability**: Distributed Tracing (OpenTelemetry), Centralized Logging.
- **Key Advantage**: Independent Deployments & Fault Isolation.

---

## 📐 Decision Matrix

| Feature | Indie App | Enterprise App |
| :--- | :--- | :--- |
| **API Framework** | tRPC (Unified) or Simple Express | Express (Strict Layered) / NestJS |
| **Data Fetching** | TanStack Query (Direct) | TanStack Query via BFF/Gateway |
| **Validation** | Shared Zod Schemas | Duplicated or Package-shared Schemas |
| **Auth** | Session/JWT (Simple) | OAuth2 / OIDC / Gateway Auth |
| **Testing** | Integration > Unit | Unit > Integration > E2E |

---

## Pattern Integration

### Frontend Guidelines Integration
*Ref: [.agent/skills/frontend-dev-guidelines/SKILL.md](../../frontend-dev-guidelines/SKILL.md)*

- **Indie**: The `features/` directory in frontend should map 1:1 to backend routes.
- **Enterprise**: Frontend treats the backend as a "black box" standard API.

### Backend Guidelines Integration
*Ref: [.agent/skills/backend-dev-guidelines/SKILL.md](../../backend-dev-guidelines/SKILL.md)*

- **Indie**: Controllers can imply service logic for speed.
- **Enterprise**: STRICT adherence to `Routes -> Controllers -> Services -> Repositories`.

---

## Resource Files

| Topic | File |
| :--- | :--- |
| **Diagram Templates** | [architecture-patterns.md](resources/architecture-patterns.md) (Mermaid C4) |
| **Stack Integration** | [tech-stack-integration.md](resources/tech-stack-integration.md) (FE+BE Glue) |
