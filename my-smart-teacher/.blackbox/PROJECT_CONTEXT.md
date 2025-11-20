# Project Context for AI Agents

## 🎯 Project Overview

**Saudi Smart Math Tutor** is an AI-powered educational platform designed to provide personalized math tutoring for Saudi students following the national curriculum. The system uses Socratic teaching methods and adaptive learning powered by GPT-4o.

## 🏗️ Architecture Type

**Modular Monolith** - A single deployable application internally divided into isolated domain modules.

### Why Modular Monolith?

1. **Simplicity**: Single deployment, easier to develop and debug
2. **Performance**: No network overhead between modules
3. **Scalability**: Can be split into microservices later if needed
4. **Clear Boundaries**: Enforced module isolation prevents spaghetti code

## 📦 Module Structure

### 1. Auth Module (`src/modules/auth/`)
**Status**: ✅ Implemented

**Responsibility**: User management, authentication, and authorization

**Key Components**:
- JWT-based authentication
- Role-based access control (STUDENT, TEACHER, ADMIN)
- Password hashing with bcrypt
- User registration and login

**Public API**:
- `AuthService` - Can be injected by other modules (read-only)
- `JwtAuthGuard` - Protect routes
- `@CurrentUser()` decorator - Get authenticated user

**Rules**:
- Other modules MUST NOT directly access User database table
- Use AuthService for user-related queries
- Never expose password hashes

---

### 2. Curriculum Module (`src/modules/curriculum/`)
**Status**: ✅ Implemented

**Responsibility**: Saudi Math curriculum data structure (pure data provider)

**Key Entities**:
- Subject → Grade → Chapter → Lesson → Problem → Solution

**Public API**:
- `CurriculumService` - Read-only access to curriculum data
- All methods are read operations (GET)

**Rules**:
- This module is STATELESS - no user-specific data
- MUST NOT depend on Auth, AI, or Learning modules
- Other modules can freely read from this module
- Write operations only through admin tools (future)

---

### 3. AI Tutor Module (`src/modules/ai-tutor/`)
**Status**: 🚧 Not Yet Implemented (Phase 4)

**Responsibility**: The "Brain" - LLM integration, RAG, OCR

**Planned Components**:
- RAG Pipeline (Retrieval-Augmented Generation)
- OpenAI GPT-4o integration
- OCR for handwritten math problems
- Socratic teaching prompt templates
- Conversation context management

**Dependencies**:
- Can READ from Curriculum Module (to get lesson context)
- Can READ from Auth Module (to personalize responses)
- MUST NOT write to Curriculum or Auth

**Rules**:
- All prompts stored in `src/modules/ai-tutor/prompts/`
- Use pgvector for semantic search
- Stream responses for better UX
- Log all AI interactions for quality monitoring

---

### 4. Learning Module (`src/modules/learning/`)
**Status**: 🚧 Not Yet Implemented (Phase 5)

**Responsibility**: Student progress tracking and gamification

**Planned Components**:
- Progress tracking per lesson
- Quiz attempt history
- Achievement system
- Scoring and analytics

**Dependencies**:
- Reads from Curriculum (to know what lessons exist)
- Reads from Auth (to know which student)
- Listens to events from AI Tutor (when student completes activity)

**Rules**:
- Use event-driven architecture for progress updates
- Never block user actions waiting for progress updates
- Aggregate data for analytics dashboard

---

## 🔄 Module Communication Rules

### ✅ Allowed Communication Patterns

1. **Direct Service Injection (Read-Only)**
   ```typescript
   // Learning Module can inject CurriculumService
   constructor(private curriculumService: CurriculumService) {}
   ```

2. **Event-Based (Write Operations)**
   ```typescript
   // AI Tutor emits event when student solves problem
   this.eventEmitter.emit('problem.solved', { userId, problemId });
   
   // Learning Module listens and updates progress
   @OnEvent('problem.solved')
   handleProblemSolved(payload) { ... }
   ```

### ❌ Forbidden Patterns

1. **Cross-Module Database Access**
   ```typescript
   // ❌ NEVER DO THIS
   // AI Tutor directly querying User table
   await this.prisma.user.findUnique({ ... });
   
   // ✅ DO THIS INSTEAD
   await this.authService.getUser(userId);
   ```

2. **Circular Dependencies**
   ```typescript
   // ❌ Auth imports Learning, Learning imports Auth
   // This creates a circular dependency
   ```

---

## 🗄️ Database Schema Overview

### Core Tables

**Users** (Auth Module)
- id, email, password, firstName, lastName, role, isActive

**Subjects → Grades → Chapters → Lessons → Problems → Solutions** (Curriculum)
- Hierarchical structure of Saudi Math curriculum
- Bilingual (English + Arabic)

**LessonEmbeddings** (AI Tutor)
- Vector embeddings for RAG
- Uses pgvector extension

**StudentProgress, QuizAttempts, Achievements** (Learning)
- Tracks student journey
- Gamification data

---

## 🛠️ Shared Kernel (`src/shared/`)

**Purpose**: Generic, reusable code that has NO business logic

**Contents**:
- `PrismaService` - Database connection
- `DateUtil` - Date manipulation helpers
- `HashUtil` - Password hashing
- `@CurrentUser()` decorator
- `HttpExceptionFilter` - Global error handling
- `TransformInterceptor` - Response formatting
- `ValidationPipe` - DTO validation

**Rules**:
- Shared Kernel CANNOT import from any Module
- Only pure utility functions and framework wrappers
- No business logic allowed

---

## 🎨 Frontend Architecture (Future - Phase 6+)

**Framework**: Next.js 14+ with App Router

**Design System**: Atomic Design
- **Atoms**: Button, Input, MathFormula (LaTeX)
- **Molecules**: ChatMessageBubble, MathProblemCard
- **Organisms**: ChatWindow, CurriculumTree
- **Templates**: DashboardLayout, ChatRoomLayout

**State Management**: Zustand

**Styling**: Tailwind CSS

---

## 🔐 Security Considerations

1. **Authentication**: JWT tokens with 7-day expiry
2. **Authorization**: Role-based guards on sensitive endpoints
3. **Validation**: All DTOs validated with class-validator
4. **Secrets**: Never commit .env files
5. **SQL Injection**: Prisma ORM prevents this automatically
6. **XSS**: React escapes by default

---

## 📊 Current Implementation Status

### ✅ Completed (Phase 1)

- [x] NestJS project structure
- [x] PostgreSQL + pgvector setup
- [x] Prisma ORM with complete schema
- [x] Shared Kernel (utilities, filters, interceptors)
- [x] Auth Module (register, login, JWT)
- [x] Curriculum Module (full CRUD API)
- [x] Swagger documentation
- [x] Database seeding script

### 🚧 Next Phase (Phase 4 - AI Tutor)

According to `docs/MASTER_PLAN.md`, the next steps are:

1. Setup AI-Tutor Module structure
2. Integrate OpenAI API
3. Implement RAG pipeline with pgvector
4. Create Socratic teaching prompts
5. Implement OCR for math images
6. Add WebSocket for real-time chat

---

## 🧪 Testing Strategy

### Unit Tests
- Each service should have `.spec.ts` file
- Mock external dependencies (Prisma, OpenAI)
- Test business logic in isolation

### Integration Tests
- Test module interactions
- Use test database
- Mock only external APIs

### E2E Tests
- Test complete user flows
- Use Supertest for HTTP requests
- Test authentication flows

---

## 📝 Code Style Guidelines

1. **TypeScript Strict Mode**: Enabled
2. **Naming Conventions**:
   - Classes: PascalCase (`UserService`)
   - Files: kebab-case (`user.service.ts`)
   - Variables: camelCase (`userId`)
3. **Imports**: Use path aliases (`@modules/*`, `@shared/*`)
4. **Comments**: Only for complex logic, not obvious code
5. **Error Handling**: Use NestJS exceptions (`NotFoundException`, etc.)

---

## 🚀 Deployment Strategy (Future)

**Backend**: Railway, Render, or AWS ECS
**Frontend**: Vercel (recommended for Next.js)
**Database**: Supabase or AWS RDS (PostgreSQL with pgvector)
**Redis**: Upstash or AWS ElastiCache

---

## 📚 Key Documentation Files

1. `.blackbox/rules/01-architecture.md` - Modular Monolith rules
2. `.blackbox/rules/02-tech-stack.md` - Technology decisions
3. `.blackbox/rules/03-atomic-design.md` - Frontend component structure
4. `docs/MASTER_PLAN.md` - Complete project roadmap (11 phases)
5. `GETTING_STARTED.md` - Setup instructions

---

## 🤖 Instructions for AI Agents

When working on this project:

1. **Always read** the relevant rule file in `.blackbox/rules/` first
2. **Never violate** module boundaries (no cross-module database access)
3. **Use path aliases** (`@modules/*`, `@shared/*`) for imports
4. **Follow existing patterns** - look at Auth or Curriculum modules as examples
5. **Add Swagger decorators** to all controller endpoints
6. **Write tests** for new services
7. **Update MASTER_PLAN.md** when completing phases
8. **Ask for clarification** if module responsibility is unclear

### Example: Adding a New Feature

**Bad Approach** ❌:
```typescript
// In AI Tutor Module - directly accessing User table
const user = await this.prisma.user.findUnique({ where: { id: userId } });
```

**Good Approach** ✅:
```typescript
// In AI Tutor Module - using AuthService
constructor(private authService: AuthService) {}

const user = await this.authService.getProfile(userId);
```

---

## 🎯 Success Criteria

The project is successful when:

1. ✅ Students can register and login
2. ✅ Curriculum tree is browsable
3. 🚧 AI tutor provides helpful, Socratic responses
4. 🚧 OCR accurately extracts math from images
5. 🚧 Student progress is tracked accurately
6. 🚧 Gamification motivates continued learning
7. 🚧 System handles 1000+ concurrent users
8. 🚧 AI responses are 90%+ positively rated

---

**Last Updated**: Phase 1 Completed
**Next Milestone**: Phase 4 - AI Tutor Module
