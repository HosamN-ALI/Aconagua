# Atomic Design System Rules

## Directory Structure
UI components must be placed in `frontend/src/components/` following strict Atomic Design hierarchy:

### 1. Atoms (`components/atoms`)
- Basic building blocks. No logic. Pure presentation.
- **Examples:** `Button`, `Input`, `Badge`, `MathFormula` (renders LaTeX).

### 2. Molecules (`components/molecules`)
- Groups of atoms functioning together.
- **Examples:**
  - `SearchBar` (Input + Icon).
  - `ChatMessage` (Text + Avatar + Time).
  - `QuestionCard` (Formula + Question Text).

### 3. Organisms (`components/organisms`)
- Complex distinct sections of an interface.
- **Examples:**
  - `ChatInterface` (List of Messages + Input Area).
  - `CurriculumTree` (Nested list of chapters and lessons).

### 4. Templates (`components/templates`)
- Page layouts without specific content.
- **Examples:** `DashboardLayout`, `StudentLayout`.

## Styling Rules
- Use Tailwind utility classes.
- Do not use CSS modules unless strictly necessary for animations.
- Ensure "Mobile-First" design for all Molecules and Organisms.
