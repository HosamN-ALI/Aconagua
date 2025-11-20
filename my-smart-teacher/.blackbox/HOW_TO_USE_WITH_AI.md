# 🤖 How to Use This Project with Blackbox AI

## 📖 Overview

This project has been specifically structured to work seamlessly with AI coding assistants like Blackbox. All architectural rules, context, and guidelines are documented in this `.blackbox/` directory.

## 🎯 Quick Start for AI Agents

### Step 1: Load Project Context

When starting a new conversation about this project, reference these files:

```
@workspace I'm working on the Saudi Smart Math Tutor project. 
Please read:
1. .blackbox/PROJECT_CONTEXT.md - for complete project understanding
2. .blackbox/rules/01-architecture.md - for architectural rules
3. docs/MASTER_PLAN.md - for the project roadmap

Current status: Phase 1-3 complete. Ready to start Phase 4 (AI Tutor Module).
```

### Step 2: Understand Current State

The AI should understand:
- ✅ Backend infrastructure is complete
- ✅ Auth Module is fully implemented
- ✅ Curriculum Module is fully implemented
- 🚧 AI Tutor Module needs to be built (Phase 4)
- 🚧 Learning Module needs to be built (Phase 5)
- 🚧 Frontend needs to be built (Phase 6+)

### Step 3: Follow the Rules

Before writing any code, the AI must:
1. Read the relevant rule file in `.blackbox/rules/`
2. Understand module boundaries (no cross-module database access)
3. Follow existing patterns from Auth or Curriculum modules
4. Use path aliases (`@modules/*`, `@shared/*`)
5. Add Swagger decorators to all endpoints

---

## 📁 File Structure Guide for AI

### Essential Files to Read First

| File | Purpose | When to Read |
|------|---------|--------------|
| `.blackbox/PROJECT_CONTEXT.md` | Complete project overview | Always read first |
| `.blackbox/rules/01-architecture.md` | Modular Monolith rules | Before adding/modifying modules |
| `.blackbox/rules/02-tech-stack.md` | Technology decisions | Before adding dependencies |
| `.blackbox/rules/03-atomic-design.md` | Frontend component structure | Before building UI |
| `docs/MASTER_PLAN.md` | 11-phase roadmap | To understand next steps |
| `PROJECT_SUMMARY.md` | What's been completed | To check current status |

### Module-Specific Files

**Auth Module** (Reference Implementation)
```
backend/src/modules/auth/
├── auth.module.ts          # Module definition
├── controllers/
│   └── auth.controller.ts  # HTTP endpoints
├── services/
│   └── auth.service.ts     # Business logic
├── dto/
│   ├── register.dto.ts     # Input validation
│   └── login.dto.ts
├── guards/
│   ├── jwt-auth.guard.ts   # Route protection
│   └── roles.guard.ts      # Role-based access
└── strategies/
    └── jwt.strategy.ts     # Passport strategy
```

**Curriculum Module** (Reference Implementation)
```
backend/src/modules/curriculum/
├── curriculum.module.ts
├── controllers/
│   └── curriculum.controller.ts
└── services/
    └── curriculum.service.ts
```

---

## 🚀 Common AI Tasks

### Task 1: Implement AI Tutor Module (Phase 4)

**Prompt Template**:
```
@workspace I want to implement Phase 4 (AI Tutor Module) according to docs/MASTER_PLAN.md.

Please:
1. Read .blackbox/rules/01-architecture.md to understand module boundaries
2. Read .blackbox/rules/02-tech-stack.md for technology choices
3. Look at backend/src/modules/auth/ as a reference pattern
4. Implement the AI Tutor Module with:
   - OpenAI GPT-4o integration
   - RAG pipeline using pgvector
   - OCR service for math images
   - Socratic teaching prompts
   - WebSocket for real-time chat

Follow the existing code style and module structure.
```

### Task 2: Add a New Feature to Existing Module

**Prompt Template**:
```
@workspace I want to add [FEATURE] to the [MODULE] module.

Please:
1. Read backend/src/modules/[MODULE]/ to understand current implementation
2. Follow the same patterns (controller → service → database)
3. Add proper validation with DTOs
4. Add Swagger documentation
5. Ensure it doesn't violate module boundaries (check .blackbox/rules/01-architecture.md)
```

### Task 3: Build Frontend Components

**Prompt Template**:
```
@workspace I want to build the [COMPONENT] for the frontend.

Please:
1. Read .blackbox/rules/03-atomic-design.md for component structure
2. Determine if this is an Atom, Molecule, Organism, or Template
3. Use Next.js 14+ with App Router
4. Use Tailwind CSS for styling
5. Use react-katex for LaTeX math rendering
6. Follow mobile-first design principles
```

### Task 4: Fix a Bug

**Prompt Template**:
```
@workspace I'm experiencing [BUG DESCRIPTION] in [MODULE/FILE].

Please:
1. Read the relevant module code
2. Check if it violates any rules in .blackbox/rules/
3. Suggest a fix that maintains architectural integrity
4. Ensure the fix doesn't break module boundaries
```

### Task 5: Write Tests

**Prompt Template**:
```
@workspace I need tests for [MODULE/SERVICE].

Please:
1. Read the service implementation
2. Write unit tests following Jest patterns
3. Mock external dependencies (Prisma, OpenAI, etc.)
4. Test both success and error cases
5. Follow the testing strategy in .blackbox/PROJECT_CONTEXT.md
```

---

## ✅ AI Checklist for Code Changes

Before submitting code, the AI should verify:

- [ ] Read relevant rule files in `.blackbox/rules/`
- [ ] Followed existing patterns from Auth or Curriculum modules
- [ ] Used path aliases (`@modules/*`, `@shared/*`)
- [ ] Added proper TypeScript types
- [ ] Added validation with `class-validator`
- [ ] Added Swagger/OpenAPI decorators
- [ ] No cross-module database access (use services instead)
- [ ] No circular dependencies
- [ ] Error handling with NestJS exceptions
- [ ] Consistent response format (handled by TransformInterceptor)
- [ ] Updated relevant documentation if needed

---

## 🚫 Common Mistakes to Avoid

### ❌ Mistake 1: Cross-Module Database Access

**Bad**:
```typescript
// In AI Tutor Module
const user = await this.prisma.user.findUnique({ where: { id: userId } });
```

**Good**:
```typescript
// In AI Tutor Module
constructor(private authService: AuthService) {}

const user = await this.authService.getProfile(userId);
```

### ❌ Mistake 2: Ignoring Module Boundaries

**Bad**:
```typescript
// Curriculum Module importing from Learning Module
import { LearningService } from '../learning/services/learning.service';
```

**Good**:
```typescript
// Use events instead
this.eventEmitter.emit('lesson.completed', { userId, lessonId });
```

### ❌ Mistake 3: Not Using Path Aliases

**Bad**:
```typescript
import { PrismaService } from '../../../shared/services/prisma.service';
```

**Good**:
```typescript
import { PrismaService } from '@shared/services/prisma.service';
```

### ❌ Mistake 4: Missing Swagger Documentation

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
@ApiResponse({ status: 200, description: 'Lesson retrieved successfully' })
@ApiResponse({ status: 404, description: 'Lesson not found' })
async getLesson(@Param('id') id: string) { ... }
```

---

## 📊 Understanding the Architecture

### Module Communication Flow

```
┌─────────────────────────────────────────────────────────┐
│                     API Gateway                          │
│                    (NestJS Main)                         │
└─────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ Auth Module  │    │  Curriculum  │    │  AI Tutor    │
│              │    │    Module    │    │   Module     │
│ - Register   │    │              │    │              │
│ - Login      │    │ - Get Tree   │    │ - Chat       │
│ - Profile    │    │ - Search     │    │ - OCR        │
└──────────────┘    └──────────────┘    └──────────────┘
        │                   │                   │
        │                   │                   │
        └───────────────────┼───────────────────┘
                            │
                            ▼
                ┌───────────────────────┐
                │   Shared Kernel       │
                │                       │
                │ - PrismaService       │
                │ - Utilities           │
                │ - Decorators          │
                │ - Filters             │
                └───────────────────────┘
                            │
                            ▼
                ┌───────────────────────┐
                │   PostgreSQL          │
                │   (with pgvector)     │
                └───────────────────────┘
```

### Data Flow Example: Student Solving a Problem

```
1. Student sends message to AI Tutor
   ↓
2. AI Tutor Module:
   - Validates user (via AuthService)
   - Retrieves lesson context (via CurriculumService)
   - Searches similar content (pgvector)
   - Constructs Socratic prompt
   - Calls OpenAI API
   - Streams response
   ↓
3. AI Tutor emits event: "problem.attempted"
   ↓
4. Learning Module listens and:
   - Updates student progress
   - Checks for achievements
   - Updates statistics
```

---

## 🎓 Learning from Existing Code

### Example 1: How Auth Module is Structured

Study `backend/src/modules/auth/` to understand:
- How to structure a module
- How to use DTOs for validation
- How to implement guards
- How to use Swagger decorators
- How to handle errors

### Example 2: How Curriculum Module Queries Data

Study `backend/src/modules/curriculum/services/curriculum.service.ts` to understand:
- How to use Prisma for complex queries
- How to include relations
- How to handle not found errors
- How to structure service methods

### Example 3: How Shared Kernel Works

Study `backend/src/shared/` to understand:
- How to create reusable utilities
- How to create custom decorators
- How to implement global filters
- How to implement global interceptors

---

## 🔄 Iterative Development with AI

### Recommended Workflow

1. **Phase Understanding**
   ```
   AI: Read docs/MASTER_PLAN.md Phase X
   AI: Understand requirements and deliverables
   ```

2. **Architecture Review**
   ```
   AI: Read .blackbox/rules/01-architecture.md
   AI: Understand module boundaries
   AI: Check if new module or extending existing
   ```

3. **Implementation**
   ```
   AI: Look at similar existing module as reference
   AI: Create module structure
   AI: Implement services (business logic)
   AI: Implement controllers (HTTP endpoints)
   AI: Add DTOs (validation)
   AI: Add Swagger documentation
   ```

4. **Testing**
   ```
   AI: Write unit tests
   AI: Write integration tests
   AI: Test manually via Swagger UI
   ```

5. **Documentation**
   ```
   AI: Update PROJECT_SUMMARY.md
   AI: Update module README if needed
   AI: Mark phase as complete in MASTER_PLAN.md
   ```

---

## 📞 Getting Help

If the AI is unsure about:

1. **Architecture**: Read `.blackbox/rules/01-architecture.md`
2. **Technology Choice**: Read `.blackbox/rules/02-tech-stack.md`
3. **UI Components**: Read `.blackbox/rules/03-atomic-design.md`
4. **Current Status**: Read `PROJECT_SUMMARY.md`
5. **Next Steps**: Read `docs/MASTER_PLAN.md`
6. **Complete Context**: Read `.blackbox/PROJECT_CONTEXT.md`

---

## 🎯 Success Criteria for AI-Generated Code

Code is considered successful when:

- ✅ Follows existing patterns
- ✅ Respects module boundaries
- ✅ Has proper TypeScript types
- ✅ Has input validation
- ✅ Has error handling
- ✅ Has Swagger documentation
- ✅ Has tests (or test plan)
- ✅ Builds without errors
- ✅ Passes linting
- ✅ Works as expected

---

**Remember**: This project is designed to be AI-friendly. All the context you need is in the `.blackbox/` directory. Read first, code second! 🚀
