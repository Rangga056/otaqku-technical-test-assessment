# Quiz & Report Application Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a secure, scalable quiz application using Next.js 15, NextAuth, and Supabase with a focus on performance (N+1 prevention) and strict TDD.

**Architecture:** Server-centric Next.js App Router using Server Actions for mutations and RSCs for fetching. NextAuth handles sessions with a custom CredentialsProvider and Google OAuth, while Supabase stores data in a custom schema protected by an RLS-session bridge.

**Tech Stack:** Next.js 15, Bun, TypeScript, Tailwind CSS, NextAuth.js (v5), Supabase (PostgreSQL), Vitest, Zod, Zustand, bcryptjs, @react-pdf/renderer.

---

### Task 1: Project Initialization & Environment Setup

**Files:**
- Create: `package.json` (via bun init)
- Create: `vitest.config.ts`
- Create: `.env.local`

- [ ] **Step 1: Initialize Next.js project with Bun**
Run: `bun create next-app . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`

- [ ] **Step 2: Install dependencies**
Run: `bun add next-auth@beta @supabase/supabase-js zod zustand bcryptjs @react-pdf/renderer lucide-react tailwind-merge clsx`
Run: `bun add -d vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @types/bcryptjs`

- [ ] **Step 3: Setup Vitest configuration**
Create `vitest.config.ts` with React plugin and jsdom environment.

- [ ] **Step 4: Verify test runner works**
Run: `bun test` (should pass with no tests or a simple placeholder test)

- [ ] **Step 5: Commit**
```bash
git add .
git commit -m "chore: initial project setup with bun and vitest"
```

### Task 2: Database Schema & Supabase Setup

**Files:**
- Create: `supabase/migrations/20260513000000_initial_schema.sql`
- Create: `src/lib/supabase.ts`

- [ ] **Step 1: Create SQL Migration for Schema**
Write SQL to create `users`, `quizzes`, `questions`, `options`, `quiz_attempts`, and `attempt_answers`. Include the RLS session bridge functions (`set_config`).

- [ ] **Step 2: Implement Indexes and Views**
Add B-Tree indexes on foreign keys and a `user_quiz_stats` view for dashboard aggregations to prevent N+1 calculations.

- [ ] **Step 3: Setup Supabase Client helper**
Implement a singleton client in `src/lib/supabase.ts` that supports both public and authenticated (service role) access for the RLS bridge.

- [ ] **Step 4: Commit**
```bash
git add supabase/ src/lib/supabase.ts
git commit -m "feat: database schema and supabase client setup"
```

### Task 3: Authentication with NextAuth.js

**Files:**
- Create: `src/auth.ts`
- Create: `src/middleware.ts`
- Create: `src/app/api/auth/[...nextauth]/route.ts`

- [ ] **Step 1: Implement CredentialsProvider**
Configure NextAuth to use a custom authorize function that queries the `public.users` table and verifies hashes with `bcryptjs`.

- [ ] **Step 2: Implement Google Provider**
Configure Google OAuth in `src/auth.ts`.

- [ ] **Step 3: Implement RLS Bridge in callbacks**
Add a JWT or session callback that ensures the `user_id` is available for server-side Supabase calls.

- [ ] **Step 4: Configure Middleware**
Protect `/quiz`, `/dashboard`, and `/report` routes.

- [ ] **Step 5: Write Auth Unit Tests**
Test the authorize function with mocked Supabase responses.

- [ ] **Step 6: Commit**
```bash
git add src/auth.ts src/middleware.ts src/app/api/auth/
git commit -m "feat: nextauth setup with credentials and google providers"
```

### Task 4: Shared Types, Zod Schemas & Zustand Store

**Files:**
- Create: `src/lib/validations/index.ts`
- Create: `src/store/useQuizStore.ts`

- [ ] **Step 1: Define Zod Schemas**
Create schemas for `User`, `Quiz`, `Question`, and `Submission`. Infer TypeScript types from these schemas.

- [ ] **Step 2: Implement Zustand Store**
Create a store to manage `currentQuestionIndex`, `answers` (mapped by question ID), and `timer`.

- [ ] **Step 3: Write Store Unit Tests**
Test state transitions (e.g., answering a question, advancing index).

- [ ] **Step 4: Commit**
```bash
git add src/lib/validations/ src/store/
git commit -m "feat: types, zod schemas, and zustand store"
```

### Task 5: Quiz Engine & Scoring (TDD)

**Files:**
- Create: `src/lib/quiz-engine.ts`
- Create: `src/lib/quiz-engine.test.ts`
- Modify: `src/app/actions/quiz.ts`

- [ ] **Step 1: Write failing tests for Scoring Logic**
Test `calculateScore(answers, questions)` for correct totals, percentages, and category assignment (Beginner/Intermediate/Advanced).

- [ ] **Step 2: Implement Scoring Logic**
Write the minimal code to pass the tests.

- [ ] **Step 3: Implement N+1 Safe Quiz Fetching**
Create a Server Action `getQuizWithQuestions(id)` using nested Supabase `.select()`.

- [ ] **Step 4: Implement Bulk Submission Action**
Create `submitQuizAction` that inserts the attempt and all answers in a single batch insert.

- [ ] **Step 5: Commit**
```bash
git add src/lib/quiz-engine* src/app/actions/quiz.ts
git commit -m "feat: TDD scoring engine and N+1 safe server actions"
```

### Task 6: UI Development (Quiz & Results)

**Files:**
- Create: `src/app/quiz/[id]/page.tsx`
- Create: `src/app/quiz/result/[id]/page.tsx`
- Create: `src/components/quiz/QuizCard.tsx`

- [ ] **Step 1: Build interactive Quiz UI**
Connect the Zustand store to the UI. Implement the timer and progression.

- [ ] **Step 2: Build Results Dashboard**
Use Recharts to visualize the score breakdown and comparison.

- [ ] **Step 3: Commit**
```bash
git add src/app/quiz/ src/components/quiz/
git commit -m "feat: interactive quiz and results UI"
```

### Task 7: PDF Generation API

**Files:**
- Create: `src/app/api/report/[id]/route.ts`
- Create: `src/components/report/PDFTemplate.tsx`

- [ ] **Step 1: Implement PDF Template**
Use `@react-pdf/renderer` to design the report layout.

- [ ] **Step 2: Create PDF Route Handler**
Fetch the attempt data (N+1 safe) and stream the PDF response.

- [ ] **Step 3: Commit**
```bash
git add src/app/api/report/ src/components/report/
git commit -m "feat: server-side PDF generation"
```

### Task 8: Final Verification & Sample Data

**Files:**
- Create: `supabase/seed.sql`

- [ ] **Step 1: Create Seed Script**
Populate the database with a "General Knowledge" quiz and sample questions.

- [ ] **Step 2: Run End-to-End manual test**
Sign up, take a quiz, check the dashboard, and download the PDF.

- [ ] **Step 3: Commit**
```bash
git add supabase/seed.sql
git commit -m "feat: seed data and final verification"
```
