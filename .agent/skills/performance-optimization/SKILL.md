---
name: performance-optimization
description: Guidelines and checklists for optimizing Frontend (Web Vitals) and Backend (Latency/Throughput). Use when user mentions "slow", "laggy", "optimize", "Lighthouse", or performance auditing.
---

# Performance Optimization

## Purpose
To treat performance as a feature, not an afterthought. Provides concrete checklists to audit and improve system speed.

## When to Use This Skill
- **Audit**: "Why is the home page slow?"
- **Optimization**: "Improve the Lighthouse score."
- **Database**: "The query is timing out."
- **Build**: "The bundle size is too big."

## Core Metrics (The "Truth")

### Frontend (Core Web Vitals)
- **LCP (Largest Contentful Paint)**: Loading performance. Target: < 2.5s.
- **INP (Interaction to Next Paint)**: Responsiveness. Target: < 200ms.
- **CLS (Cumulative Layout Shift)**: Visual stability. Target: < 0.1.

### Backend
- **TTFB (Time to First Byte)**: Server response time. Target: < 600ms (ideal < 200ms).
- **Throughput**: Requests per second (RPS).
- **P95/P99 Latency**: The experience of the slowest 5% of users.

---

## 🚀 Optimization Strategies

### Frontend Strategy
1. **Assets**: Compress images (WebP/AVIF), lazy load offscreen images.
2. **Code**: Split bundles (lazy load routes), tree-shake unused libs.
3. **Rendering**: Reduce re-renders (Memoization), virtualize long lists.

### Backend Strategy
1. **Database**: **INDEXES** are the #1 Low Hanging Fruit. Fix N+1 queries.
2. **Caching**: Redis for expensive calculations. Content-Type headers for browser caching.
3. **Async**: Move heavy tasks (email, PDF generation) to background queues.

---

## Resource Files

| Topic | File |
| :--- | :--- |
| **Frontend Checklist** | [frontend-checklist.md](resources/frontend-checklist.md) (Lighthouse/Web Vitals) |
| **Backend Checklist** | [backend-checklist.md](resources/backend-checklist.md) (DB/API/Node) |
