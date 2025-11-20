# Modular Monolith Architecture Rules

## Core Principle
This project follows a **Strict Modular Monolith** architecture. The application is a single deployable unit but internally divided into isolated modules based on Business Domains.

## Module Boundaries
The `src/modules/` directory contains the following distinct domains. 
**RULE:** Cross-module imports are STRICTLY FORBIDDEN except via the module's public API (Facade/Service Export).

### 1. Auth Module (`@modules/auth`)
- **Responsibility:** Manages Users (Teachers, Students), Roles, and JWT Tokens.
- **Exports:** `AuthGuard`, `CurrentUser` decorator.

### 2. Curriculum Module (`@modules/curriculum`)
- **Responsibility:** Pure data structure of the Saudi Math Curriculum.
- **Entities:** `Grade`, `Chapter`, `Lesson`, `Problem`, `Solution`.
- **Constraint:** This module MUST NOT depend on AI or Learning modules. It is a pure data provider.

### 3. AI Tutor Module (`@modules/ai-tutor`)
- **Responsibility:** The "Brain". Handles LLM integration, RAG logic, and OCR.
- **Dependencies:** Can import read-only data from `Curriculum`.
- **Tech:** Uses LangChain/OpenAI APIs.

### 4. Learning Module (`@modules/learning`)
- **Responsibility:** Student progress, quiz attempts, scoring (Gamification).

## Shared Kernel (`src/shared`)
- Contains strictly generic code: `DateUtils`, `BaseEntity`, `AppLogger`.
- **RULE:** Shared Kernel CANNOT import from any Module.
