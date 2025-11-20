# 📚 Documentation Index

Quick reference to all documentation files in this project.

## 🎯 Start Here

| File | Purpose | Read When |
|------|---------|-----------|
| [PROJECT_CONTEXT.md](.blackbox/PROJECT_CONTEXT.md) | Complete project overview and context | **Always read first** |
| [HOW_TO_USE_WITH_AI.md](.blackbox/HOW_TO_USE_WITH_AI.md) | Guide for AI coding assistants | Working with AI agents |
| [PROJECT_SUMMARY.md](../PROJECT_SUMMARY.md) | What's completed and what's next | Checking project status |
| [GETTING_STARTED.md](../GETTING_STARTED.md) | Setup and installation guide | Setting up the project |

## 📋 Architectural Rules

| File | Purpose | Read When |
|------|---------|-----------|
| [01-architecture.md](./rules/01-architecture.md) | Modular Monolith architecture rules | Before adding/modifying modules |
| [02-tech-stack.md](./rules/02-tech-stack.md) | Technology stack and coding standards | Before adding dependencies |
| [03-atomic-design.md](./rules/03-atomic-design.md) | Frontend component structure | Before building UI components |

## 📖 Project Documentation

| File | Purpose | Read When |
|------|---------|-----------|
| [MASTER_PLAN.md](../docs/MASTER_PLAN.md) | Complete 11-phase project roadmap | Planning next steps |
| [README.md](../README.md) | Project overview and quick start | First time viewing project |
| [backend/README.md](../backend/README.md) | Backend-specific documentation | Working on backend |

## 🗂️ File Organization

```
my-smart-teacher/
├── .blackbox/                          # AI Agent Context
│   ├── INDEX.md                        # 📍 You are here
│   ├── PROJECT_CONTEXT.md              # Complete project context
│   ├── HOW_TO_USE_WITH_AI.md          # AI usage guide
│   └── rules/                          # Architectural rules
│       ├── 01-architecture.md          # Module boundaries
│       ├── 02-tech-stack.md            # Technology decisions
│       └── 03-atomic-design.md         # UI component structure
│
├── docs/                               # Project Documentation
│   └── MASTER_PLAN.md                  # 11-phase roadmap
│
├── backend/                            # NestJS Backend
│   ├── README.md                       # Backend documentation
│   ├── src/
│   │   ├── modules/                    # Domain modules
│   │   │   ├── auth/                   # ✅ Authentication
│   │   │   ├── curriculum/             # ✅ Curriculum data
│   │   │   ├── ai-tutor/               # 🚧 AI tutoring
│   │   │   └── learning/               # 🚧 Progress tracking
│   │   ├── shared/                     # Shared kernel
│   │   └── main.ts                     # Application entry
│   ├── prisma/
│   │   ├── schema.prisma               # Database schema
│   │   └── seed.ts                     # Sample data
│   └── package.json
│
├── docker-compose.yml                  # PostgreSQL + Redis
├── README.md                           # Project overview
├── GETTING_STARTED.md                  # Setup guide
└── PROJECT_SUMMARY.md                  # Status summary
```

## 🎓 Learning Path

### For New Developers

1. Read [README.md](../README.md) - Understand what the project is
2. Read [GETTING_STARTED.md](../GETTING_STARTED.md) - Set up your environment
3. Read [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md) - Understand the architecture
4. Read [01-architecture.md](./rules/01-architecture.md) - Learn the rules
5. Explore `backend/src/modules/auth/` - See a complete module example
6. Read [MASTER_PLAN.md](../docs/MASTER_PLAN.md) - Understand the roadmap

### For AI Agents

1. Read [HOW_TO_USE_WITH_AI.md](./HOW_TO_USE_WITH_AI.md) - AI-specific guide
2. Read [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md) - Complete context
3. Read relevant rule file from `rules/` - Understand constraints
4. Read [MASTER_PLAN.md](../docs/MASTER_PLAN.md) - Know what to build next
5. Check [PROJECT_SUMMARY.md](../PROJECT_SUMMARY.md) - Current status

### For Contributors

1. Read [README.md](../README.md) - Project overview
2. Read all files in `.blackbox/rules/` - Understand architectural constraints
3. Read [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md) - Deep dive into architecture
4. Study existing modules in `backend/src/modules/` - Learn patterns
5. Read [MASTER_PLAN.md](../docs/MASTER_PLAN.md) - See what needs to be done

## 🔍 Quick Reference

### Module Boundaries
See: [01-architecture.md](./rules/01-architecture.md)

### Technology Choices
See: [02-tech-stack.md](./rules/02-tech-stack.md)

### UI Component Structure
See: [03-atomic-design.md](./rules/03-atomic-design.md)

### Current Status
See: [PROJECT_SUMMARY.md](../PROJECT_SUMMARY.md)

### Next Steps
See: [MASTER_PLAN.md](../docs/MASTER_PLAN.md)

### Setup Instructions
See: [GETTING_STARTED.md](../GETTING_STARTED.md)

### API Documentation
When server is running: http://localhost:3000/api/docs

## 📊 Documentation Statistics

- **Total Documentation Files**: 12+
- **Lines of Documentation**: 3,000+
- **Architectural Rule Files**: 3
- **Code Examples**: 20+
- **API Endpoints Documented**: 10+

## 🔄 Keeping Documentation Updated

When making changes:

1. **New Module**: Update [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md)
2. **New Feature**: Update [PROJECT_SUMMARY.md](../PROJECT_SUMMARY.md)
3. **Phase Complete**: Update [MASTER_PLAN.md](../docs/MASTER_PLAN.md)
4. **Architecture Change**: Update relevant file in `rules/`
5. **New Dependency**: Update [02-tech-stack.md](./rules/02-tech-stack.md)

## 🎯 Documentation Goals

This documentation aims to:

- ✅ Provide complete context for AI agents
- ✅ Enable new developers to onboard quickly
- ✅ Enforce architectural consistency
- ✅ Document all design decisions
- ✅ Serve as a single source of truth
- ✅ Be maintainable and up-to-date

---

**Last Updated**: Phase 1-3 Complete
**Next Update**: After Phase 4 (AI Tutor Module)
