# Technology Stack & Coding Standards

## Backend (NestJS)
- **Language:** TypeScript (Strict Mode).
- **Database:** PostgreSQL via **Prisma ORM**.
- **Vector DB:** Supabase (pgvector) for curriculum embeddings.
- **Validation:** `class-validator` and `class-transformer`.
- **Documentation:** Swagger (OpenAPI) is mandatory for all Controllers.
- **Testing:** Jest for unit tests, Supertest for E2E tests.

## Frontend (Next.js)
- **Framework:** Next.js 14+ (App Router).
- **Styling:** Tailwind CSS.
- **Math Rendering:** Use `react-katex` for displaying LaTeX formulas.
- **State Management:** Zustand (for global store).
- **API Communication:** Axios or native fetch with proper error handling.

## AI & Logic
- **LLM Provider:** OpenAI (GPT-4o for Vision/Math) or Anthropic (Claude 3.5).
- **Orchestration:** LangChain.js.
- **Prompting:** All system prompts must be stored in `src/modules/ai-tutor/prompts/`.
- **Vector Store:** Supabase pgvector for semantic search.

## Code Quality
- **Linting:** ESLint with TypeScript rules.
- **Formatting:** Prettier.
- **Git Hooks:** Husky for pre-commit checks.
- **Commit Convention:** Conventional Commits.

## Environment Variables
- Use `.env` files (never commit them).
- All secrets must be validated at startup using `@nestjs/config`.

## API Design
- RESTful endpoints for CRUD operations.
- WebSocket (Socket.io) for real-time chat.
- All responses must follow consistent format:
  ```json
  {
    "success": true,
    "data": {},
    "message": "Operation successful"
  }
  ```
