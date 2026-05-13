# Design Document: Quiz & Report Application

**Date**: 2026-05-13  
**Status**: Draft  
**Tech Stack**: Next.js 15 (App Router), Bun, TypeScript, Tailwind CSS, NextAuth.js, Supabase (PostgreSQL), Vitest, Zod, Zustand.

## 1. Objective & Scope
An interactive quiz platform where users can evaluate their knowledge, view instant performance analytics, and export detailed reports as PDF. This is an MVP designed for scalability and performance.

## 2. Architecture

### 2.1 Authentication (NextAuth.js)
- **Traditional**: Custom `CredentialsProvider` using `bcryptjs` for hashing.
- **OAuth**: Google Login via NextAuth.
- **Data Store**: A custom `public.users` table in Supabase (bypassing `auth.users` for maximum control).
- **Session**: JWT-based, encrypted with `NEXTAUTH_SECRET`.

### 2.2 Database & Security (Supabase)
- **No ORM**: Use `@supabase/supabase-js`.
- **RLS Bridge**: 
    - NextAuth `user_id` is passed to PostgreSQL using `set_config('app.current_user_id', ..., true)`.
    - RLS policies use `current_setting('app.current_user_id')` to enforce data isolation.
- **N+1 Prevention**:
    - Relational joins via nested PostgREST `.select('*, table(*)')`.
    - Bulk inserts for quiz answers.
    - Database Views for complex aggregations.
- **Indexing**: B-Tree indexes on `user_id`, `quiz_id`, and `created_at`.

### 2.3 State & Validation
- **Global State**: **Zustand** manages the interactive quiz lifecycle (current question, answers, timer).
- **Validation**: **Zod** schemas for all inputs (auth, quiz submission, profile updates).

### 2.4 Analytics & PDF
- **Charts**: **Recharts** for interactive dashboards.
- **PDF Generation**: `@react-pdf/renderer` in a Next.js Route Handler.
- **Chart-to-PDF**: Client-side charts are captured via `html2canvas` (if needed for complex visuals) or recreated using server-side PDF primitives for higher quality.

## 3. Data Schema (PostgreSQL)
1.  **users**: `id` (UUID, PK), `email` (Unique), `password_hash`, `name`, `image_url`, `created_at`
2.  **quizzes**: `id` (PK), `title`, `description`, `created_at`
3.  **questions**: `id` (PK), `quiz_id` (FK), `question_text`, `points`, `order_index`
4.  **options**: `id` (PK), `question_id` (FK), `option_text`, `is_correct`
5.  **quiz_attempts**: `id` (PK), `user_id` (FK), `quiz_id` (FK), `total_score`, `max_score`, `category`, `created_at`
6.  **attempt_answers**: `id` (PK), `attempt_id` (FK), `question_id` (FK), `selected_option_id` (FK), `is_correct`

## 4. Development Workflow (Strict TDD)
- **Unit Testing**: Logic for scoring, category determination, and Zod validation.
- **Integration Testing**: Mocked Supabase client for Server Actions.
- **E2E Testing**: Basic auth flows and quiz completion paths.

## 5. Success Criteria
- Secure authentication with both Credentials and Google.
- Zero N+1 issues in data fetching.
- PDF reports successfully generated with accurate data.
- 100% type safety across the application.
