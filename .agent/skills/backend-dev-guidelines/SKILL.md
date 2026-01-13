---
name: backend-dev-guidelines
description: Comprehensive backend development guide for Node.js/Express/TypeScript microservices. Use when creating routes, controllers, services, repositories, middleware, or working with Express APIs, Prisma database access, Sentry error tracking, Zod validation, unifiedConfig, dependency injection, or async patterns. Covers layered architecture (routes → controllers → services → repositories), BaseController pattern, error handling, performance monitoring, testing strategies, and migration from legacy patterns.
---

# Backend Development Guidelines

## Purpose

Establish consistency and best practices across backend microservices using modern Node.js/Express/TypeScript patterns.

## When to Use This Skill

Automatically activates when working on:
- Creating or modifying routes, endpoints, APIs
- Building controllers, services, repositories
- Implementing middleware (auth, validation, error handling)
- Database operations with Prisma
- Error tracking with Sentry
- Input validation with Zod
- Configuration management
- Backend testing and refactoring

---

## Quick Start

### New Backend Feature Checklist

- [ ] **Route**: Clean definition, delegate to controller
- [ ] **Controller**: Validate input, call service, handle response
- [ ] **Service**: Business logic, throw proper errors
- [ ] **Repository**: Database access via PrismaService
- [ ] **Validation**: Zod schema for input
- [ ] **Errors**: Custom errors with proper status codes
- [ ] **Tests**: Unit tests for service layer

---

## Architecture Overview

### Layered Architecture Pattern

```
┌─────────────────────────────────────┐
│         HTTP Request                │
└───────────────┬─────────────────────┘
                ↓
┌─────────────────────────────────────┐
│  Layer 1: ROUTES                    │
│  - Route definitions only           │
│  - Middleware registration          │
│  - Delegate to controllers          │
│  - NO business logic                │
└───────────────┬─────────────────────┘
                ↓
┌─────────────────────────────────────┐
│  Layer 2: CONTROLLERS               │
│  - Input validation (Zod)           │
│  - Call services                    │
│  - Response formatting              │
│  - Error handling boundaries        │
└───────────────┬─────────────────────┘
                ↓
┌─────────────────────────────────────┐
│  Layer 3: SERVICES                  │
│  - Business logic                   │
│  - Orchestration                    │
│  - Cross-service calls              │
│  - Error handling                   │
└───────────────┬─────────────────────┘
                ↓
┌─────────────────────────────────────┐
│  Layer 4: REPOSITORIES              │
│  - Database access                  │
│  - PrismaService interactions       │
│  - Data transformation              │
│  - NO business logic                │
└─────────────────────────────────────┘
```

See [architecture-overview.md](resources/architecture-overview.md) for details.

---

## Key Patterns

### BaseController Pattern

```typescript
import { Response } from 'express';
import Sentry from '@sentry/node';

export abstract class BaseController {
    protected handleSuccess<T>(res: Response, data: T, message?: string) {
        return res.json({
            success: true,
            message,
            data,
        });
    }

    protected handleError(error: any, res: Response, context: string) {
        Sentry.captureException(error);
        
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                error: error.message,
            });
        }
        
        return res.status(500).json({
            success: false,
            error: 'Internal server error',
        });
    }
}
```

### Validation with Zod

```typescript
import { z } from 'zod';

const createUserSchema = z.object({
    email: z.string().email(),
    name: z.string().min(2),
    role: z.enum(['ADMIN', 'USER']).default('USER'),
});

// In controller
const validated = createUserSchema.parse(req.body);
```

See [validation-patterns.md](resources/validation-patterns.md) for complete guide.

### Error Handling

```typescript
// Custom error types
export class NotFoundError extends AppError {
    constructor(message = 'Resource not found') {
        super(message, 404);
    }
}

export class ValidationError extends AppError {
    constructor(message: string, details?: any) {
        super(message, 400, details);
    }
}
```

See [async-and-errors.md](resources/async-and-errors.md) for patterns.

---

## Anti-Patterns

### ❌ NEVER

- Put business logic in routes
- Skip validation at controller level
- Use `any` types
- Ignore async errors
- Call Prisma directly from controllers
- Mix responsibilities between layers

### ✅ ALWAYS

- Validate all input with Zod
- Use dependency injection
- Handle errors at appropriate layer
- Write unit tests for services
- Use custom error types
- Follow separation of concerns

---

## Resource Files

| Topic | File |
|-------|------|
| Complete architecture | [architecture-overview.md](resources/architecture-overview.md) |
| Validation patterns | [validation-patterns.md](resources/validation-patterns.md) |
| Async and errors | [async-and-errors.md](resources/async-and-errors.md) |
| Testing strategies | [testing-guide.md](resources/testing-guide.md) |

---

**Skill Status**: COMPLETE ✅
**Line Count**: < 500 ✅
**Progressive Disclosure**: 4 resource files ✅
