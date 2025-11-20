# Project Master Plan: Saudi Smart Math Tutor

## Vision
An AI-powered educational platform that provides personalized math tutoring for Saudi students following the national curriculum, using Socratic teaching methods and adaptive learning.

---

## Phase 1: Infrastructure & Scaffolding ⚙️
**Goal:** Set up the foundation for a scalable Modular Monolith.

### Tasks:
- [ ] Initialize NestJS project with TypeScript strict mode
- [ ] Setup PostgreSQL database with Docker Compose
- [ ] Install and configure Prisma ORM
- [ ] Enable pgvector extension for vector embeddings
- [ ] Setup basic `SharedKernel` (Abstract Base Classes, Utilities)
- [ ] Configure environment variables validation
- [ ] Setup ESLint, Prettier, and Husky
- [ ] Create base project structure following modular architecture

**Deliverables:**
- Working NestJS application
- Database connection established
- Development environment ready

---

## Phase 2: Core Domain (Curriculum Module) 📚
**Goal:** Build the foundation of Saudi Math curriculum data structure.

### Tasks:
- [ ] Design Prisma schema for curriculum entities:
  - Subject (Math)
  - Grade (1-12)
  - Chapter
  - Lesson
  - Problem
  - Solution
- [ ] Implement `Curriculum` Module with CRUD services
- [ ] Create seeding script to populate DB with Saudi Math curriculum structure
- [ ] Implement API endpoints:
  - `GET /curriculum/tree` - Full curriculum hierarchy
  - `GET /curriculum/grades/:id/chapters` - Chapters by grade
  - `GET /curriculum/lessons/:id` - Lesson details
- [ ] Add Swagger documentation for all endpoints
- [ ] Write unit tests for curriculum services

**Deliverables:**
- Fully functional Curriculum API
- Seeded database with sample curriculum data
- API documentation

---

## Phase 3: Authentication & User Management 🔐
**Goal:** Secure the platform with role-based access control.

### Tasks:
- [ ] Design User schema (Teachers, Students, Admins)
- [ ] Implement `Auth` Module:
  - User registration
  - Login with JWT
  - Password hashing (bcrypt)
  - Role-based guards
- [ ] Create `@CurrentUser()` decorator
- [ ] Implement refresh token mechanism
- [ ] Add API endpoints:
  - `POST /auth/register`
  - `POST /auth/login`
  - `POST /auth/refresh`
  - `GET /auth/profile`
- [ ] Write E2E tests for authentication flow

**Deliverables:**
- Secure authentication system
- Role-based access control
- Protected API endpoints

---

## Phase 4: The AI Brain (AI Tutor Module) 🧠
**Goal:** Implement the intelligent tutoring system with RAG and OCR.

### Tasks:
- [ ] Setup `AI-Tutor` Module structure
- [ ] Integrate OpenAI API (GPT-4o)
- [ ] Implement **RAG Pipeline**:
  1. Embed curriculum content using OpenAI embeddings
  2. Store embeddings in pgvector
  3. Implement semantic search for relevant context retrieval
  4. Construct prompts with Socratic teaching persona
  5. Send to LLM and stream responses
- [ ] Implement **OCR Service**:
  - Upload image endpoint
  - Extract math expressions using GPT-4o Vision
  - Convert to LaTeX format
- [ ] Create prompt templates in `src/modules/ai-tutor/prompts/`:
  - `socratic-tutor.prompt.ts`
  - `problem-solver.prompt.ts`
  - `hint-generator.prompt.ts`
- [ ] Implement conversation context management
- [ ] Add API endpoints:
  - `POST /ai-tutor/chat` - Send message to AI
  - `POST /ai-tutor/ocr` - Upload and process image
  - `GET /ai-tutor/context/:lessonId` - Get relevant context

**Deliverables:**
- Working AI tutoring system
- OCR functionality for math problems
- RAG-powered contextual responses

---

## Phase 5: Learning & Progress Tracking 📊
**Goal:** Track student progress and implement gamification.

### Tasks:
- [ ] Design schema for learning entities:
  - StudentProgress
  - QuizAttempt
  - Achievement
  - Badge
- [ ] Implement `Learning` Module:
  - Progress tracking service
  - Quiz generation and evaluation
  - Scoring algorithm
  - Achievement system
- [ ] Create API endpoints:
  - `GET /learning/progress/:studentId`
  - `POST /learning/quiz/attempt`
  - `GET /learning/achievements/:studentId`
- [ ] Implement event-driven progress updates
- [ ] Add analytics dashboard data aggregation

**Deliverables:**
- Student progress tracking
- Gamification system
- Analytics data

---

## Phase 6: Frontend Foundation (Next.js Setup) 🎨
**Goal:** Build the UI foundation with Atomic Design.

### Tasks:
- [ ] Initialize Next.js 14+ project with App Router
- [ ] Setup Tailwind CSS with custom theme
- [ ] Install dependencies:
  - `react-katex` for LaTeX rendering
  - `zustand` for state management
  - `axios` for API calls
  - `socket.io-client` for real-time chat
- [ ] Create Atomic Design structure:
  - `/components/ui/atoms/`
  - `/components/ui/molecules/`
  - `/components/ui/organisms/`
  - `/components/ui/templates/`
- [ ] Build core Atoms:
  - `Button`
  - `Input`
  - `MathFormula` (LaTeX renderer)
  - `Avatar`
  - `Icon`
- [ ] Setup authentication context and protected routes
- [ ] Configure API client with interceptors

**Deliverables:**
- Next.js application structure
- Reusable UI components
- API integration layer

---

## Phase 7: Interactive Chat Interface 💬
**Goal:** Build the main tutoring interface.

### Tasks:
- [ ] Build Molecules:
  - `ChatMessageBubble`
  - `MathProblemCard`
  - `VoiceInputButton`
- [ ] Build Organisms:
  - `ChatWindow` (message list + input)
  - `CurriculumSidebar` (lesson navigation)
  - `ProgressWidget` (student stats)
- [ ] Implement WebSocket connection for real-time chat
- [ ] Add message streaming for AI responses
- [ ] Implement image upload for OCR
- [ ] Add voice input (optional, using Web Speech API)
- [ ] Create chat history persistence

**Deliverables:**
- Fully functional chat interface
- Real-time AI tutoring experience
- Image upload and OCR integration

---

## Phase 8: Student Dashboard 📈
**Goal:** Provide students with insights into their learning journey.

### Tasks:
- [ ] Build dashboard template
- [ ] Create data visualization components:
  - Progress charts
  - Achievement badges
  - Recent activity feed
- [ ] Implement curriculum navigation tree
- [ ] Add quick access to recent lessons
- [ ] Display personalized recommendations

**Deliverables:**
- Student dashboard
- Progress visualization
- Personalized learning path

---

## Phase 9: Teacher Portal 👨‍🏫
**Goal:** Enable teachers to monitor and guide students.

### Tasks:
- [ ] Build teacher dashboard
- [ ] Implement student management:
  - View student list
  - Monitor individual progress
  - Review chat transcripts
- [ ] Add curriculum management tools
- [ ] Create reporting features
- [ ] Implement class/group management

**Deliverables:**
- Teacher dashboard
- Student monitoring tools
- Reporting system

---

## Phase 10: Testing & Optimization 🧪
**Goal:** Ensure quality and performance.

### Tasks:
- [ ] Write comprehensive unit tests (80%+ coverage)
- [ ] Create E2E test suite
- [ ] Perform load testing on AI endpoints
- [ ] Optimize database queries
- [ ] Implement caching strategy (Redis)
- [ ] Add error tracking (Sentry)
- [ ] Performance profiling and optimization

**Deliverables:**
- Test coverage reports
- Performance benchmarks
- Production-ready application

---

## Phase 11: Deployment & DevOps 🚀
**Goal:** Deploy to production with CI/CD.

### Tasks:
- [ ] Setup Docker containers
- [ ] Create Docker Compose for local development
- [ ] Configure CI/CD pipeline (GitHub Actions)
- [ ] Setup staging environment
- [ ] Deploy to production (Vercel for frontend, Railway/Render for backend)
- [ ] Configure monitoring and logging
- [ ] Setup automated backups

**Deliverables:**
- Deployed application
- CI/CD pipeline
- Monitoring dashboard

---

## Success Metrics 🎯
- **Performance:** API response time < 200ms (excluding AI calls)
- **AI Quality:** 90%+ positive feedback on AI responses
- **Engagement:** Average session duration > 15 minutes
- **Accuracy:** OCR accuracy > 95% for printed math
- **Scalability:** Support 1000+ concurrent users

---

## Tech Stack Summary
- **Backend:** NestJS + TypeScript + Prisma + PostgreSQL + pgvector
- **Frontend:** Next.js 14 + Tailwind CSS + Zustand
- **AI:** OpenAI GPT-4o + LangChain + RAG
- **Real-time:** Socket.io
- **DevOps:** Docker + GitHub Actions + Vercel/Railway
