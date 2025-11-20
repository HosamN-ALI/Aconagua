# Backend - Saudi Smart Math Tutor

## 🏗️ Architecture

This backend follows a **Strict Modular Monolith** architecture with clear domain boundaries.

### Module Structure

```
src/
├── modules/
│   ├── auth/           ✅ Authentication & Authorization
│   ├── curriculum/     ✅ Saudi Math Curriculum Data
│   ├── ai-tutor/       🚧 AI Tutoring (Phase 4)
│   └── learning/       🚧 Progress Tracking (Phase 5)
├── shared/             ✅ Shared Kernel (utilities, filters, etc.)
└── main.ts             ✅ Application entry point
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database
```bash
# Start PostgreSQL with Docker (from project root)
cd ..
docker-compose up -d
cd backend

# Generate Prisma client and run migrations
npm run db:setup
```

### 3. Configure Environment
```bash
# Edit .env file
nano .env

# Add your OpenAI API key
OPENAI_API_KEY="sk-your-key-here"
```

### 4. Start Development Server
```bash
npm run start:dev
```

Server will start on `http://localhost:3000`

## 📚 API Documentation

Once the server is running, visit:
```
http://localhost:3000/api/docs
```

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📦 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run start:dev` | Start with hot-reload |
| `npm run build` | Build for production |
| `npm run start:prod` | Run production build |
| `npm run prisma:generate` | Generate Prisma client |
| `npm run prisma:migrate` | Run database migrations |
| `npm run prisma:seed` | Seed database with sample data |
| `npm run db:setup` | Complete database setup |
| `npm run lint` | Lint and fix code |
| `npm run format` | Format with Prettier |

## 🔐 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://postgres:postgres@localhost:5432/smart_tutor` |
| `JWT_SECRET` | Secret key for JWT tokens | (required) |
| `JWT_EXPIRES_IN` | Token expiration time | `7d` |
| `OPENAI_API_KEY` | OpenAI API key | (required for AI features) |
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment | `development` |

## 📖 Module Documentation

### Auth Module
- **Endpoints**: `/api/auth/register`, `/api/auth/login`, `/api/auth/profile`
- **Features**: JWT authentication, role-based access control
- **Roles**: STUDENT, TEACHER, ADMIN

### Curriculum Module
- **Endpoints**: `/api/curriculum/tree`, `/api/curriculum/lessons/:id`, etc.
- **Features**: Full Saudi Math curriculum structure
- **Data**: Subjects → Grades → Chapters → Lessons → Problems → Solutions

## 🛠️ Development Guidelines

### Adding a New Module

1. Create module directory: `src/modules/my-module/`
2. Create subdirectories: `controllers/`, `services/`, `dto/`, `entities/`
3. Create module file: `my-module.module.ts`
4. Register in `app.module.ts`
5. Follow existing patterns from Auth or Curriculum modules

### Module Communication Rules

✅ **Allowed**:
- Direct service injection for read operations
- Event-based communication for write operations

❌ **Forbidden**:
- Direct database access across modules
- Circular dependencies

See `.blackbox/rules/01-architecture.md` for details.

## 🐛 Troubleshooting

### Database Connection Error
```bash
# Check if Docker containers are running
docker ps

# Restart containers
docker-compose down && docker-compose up -d
```

### Prisma Client Not Generated
```bash
npm run prisma:generate
```

### Port Already in Use
Change `PORT` in `.env` file.

## 📄 License

MIT
