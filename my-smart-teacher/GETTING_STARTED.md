# 🚀 Getting Started with Saudi Smart Math Tutor

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 18+ ([Download](https://nodejs.org/))
- **Docker** & **Docker Compose** ([Download](https://www.docker.com/))
- **Git** ([Download](https://git-scm.com/))

## 📦 Installation Steps

### 1. Start the Database

First, start PostgreSQL with pgvector extension using Docker Compose:

```bash
# From the project root directory
docker-compose up -d
```

This will start:
- PostgreSQL database on port `5432`
- Redis cache on port `6379`

Verify the containers are running:
```bash
docker ps
```

### 2. Setup Backend

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

### 3. Configure Environment Variables

The `.env` file is already created. Update it with your actual values:

```bash
# Edit backend/.env
nano .env
```

**Important:** Add your OpenAI API key:
```
OPENAI_API_KEY="sk-your-actual-openai-api-key"
```

### 4. Setup Database Schema

Generate Prisma client and run migrations:

```bash
# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Seed the database with sample data
npm run prisma:seed
```

Or run all at once:
```bash
npm run db:setup
```

### 5. Start the Backend Server

```bash
npm run start:dev
```

The backend will start on `http://localhost:3000`

### 6. Access API Documentation

Open your browser and navigate to:
```
http://localhost:3000/api/docs
```

You'll see the Swagger UI with all available endpoints.

## 🧪 Testing the API

### 1. Register a New User

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@example.com",
    "password": "SecurePass123!",
    "firstName": "Ahmed",
    "lastName": "Ali",
    "role": "STUDENT"
  }'
```

### 2. Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@example.com",
    "password": "SecurePass123!"
  }'
```

Save the returned `token` for authenticated requests.

### 3. Get Curriculum Tree

```bash
curl http://localhost:3000/api/curriculum/tree
```

### 4. Get User Profile (Authenticated)

```bash
curl http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 📁 Project Structure

```
my-smart-teacher/
├── .blackbox/
│   └── rules/              # AI agent architectural rules
│       ├── 01-architecture.md
│       ├── 02-tech-stack.md
│       └── 03-atomic-design.md
├── docs/
│   └── MASTER_PLAN.md      # Complete project roadmap
├── backend/
│   ├── src/
│   │   ├── modules/        # Domain modules
│   │   │   ├── auth/       # ✅ Authentication & Authorization
│   │   │   ├── curriculum/ # ✅ Saudi Math Curriculum
│   │   │   ├── ai-tutor/   # 🚧 AI Tutoring (Next Phase)
│   │   │   └── learning/   # 🚧 Progress Tracking (Next Phase)
│   │   ├── shared/         # Shared kernel
│   │   │   ├── decorators/
│   │   │   ├── filters/
│   │   │   ├── guards/
│   │   │   ├── interceptors/
│   │   │   ├── pipes/
│   │   │   ├── services/
│   │   │   └── utils/
│   │   └── main.ts
│   ├── prisma/
│   │   ├── schema.prisma   # Database schema
│   │   └── seed.ts         # Sample data
│   └── package.json
├── docker-compose.yml      # PostgreSQL + Redis
└── README.md
```

## 🎯 Current Status

### ✅ Phase 1: Infrastructure & Scaffolding - COMPLETED

- [x] NestJS project initialized
- [x] PostgreSQL with pgvector setup
- [x] Prisma ORM configured
- [x] Shared Kernel created
- [x] Modular architecture implemented
- [x] Auth Module (Register, Login, JWT)
- [x] Curriculum Module (Full CRUD API)
- [x] Swagger documentation
- [x] Database seeding

### 🚧 Next Steps (Phase 2)

According to the [MASTER_PLAN.md](./docs/MASTER_PLAN.md), the next phase is:

**Phase 4: The AI Brain (AI Tutor Module)**
- Implement RAG pipeline
- Integrate OpenAI GPT-4o
- OCR for math problems
- Socratic teaching prompts

## 🛠️ Available Scripts

### Backend Scripts

```bash
# Development
npm run start:dev          # Start with hot-reload
npm run start:debug        # Start with debugger

# Build
npm run build              # Build for production
npm run start:prod         # Run production build

# Database
npm run prisma:generate    # Generate Prisma client
npm run prisma:migrate     # Run migrations
npm run prisma:seed        # Seed database
npm run db:setup           # All database setup at once

# Code Quality
npm run lint               # Lint and fix
npm run format             # Format code with Prettier

# Testing
npm run test               # Run unit tests
npm run test:watch         # Run tests in watch mode
npm run test:cov           # Generate coverage report
npm run test:e2e           # Run E2E tests
```

## 🐛 Troubleshooting

### Database Connection Issues

If you get database connection errors:

1. Check if Docker containers are running:
```bash
docker ps
```

2. Restart containers:
```bash
docker-compose down
docker-compose up -d
```

3. Check database logs:
```bash
docker logs smart-tutor-db
```

### Prisma Issues

If Prisma client is not generated:
```bash
cd backend
npm run prisma:generate
```

### Port Already in Use

If port 3000 is already in use, change it in `backend/.env`:
```
PORT=3001
```

## 📚 Documentation

- [Architecture Rules](./.blackbox/rules/01-architecture.md)
- [Tech Stack](./.blackbox/rules/02-tech-stack.md)
- [Atomic Design](./.blackbox/rules/03-atomic-design.md)
- [Master Plan](./docs/MASTER_PLAN.md)
- [API Documentation](http://localhost:3000/api/docs) (when server is running)

## 🤝 Contributing

Please read the architectural rules in `.blackbox/rules/` before contributing.

## 📄 License

MIT License
