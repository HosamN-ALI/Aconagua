# ✅ Verification Checklist

Use this checklist to verify that the project is set up correctly.

## 📋 Phase 1: Infrastructure Setup

### Docker & Database

- [ ] Docker is installed and running
  ```bash
  docker --version
  docker-compose --version
  ```

- [ ] Start Docker containers
  ```bash
  docker-compose up -d
  ```

- [ ] Verify containers are running
  ```bash
  docker ps
  # Should show: smart-tutor-db and smart-tutor-redis
  ```

- [ ] Check PostgreSQL logs
  ```bash
  docker logs smart-tutor-db
  # Should show: "database system is ready to accept connections"
  ```

### Backend Setup

- [ ] Node.js is installed (18+)
  ```bash
  node --version
  # Should show: v18.x.x or higher
  ```

- [ ] Navigate to backend directory
  ```bash
  cd backend
  ```

- [ ] Install dependencies
  ```bash
  npm install
  # Should complete without errors
  ```

- [ ] Check if .env file exists
  ```bash
  ls -la .env
  # Should show: .env file
  ```

- [ ] Generate Prisma client
  ```bash
  npm run prisma:generate
  # Should show: "Generated Prisma Client"
  ```

- [ ] Run database migrations
  ```bash
  npm run prisma:migrate
  # Should create tables in database
  ```

- [ ] Seed database with sample data
  ```bash
  npm run prisma:seed
  # Should show: "🎉 Database seeding completed successfully!"
  ```

### Start Backend Server

- [ ] Start development server
  ```bash
  npm run start:dev
  ```

- [ ] Verify server is running
  ```
  Should show:
  - 🚀 Application is running on: http://localhost:3000
  - 📚 Swagger documentation: http://localhost:3000/api/docs
  ```

- [ ] Open browser and access Swagger UI
  ```
  http://localhost:3000/api/docs
  ```

- [ ] Verify Swagger shows these tags:
  - [ ] Authentication
  - [ ] Curriculum

## 📋 Phase 2: API Testing

### Test Authentication Endpoints

- [ ] Test user registration
  ```bash
  curl -X POST http://localhost:3000/api/auth/register \
    -H "Content-Type: application/json" \
    -d '{
      "email": "test@example.com",
      "password": "SecurePass123!",
      "firstName": "Test",
      "lastName": "User",
      "role": "STUDENT"
    }'
  ```
  **Expected**: Success response with user data and JWT token

- [ ] Test user login
  ```bash
  curl -X POST http://localhost:3000/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{
      "email": "test@example.com",
      "password": "SecurePass123!"
    }'
  ```
  **Expected**: Success response with user data and JWT token

- [ ] Save the token from login response
  ```bash
  export TOKEN="your-jwt-token-here"
  ```

- [ ] Test protected endpoint (get profile)
  ```bash
  curl http://localhost:3000/api/auth/profile \
    -H "Authorization: Bearer $TOKEN"
  ```
  **Expected**: User profile data

- [ ] Test protected endpoint without token (should fail)
  ```bash
  curl http://localhost:3000/api/auth/profile
  ```
  **Expected**: 401 Unauthorized error

### Test Curriculum Endpoints

- [ ] Get curriculum tree
  ```bash
  curl http://localhost:3000/api/curriculum/tree
  ```
  **Expected**: Full curriculum hierarchy with subjects, grades, chapters, lessons

- [ ] Search lessons
  ```bash
  curl "http://localhost:3000/api/curriculum/search?q=counting"
  ```
  **Expected**: Search results with matching lessons

- [ ] Get specific lesson (use ID from tree response)
  ```bash
  curl http://localhost:3000/api/curriculum/lessons/LESSON_ID_HERE
  ```
  **Expected**: Lesson details with problems and solutions

## 📋 Phase 3: Code Quality Checks

### Linting

- [ ] Run ESLint
  ```bash
  npm run lint
  ```
  **Expected**: No errors (warnings are okay)

### Formatting

- [ ] Check code formatting
  ```bash
  npm run format
  ```
  **Expected**: Code formatted successfully

### Build

- [ ] Build for production
  ```bash
  npm run build
  ```
  **Expected**: Build completes without errors

### TypeScript

- [ ] Check TypeScript compilation
  ```bash
  npx tsc --noEmit
  ```
  **Expected**: No type errors

## 📋 Phase 4: Database Verification

### Check Database Tables

- [ ] Connect to PostgreSQL
  ```bash
  docker exec -it smart-tutor-db psql -U postgres -d smart_tutor
  ```

- [ ] List all tables
  ```sql
  \dt
  ```
  **Expected**: Should show all tables:
  - users
  - subjects
  - grades
  - chapters
  - lessons
  - problems
  - solutions
  - lesson_embeddings
  - chat_sessions
  - chat_messages
  - student_progress
  - quiz_attempts
  - achievements
  - user_achievements

- [ ] Check if data was seeded
  ```sql
  SELECT COUNT(*) FROM users;
  SELECT COUNT(*) FROM subjects;
  SELECT COUNT(*) FROM grades;
  SELECT COUNT(*) FROM lessons;
  ```
  **Expected**: Non-zero counts

- [ ] Exit PostgreSQL
  ```sql
  \q
  ```

### Check pgvector Extension

- [ ] Verify pgvector is installed
  ```bash
  docker exec -it smart-tutor-db psql -U postgres -d smart_tutor -c "SELECT * FROM pg_extension WHERE extname = 'vector';"
  ```
  **Expected**: Should show vector extension

## 📋 Phase 5: Documentation Verification

### Check Documentation Files

- [ ] Verify all documentation files exist
  ```bash
  ls -la .blackbox/rules/
  ls -la docs/
  ls -la *.md
  ```

- [ ] Read PROJECT_CONTEXT.md
  ```bash
  cat .blackbox/PROJECT_CONTEXT.md
  ```

- [ ] Read MASTER_PLAN.md
  ```bash
  cat docs/MASTER_PLAN.md
  ```

## 📋 Phase 6: Module Structure Verification

### Check Module Directories

- [ ] Verify Auth Module structure
  ```bash
  ls -R backend/src/modules/auth/
  ```
  **Expected**: controllers, services, dto, guards, strategies

- [ ] Verify Curriculum Module structure
  ```bash
  ls -R backend/src/modules/curriculum/
  ```
  **Expected**: controllers, services

- [ ] Verify Shared Kernel structure
  ```bash
  ls -R backend/src/shared/
  ```
  **Expected**: decorators, filters, guards, interceptors, pipes, services, utils

## 📋 Phase 7: Environment Configuration

### Check Environment Variables

- [ ] Verify .env file has all required variables
  ```bash
  cat backend/.env
  ```
  **Expected**: Should contain:
  - DATABASE_URL
  - JWT_SECRET
  - JWT_EXPIRES_IN
  - OPENAI_API_KEY
  - PORT
  - NODE_ENV

- [ ] Verify .env.example exists
  ```bash
  cat backend/.env.example
  ```

## 🎯 Final Verification

### All Systems Go Checklist

- [ ] ✅ Docker containers running
- [ ] ✅ Database connected and seeded
- [ ] ✅ Backend server running on port 3000
- [ ] ✅ Swagger UI accessible
- [ ] ✅ Auth endpoints working (register, login, profile)
- [ ] ✅ Curriculum endpoints working (tree, search, lessons)
- [ ] ✅ Protected routes require authentication
- [ ] ✅ Code builds without errors
- [ ] ✅ Linting passes
- [ ] ✅ All documentation files present
- [ ] ✅ Module structure correct

## 🐛 Troubleshooting

### Issue: Docker containers not starting

**Solution**:
```bash
docker-compose down
docker-compose up -d
docker logs smart-tutor-db
```

### Issue: Database connection error

**Solution**:
```bash
# Check if PostgreSQL is running
docker ps | grep smart-tutor-db

# Restart database
docker restart smart-tutor-db

# Check connection string in .env
cat backend/.env | grep DATABASE_URL
```

### Issue: Prisma client not generated

**Solution**:
```bash
cd backend
npm run prisma:generate
```

### Issue: Port 3000 already in use

**Solution**:
```bash
# Change port in backend/.env
echo "PORT=3001" >> backend/.env

# Or kill process using port 3000
lsof -ti:3000 | xargs kill -9
```

### Issue: npm install fails

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

## ✅ Success Criteria

Your setup is successful when:

1. ✅ All Docker containers are running
2. ✅ Backend server starts without errors
3. ✅ Swagger UI is accessible
4. ✅ You can register a new user
5. ✅ You can login and get a JWT token
6. ✅ You can access protected endpoints with token
7. ✅ You can retrieve curriculum data
8. ✅ Database has seeded data
9. ✅ Code builds and lints successfully
10. ✅ All documentation is readable

## 🎉 Next Steps

Once all checks pass:

1. Read [docs/MASTER_PLAN.md](./docs/MASTER_PLAN.md) for Phase 4 tasks
2. Read [.blackbox/HOW_TO_USE_WITH_AI.md](./.blackbox/HOW_TO_USE_WITH_AI.md) for AI development
3. Start implementing Phase 4: AI Tutor Module

---

**Verification Date**: _____________
**Verified By**: _____________
**Status**: [ ] All Passed [ ] Some Failed (see notes below)

**Notes**:
_____________________________________________
_____________________________________________
_____________________________________________
