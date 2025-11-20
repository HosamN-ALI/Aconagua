# 🤖 .blackbox Directory

This directory contains all context and rules for AI coding assistants working on the Saudi Smart Math Tutor project.

---

## 📖 What's in This Directory?

### Essential Files

| File | Purpose | Read When |
|------|---------|-----------|
| [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md) | Complete project overview and context | **Always read first** |
| [HOW_TO_USE_WITH_AI.md](./HOW_TO_USE_WITH_AI.md) | Guide for AI coding assistants | Working with AI |
| [INDEX.md](./INDEX.md) | Documentation index and navigation | Finding documentation |

### Rules Directory

| File | Purpose | Read When |
|------|---------|-----------|
| [rules/01-architecture.md](./rules/01-architecture.md) | Modular Monolith architecture rules | Before adding/modifying modules |
| [rules/02-tech-stack.md](./rules/02-tech-stack.md) | Technology decisions and standards | Before adding dependencies |
| [rules/03-atomic-design.md](./rules/03-atomic-design.md) | Frontend component structure | Before building UI |

---

## 🎯 Quick Start for AI Agents

### Step 1: Load Context

```
@workspace I'm working on the Saudi Smart Math Tutor project.
Please read .blackbox/PROJECT_CONTEXT.md for complete understanding.
```

### Step 2: Understand Current State

- ✅ Phase 1-3 Complete (Infrastructure, Curriculum, Auth)
- 🚧 Phase 4 Next (AI Tutor Module)
- 📅 Phase 5-11 Planned

### Step 3: Follow the Rules

Before writing code:
1. Read relevant rule file in `rules/`
2. Understand module boundaries
3. Follow existing patterns
4. Use path aliases
5. Add Swagger docs

---

## 📚 Documentation Structure

```
.blackbox/
├── README.md                    ← You are here
├── INDEX.md                     ← Documentation index
├── PROJECT_CONTEXT.md           ← Complete project context
├── HOW_TO_USE_WITH_AI.md       ← AI usage guide
└── rules/
    ├── 01-architecture.md       ← Module boundaries
    ├── 02-tech-stack.md         ← Technology choices
    └── 03-atomic-design.md      ← UI component structure
```

---

## 🏗️ Architecture Overview

### Modular Monolith

```
API Gateway (NestJS)
    │
    ├── Auth Module ✅
    │   └── JWT, Roles, Guards
    │
    ├── Curriculum Module ✅
    │   └── Saudi Math Curriculum
    │
    ├── AI Tutor Module 📁
    │   └── OpenAI, RAG, OCR
    │
    └── Learning Module 📁
        └── Progress, Gamification
    │
    └── Shared Kernel ✅
        └── Utilities, Decorators, Filters
    │
    └── PostgreSQL + pgvector
```

### Module Communication Rules

✅ **Allowed**:
- Direct service injection (read-only)
- Event-based communication (write operations)

❌ **Forbidden**:
- Cross-module database access
- Circular dependencies

---

## 🎓 Learning Path for AI Agents

### 1. Understand the Project
- Read [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md)
- Understand the Modular Monolith architecture
- Learn module boundaries

### 2. Learn the Rules
- Read [rules/01-architecture.md](./rules/01-architecture.md)
- Read [rules/02-tech-stack.md](./rules/02-tech-stack.md)
- Read [rules/03-atomic-design.md](./rules/03-atomic-design.md)

### 3. Study Existing Code
- Explore `backend/src/modules/auth/`
- Explore `backend/src/modules/curriculum/`
- Understand patterns and conventions

### 4. Start Building
- Follow [HOW_TO_USE_WITH_AI.md](./HOW_TO_USE_WITH_AI.md)
- Use existing modules as reference
- Maintain architectural integrity

---

## 🚀 Common AI Tasks

### Task 1: Implement New Module

```
@workspace I want to implement [MODULE] according to the architecture rules.

Please:
1. Read .blackbox/rules/01-architecture.md
2. Look at backend/src/modules/auth/ as reference
3. Follow the same patterns
4. Ensure module boundaries are respected
```

### Task 2: Add Feature to Existing Module

```
@workspace I want to add [FEATURE] to [MODULE].

Please:
1. Read the module code
2. Follow existing patterns
3. Add proper validation
4. Add Swagger docs
5. Ensure no module boundary violations
```

### Task 3: Fix a Bug

```
@workspace I'm experiencing [BUG] in [MODULE].

Please:
1. Read the module code
2. Check if it violates any rules
3. Suggest a fix that maintains architectural integrity
```

---

## ✅ AI Checklist

Before submitting code, verify:

- [ ] Read relevant rule files
- [ ] Followed existing patterns
- [ ] Used path aliases (`@modules/*`, `@shared/*`)
- [ ] Added TypeScript types
- [ ] Added validation with DTOs
- [ ] Added Swagger decorators
- [ ] No cross-module database access
- [ ] No circular dependencies
- [ ] Error handling with NestJS exceptions
- [ ] Consistent response format

---

## 🚫 Common Mistakes

### ❌ Mistake 1: Cross-Module Database Access

**Bad**:
```typescript
// In AI Tutor Module
const user = await this.prisma.user.findUnique({ where: { id } });
```

**Good**:
```typescript
// In AI Tutor Module
const user = await this.authService.getProfile(id);
```

### ❌ Mistake 2: Not Using Path Aliases

**Bad**:
```typescript
import { PrismaService } from '../../../shared/services/prisma.service';
```

**Good**:
```typescript
import { PrismaService } from '@shared/services/prisma.service';
```

### ❌ Mistake 3: Missing Swagger Docs

**Bad**:
```typescript
@Get(':id')
async getLesson(@Param('id') id: string) { ... }
```

**Good**:
```typescript
@Get(':id')
@ApiOperation({ summary: 'Get lesson by ID' })
@ApiParam({ name: 'id', description: 'Lesson ID' })
@ApiResponse({ status: 200, description: 'Lesson retrieved' })
@ApiResponse({ status: 404, description: 'Lesson not found' })
async getLesson(@Param('id') id: string) { ... }
```

---

## 📊 Project Status

| Phase | Status | Completion |
|-------|--------|------------|
| Phase 1: Infrastructure | ✅ Complete | 100% |
| Phase 2: Curriculum | ✅ Complete | 100% |
| Phase 3: Authentication | ✅ Complete | 100% |
| Phase 4: AI Tutor | 🚧 Next | 0% |
| Phase 5-11 | 📅 Planned | 0% |

---

## 🎯 Success Criteria

AI-generated code is successful when:

- ✅ Follows existing patterns
- ✅ Respects module boundaries
- ✅ Has proper TypeScript types
- ✅ Has input validation
- ✅ Has error handling
- ✅ Has Swagger documentation
- ✅ Builds without errors
- ✅ Passes linting

---

## 📞 Additional Resources

### Project Documentation
- [../START_HERE.md](../START_HERE.md) - Quick start
- [../GETTING_STARTED.md](../GETTING_STARTED.md) - Setup guide
- [../PROJECT_SUMMARY.md](../PROJECT_SUMMARY.md) - Status
- [../NEXT_STEPS.md](../NEXT_STEPS.md) - Phase 4 guide

### Planning
- [../docs/MASTER_PLAN.md](../docs/MASTER_PLAN.md) - 11-phase roadmap

### Code Examples
- `../backend/src/modules/auth/` - Auth module
- `../backend/src/modules/curriculum/` - Curriculum module
- `../backend/src/shared/` - Shared kernel

---

## 🤝 Contributing

When contributing to this project:

1. **Always** read the relevant rule files first
2. **Never** violate module boundaries
3. **Always** use path aliases
4. **Always** add Swagger documentation
5. **Always** validate inputs with DTOs
6. **Always** handle errors properly
7. **Always** follow existing patterns

---

**Remember**: This directory is your guide to maintaining architectural integrity. Read first, code second! 🚀

---

**Last Updated**: November 20, 2025
**Project Status**: Phase 1-3 Complete ✅
