# Project Master Plan: Saudi Smart Math Tutor

## Phase 1: Infrastructure & Scaffolding
- [ ] Initialize NestJS Monorepo mode.
- [ ] Setup PostgreSQL with pgvector extension.
- [ ] Setup basic `src/shared` (Abstract Base Classes).

## Phase 2: Core Domain (Curriculum)
- [ ] Implement `curriculum` Module Entities (Subject -> Grade -> Chapter -> Lesson).
- [ ] Create Seeding Script to populate DB with Saudi Math curriculum structure.
- [ ] Implement API: `GET /curriculum/:grade/:chapter`.

## Phase 3: The AI Brain (Deep Dive)
- [ ] Setup `ai-tutor` Module.
- [ ] Implement **RAG Pipeline**:
    1. Retrieve relevant textbook chunks from Vector DB.
    2. Construct Prompt with "Socratic Teaching" persona.
    3. Send to LLM.
- [ ] Implement **OCR Service**: Upload image -> Extract Math (LaTeX).

## Phase 4: Frontend (Atomic)
- [ ] Build Atoms: `Button`, `MathFormula`.
- [ ] Build Organism: `ChatInterface`.
- [ ] Connect Frontend to Backend via REST/Socket.io.
