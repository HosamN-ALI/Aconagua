# Technology Stack & Coding Standards

## Backend (NestJS)
- **Language:** TypeScript (Strict Mode).
- **Database:** PostgreSQL via **Prisma ORM** (or TypeORM).
- **Vector DB:** Supabase (pgvector) for curriculum embeddings.
- **Validation:** `class-validator` and `class-transformer`.
- **Documentation:** Swagger (OpenAPI) is mandatory for all Controllers.

## Frontend (Next.js)
- **Framework:** Next.js 14+ (App Router).
- **Styling:** Tailwind CSS.
- **Math Rendering:** Use `react-katex` for displaying LaTeX formulas.
- **State Management:** Zustand (for global store).

## AI & Logic
- **LLM Provider:** OpenAI (GPT-4o for Vision/Math) or Anthropic (Claude 3.5).
- **Orchestration:** LangChain.js.
- **Prompting:** All system prompts must be stored in `src/modules/ai-tutor/prompts/`.
