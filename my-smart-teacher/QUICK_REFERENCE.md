# ⚡ Quick Reference Guide

One-page reference for the Saudi Smart Math Tutor project.

---

## 🚀 Quick Start

```bash
# 1. Start database
docker-compose up -d

# 2. Setup backend
cd backend && npm install && npm run db:setup && npm run start:dev

# 3. Open Swagger
# http://localhost:3000/api/docs
```

---

## 📁 Essential Files

| File | Purpose |
|------|---------|
| [START_HERE.md](./START_HERE.md) | **Start here!** |
| [SUCCESS_REPORT.md](./SUCCESS_REPORT.md) | What's accomplished |
| [GETTING_STARTED.md](./GETTING_STARTED.md) | Detailed setup |
| [NEXT_STEPS.md](./NEXT_STEPS.md) | Phase 4 guide |
| [.blackbox/PROJECT_CONTEXT.md](./.blackbox/PROJECT_CONTEXT.md) | Complete context |

---

## 🎯 Current Status

| Phase | Status |
|-------|--------|
| Phase 1-3 | ✅ Complete |
| Phase 4 | 🚧 Next |
| Phase 5-11 | 📅 Planned |

---

## 🏗️ Architecture

```
API Gateway (NestJS)
    │
    ├── Auth Module ✅
    ├── Curriculum Module ✅
    ├── AI Tutor Module 📁
    └── Learning Module 📁
    │
    └── PostgreSQL + pgvector
```

---

## 🛠️ Tech Stack

- **Backend**: NestJS + TypeScript + Prisma
- **Database**: PostgreSQL + pgvector + Redis
- **Auth**: JWT + Passport + bcrypt
- **Docs**: Swagger/OpenAPI
- **AI** (Phase 4): OpenAI GPT-4o + LangChain

---

## 📊 API Endpoints

### Auth
- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Profile (protected)

### Curriculum
- `GET /api/curriculum/tree` - Full tree
- `GET /api/curriculum/search?q=keyword` - Search
- `GET /api/curriculum/lessons/:id` - Lesson details

---

## 🧪 Quick Test

```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Pass123!","firstName":"Test","lastName":"User","role":"STUDENT"}'

# Get curriculum
curl http://localhost:3000/api/curriculum/tree
```

---

## 📚 Documentation Index

### Getting Started
- [START_HERE.md](./START_HERE.md) - Quick start
- [GETTING_STARTED.md](./GETTING_STARTED.md) - Detailed setup
- [VERIFICATION_CHECKLIST.md](./VERIFICATION_CHECKLIST.md) - QA checklist

### Project Status
- [SUCCESS_REPORT.md](./SUCCESS_REPORT.md) - Success report
- [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) - Status summary
- [FINAL_REPORT.md](./FINAL_REPORT.md) - Complete report
- [FILES_CREATED.md](./FILES_CREATED.md) - File list

### Planning
- [docs/MASTER_PLAN.md](./docs/MASTER_PLAN.md) - 11-phase roadmap
- [NEXT_STEPS.md](./NEXT_STEPS.md) - Phase 4 guide

### Architecture
- [.blackbox/PROJECT_CONTEXT.md](./.blackbox/PROJECT_CONTEXT.md) - Complete context
- [.blackbox/rules/01-architecture.md](./.blackbox/rules/01-architecture.md) - Architecture rules
- [.blackbox/rules/02-tech-stack.md](./.blackbox/rules/02-tech-stack.md) - Tech stack
- [.blackbox/rules/03-atomic-design.md](./.blackbox/rules/03-atomic-design.md) - UI design

### AI Agents
- [.blackbox/HOW_TO_USE_WITH_AI.md](./.blackbox/HOW_TO_USE_WITH_AI.md) - AI guide
- [.blackbox/INDEX.md](./.blackbox/INDEX.md) - Documentation index

---

## 🔧 Common Commands

### Backend
```bash
cd backend

# Development
npm run start:dev          # Start with hot-reload
npm run build              # Build for production

# Database
npm run prisma:generate    # Generate Prisma client
npm run prisma:migrate     # Run migrations
npm run prisma:seed        # Seed database
npm run db:setup           # All database setup

# Code Quality
npm run lint               # Lint code
npm run format             # Format code

# Testing
npm run test               # Run tests
npm run test:cov           # Coverage report
```

### Docker
```bash
docker-compose up -d       # Start containers
docker-compose down        # Stop containers
docker ps                  # List containers
docker logs smart-tutor-db # View logs
```

---

## 🐛 Troubleshooting

### Database won't start
```bash
docker-compose down && docker-compose up -d
docker logs smart-tutor-db
```

### Backend won't start
```bash
cd backend
npm run prisma:generate
npm run start:dev
```

### Port 3000 in use
Edit `backend/.env`: `PORT=3001`

---

## 📊 Statistics

- **Files Created**: 48
- **Lines of Code**: 7,455+
- **Documentation**: 5,600+ lines
- **API Endpoints**: 10+
- **Database Tables**: 14
- **Modules**: 4 (2 complete, 2 ready)

---

## 🎯 Next Steps

1. Read [NEXT_STEPS.md](./NEXT_STEPS.md)
2. Install AI dependencies
3. Implement AI Tutor Module
4. Test and document

---

## 📞 Quick Links

- **Swagger UI**: http://localhost:3000/api/docs
- **Auth Module**: `backend/src/modules/auth/`
- **Curriculum Module**: `backend/src/modules/curriculum/`
- **Database Schema**: `backend/prisma/schema.prisma`

---

## ✅ Success Criteria

- [x] Backend running
- [x] Database connected
- [x] Auth working
- [x] Curriculum API working
- [x] Swagger accessible
- [x] Documentation complete

---

**Status**: Phase 1-3 Complete ✅ | Ready for Phase 4 🚀

**Last Updated**: November 20, 2025
