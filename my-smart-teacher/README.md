# 🎓 Saudi Smart Math Tutor

> An AI-powered educational platform providing personalized math tutoring for Saudi students following the national curriculum, using Socratic teaching methods and adaptive learning.

[![Status](https://img.shields.io/badge/Status-Phase%201--3%20Complete-success)]()
[![Backend](https://img.shields.io/badge/Backend-NestJS-red)]()
[![Database](https://img.shields.io/badge/Database-PostgreSQL-blue)]()
[![Documentation](https://img.shields.io/badge/Docs-Comprehensive-green)]()

---

## 🚀 Quick Start (5 Minutes)

```bash
# 1. Start database
docker-compose up -d

# 2. Setup backend
cd backend
npm install
npm run db:setup
npm run start:dev

# 3. Open Swagger UI
# http://localhost:3000/api/docs
```

**That's it!** 🎉 You now have a working backend with authentication and curriculum API.

📖 **New here?** Start with [START_HERE.md](./START_HERE.md)

---

## ✅ What's Completed

### Phase 1-3: Foundation (100% Complete)

- ✅ **Backend Infrastructure** - NestJS + PostgreSQL + Redis
- ✅ **Authentication System** - JWT with role-based access control
- ✅ **Curriculum API** - Complete Saudi Math curriculum CRUD
- ✅ **Database Schema** - All 14 tables with relationships
- ✅ **Documentation** - 3,000+ lines across 12+ files
- ✅ **Docker Setup** - One-command database start
- ✅ **Sample Data** - Seeded curriculum for testing

### 🚧 Next Up: Phase 4 - AI Tutor Module

- OpenAI GPT-4o integration
- RAG pipeline with pgvector
- OCR for math problems
- Socratic teaching prompts
- Real-time chat with WebSocket

---

## 🏗️ Architecture

**Modular Monolith** - Single deployable app with isolated domain modules

```
┌─────────────────────────────────────┐
│         API Gateway (NestJS)        │
└─────────────────────────────────────┘
              │
    ┌─────────┼─────────┐
    │         │         │
    ▼         ▼         ▼
┌────────┐ ┌──────────┐ ┌──────────┐
│  Auth  │ │Curriculum│ │ AI Tutor │
│   ✅   │ │    ✅    │ │    🚧    │
└────────┘ └──────────┘ └──────────┘
              │
              ▼
    ┌─────────────────┐
    │   PostgreSQL    │
    │  (with pgvector)│
    └─────────────────┘
```

### Module Boundaries

- **Auth Module** ✅ - User management, JWT authentication, role-based access
- **Curriculum Module** ✅ - Saudi Math curriculum data (Subject → Grade → Chapter → Lesson → Problem)
- **AI Tutor Module** 🚧 - LLM integration, RAG, OCR (Phase 4)
- **Learning Module** 📅 - Progress tracking, gamification (Phase 5)

---

## 🛠️ Tech Stack

### Backend (Implemented)
- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type-safe development (strict mode)
- **Prisma** - Next-generation ORM
- **PostgreSQL** - Relational database with pgvector
- **JWT** - Authentication with Passport
- **Swagger** - API documentation

### Frontend (Phase 6+)
- **Next.js 14+** - React framework with App Router
- **Tailwind CSS** - Utility-first CSS
- **Zustand** - State management
- **react-katex** - LaTeX math rendering

### AI (Phase 4+)
- **OpenAI GPT-4o** - AI tutoring and vision
- **LangChain** - LLM orchestration
- **pgvector** - Vector similarity search

---

## 📁 Project Structure

```
my-smart-teacher/
├── 📖 START_HERE.md              ← Start here!
├── 📖 GETTING_STARTED.md         ← Detailed setup
├── 📖 PROJECT_SUMMARY.md         ← What's completed
├── 📖 FINAL_REPORT.md            ← Complete report
│
├── .blackbox/                    ← AI Agent Context
│   ├── INDEX.md                  ← Documentation index
│   ├── PROJECT_CONTEXT.md        ← Complete context
│   ├── HOW_TO_USE_WITH_AI.md    ← AI usage guide
│   └── rules/                    ← Architectural rules
│       ├── 01-architecture.md
│       ├── 02-tech-stack.md
│       └── 03-atomic-design.md
│
├── docs/
│   └── MASTER_PLAN.md            ← 11-phase roadmap
│
├── backend/                      ← NestJS Backend
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/            ✅ Complete
│   │   │   ├── curriculum/      ✅ Complete
│   │   │   ├── ai-tutor/        📁 Ready
│   │   │   └── learning/        📁 Ready
│   │   └── shared/              ✅ Shared kernel
│   └── prisma/
│       ├── schema.prisma        ✅ All entities
│       └── seed.ts              ✅ Sample data
│
└── docker-compose.yml           ✅ PostgreSQL + Redis
```

---

## 📚 Documentation

### 🎯 Essential Reading

| Document | Purpose | Read When |
|----------|---------|-----------|
| [START_HERE.md](./START_HERE.md) | Quick start guide | **First time** |
| [GETTING_STARTED.md](./GETTING_STARTED.md) | Detailed setup | Setting up |
| [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) | Current status | Checking progress |
| [FINAL_REPORT.md](./FINAL_REPORT.md) | Complete report | Full overview |

### 🏗️ Architecture & Rules

| Document | Purpose |
|----------|---------|
| [.blackbox/PROJECT_CONTEXT.md](./.blackbox/PROJECT_CONTEXT.md) | Complete project context |
| [.blackbox/rules/01-architecture.md](./.blackbox/rules/01-architecture.md) | Modular Monolith rules |
| [.blackbox/rules/02-tech-stack.md](./.blackbox/rules/02-tech-stack.md) | Technology decisions |
| [.blackbox/rules/03-atomic-design.md](./.blackbox/rules/03-atomic-design.md) | UI component structure |

### 📋 Planning & Roadmap

| Document | Purpose |
|----------|---------|
| [docs/MASTER_PLAN.md](./docs/MASTER_PLAN.md) | 11-phase project roadmap |
| [VERIFICATION_CHECKLIST.md](./VERIFICATION_CHECKLIST.md) | Quality assurance |

### 🤖 For AI Agents

| Document | Purpose |
|----------|---------|
| [.blackbox/HOW_TO_USE_WITH_AI.md](./.blackbox/HOW_TO_USE_WITH_AI.md) | AI usage guide |
| [.blackbox/INDEX.md](./.blackbox/INDEX.md) | Documentation index |

---

## 🧪 API Testing

### Authentication

```bash
# Register a user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@example.com",
    "password": "SecurePass123!",
    "firstName": "Ahmed",
    "lastName": "Ali",
    "role": "STUDENT"
  }'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@example.com",
    "password": "SecurePass123!"
  }'
```

### Curriculum

```bash
# Get full curriculum tree
curl http://localhost:3000/api/curriculum/tree

# Search lessons
curl "http://localhost:3000/api/curriculum/search?q=counting"
```

**API Documentation**: http://localhost:3000/api/docs (when running)

---

## 📊 Project Status

| Phase | Status | Completion |
|-------|--------|------------|
| Phase 1: Infrastructure & Scaffolding | ✅ Complete | 100% |
| Phase 2: Core Domain (Curriculum) | ✅ Complete | 100% |
| Phase 3: Authentication & User Management | ✅ Complete | 100% |
| Phase 4: AI Tutor Module | 🚧 Next | 0% |
| Phase 5: Learning & Progress Tracking | 📅 Planned | 0% |
| Phase 6: Frontend Foundation | 📅 Planned | 0% |
| Phase 7: Interactive Chat Interface | 📅 Planned | 0% |
| Phase 8: Student Dashboard | 📅 Planned | 0% |
| Phase 9: Teacher Portal | 📅 Planned | 0% |
| Phase 10: Testing & Optimization | 📅 Planned | 0% |
| Phase 11: Deployment & DevOps | 📅 Planned | 0% |

---

## 🤝 Contributing

This project follows strict architectural guidelines to maintain code quality and consistency.

### Before Contributing

1. Read [.blackbox/rules/01-architecture.md](./.blackbox/rules/01-architecture.md) - Module boundaries
2. Read [.blackbox/rules/02-tech-stack.md](./.blackbox/rules/02-tech-stack.md) - Technology choices
3. Study existing modules (`backend/src/modules/auth/` or `curriculum/`)
4. Follow the established patterns

### Key Rules

- ✅ Use path aliases (`@modules/*`, `@shared/*`)
- ✅ Add Swagger decorators to all endpoints
- ✅ Validate all inputs with DTOs
- ✅ No cross-module database access
- ✅ Write tests for new features

---

## 🐛 Troubleshooting

### Database won't start
```bash
docker-compose down
docker-compose up -d
docker logs smart-tutor-db
```

### Backend won't start
```bash
cd backend
npm run prisma:generate
npm run start:dev
```

### Port 3000 in use
Edit `backend/.env` and change `PORT=3001`

**More help**: See [GETTING_STARTED.md](./GETTING_STARTED.md)

---

## 📄 License

MIT License

---

## 🎯 Next Steps

### For Developers
1. Run through [VERIFICATION_CHECKLIST.md](./VERIFICATION_CHECKLIST.md)
2. Read [backend/README.md](./backend/README.md)
3. Check [docs/MASTER_PLAN.md](./docs/MASTER_PLAN.md) for Phase 4

### For AI Agents
1. Read [.blackbox/HOW_TO_USE_WITH_AI.md](./.blackbox/HOW_TO_USE_WITH_AI.md)
2. Read [.blackbox/PROJECT_CONTEXT.md](./.blackbox/PROJECT_CONTEXT.md)
3. Start implementing Phase 4 (AI Tutor Module)

---

**Ready to build?** 🚀 Start with [START_HERE.md](./START_HERE.md)

**Current Status**: Phase 1-3 Complete ✅ | Ready for Phase 4 🚀
