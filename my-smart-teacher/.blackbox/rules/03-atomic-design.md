# Atomic Design System Rules

## Directory Structure
UI components must be placed in `src/components/ui` following strict Atomic Design hierarchy:

### 1. Atoms (`/atoms`)
- Basic building blocks. No logic. Pure presentation.
- **Examples:** 
  - `Button` - Reusable button with variants (primary, secondary, danger).
  - `Input` - Text input with validation states.
  - `Icon` - SVG icon wrapper.
  - `MathFormula` - Renders LaTeX using react-katex.
  - `Avatar` - User profile picture.
  - `Badge` - Small status indicator.

### 2. Molecules (`/molecules`)
- Groups of atoms functioning together.
- **Examples:** 
  - `SearchBox` (Input + Icon).
  - `ChatMessageBubble` (Text + Avatar + Time).
  - `MathProblemCard` (Formula + Question Text).
  - `FormField` (Label + Input + Error Message).
  - `ProgressBar` (Label + Bar + Percentage).

### 3. Organisms (`/organisms`)
- Complex distinct sections of an interface.
- **Examples:** 
  - `ChatWindow` (List of Messages + Input Area).
  - `CurriculumTree` (Nested list of chapters and lessons).
  - `StudentDashboard` (Stats + Progress + Recent Activity).
  - `NavigationBar` (Logo + Menu + User Profile).

### 4. Templates (`/templates`)
- Page layouts without specific content.
- **Examples:** 
  - `DashboardLayout` - Sidebar + Main Content Area.
  - `ChatRoomLayout` - Split view for chat and resources.
  - `AuthLayout` - Centered form with background.

## Styling Rules
- Use Tailwind utility classes.
- Do not use CSS modules unless strictly necessary for animations.
- Ensure "Mobile-First" design for all Molecules and Organisms.
- Use consistent spacing scale: `space-2`, `space-4`, `space-6`, `space-8`.
- Color palette must follow Saudi educational theme (greens, blues).

## Component Guidelines
- All components must be TypeScript with proper prop types.
- Use React Server Components by default in Next.js.
- Add `"use client"` directive only when necessary (hooks, events).
- Each component should have a corresponding `.stories.tsx` file for Storybook (optional but recommended).

## Accessibility
- All interactive elements must be keyboard accessible.
- Use semantic HTML elements.
- Add proper ARIA labels for screen readers.
- Ensure color contrast meets WCAG AA standards.
