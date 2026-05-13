# API & Backend Documentation

This document describes the internal backend architecture, data structures, and APIs of the otaQku Quiz App.

## 1. Database Schema (Supabase PostgreSQL)

### Tables
- **`users`**: Custom user storage for NextAuth compatibility.
- **`quizzes`**: Stores the title and description of available quizzes.
- **`questions`**: Linked to `quizzes`. Stores points and order.
- **`options`**: Linked to `questions`. Includes `is_correct` flag.
- **`quiz_attempts`**: Stores the header of a user's quiz result (total score, category).
- **`attempt_answers`**: Stores the individual answers for an attempt.

### Performance & N+1 Prevention
- **Joins**: Uses PostgREST nested selects: `.select('*, questions(*, options(*))')`.
- **Views**: `public.user_quiz_stats` aggregates user performance in the database to avoid heavy client-side or multiple server-side calculations.
- **Indexes**: B-Tree indexes are applied to all Foreign Keys and `created_at` fields.

## 2. Row Level Security (RLS) Bridge

Since we use NextAuth instead of Supabase Auth, we enforce security via a "Session Bridge":
1. **RPC Function**: `public.set_session_user(user_id UUID)`
2. **Implementation**: Within Server Actions, we use the `service_role` key to call this RPC, which sets the Postgres local variable `app.current_user_id`.
3. **Policies**: All tables use policies that verify `id = current_setting('app.current_user_id', true)::uuid`.

## 3. Server Actions (Backend Logic)

### `getQuiz(id: string)`
- **Purpose**: Fetches a full quiz hierarchy in one request.
- **Returns**: `Quiz` (Validated via Zod).

### `submitQuizAction(formData: Submission)`
- **Purpose**: Validates input, calculates score, and saves the attempt.
- **Process**:
  - Re-fetches quiz data server-side (Security: Trust but verify).
  - Bulk inserts all answers in one SQL command.
  - Revalidates the dashboard cache.

## 4. REST API Endpoints

### `GET /api/report/[id]`
- **Authentication**: Required (NextAuth session).
- **Action**: 
  - Retrieves the attempt and related quiz/question/option data.
  - Renders `PDFTemplate` using `@react-pdf/renderer`.
  - Streams the PDF back as a download.
- **Headers**: `Content-Type: application/pdf`.

## 5. State Management (Zustand)
- **Store**: `useQuizStore`
- **Responsibility**: Ephemeral client-side state during the quiz (answers, timer, navigation). Avoids frequent database writes during the active quiz session.
