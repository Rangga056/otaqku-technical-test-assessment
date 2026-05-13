# otaQku Quiz & Report App

An interactive quiz platform built with Next.js 15, Supabase, and NextAuth.js. This application allows users to take quizzes, view instant analytics, and download performance reports as PDF.

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Runtime**: Bun
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Auth**: NextAuth.js v5 (Auth.js)
- **State Management**: Zustand
- **Validation**: Zod
- **Testing**: Vitest + React Testing Library
- **PDF Generation**: @react-pdf/renderer
- **Charts**: Recharts

## 🏗️ Architecture Choices

- **N+1 Prevention**: Data fetching uses nested Supabase selection to retrieve quizzes, questions, and options in a single roundtrip. Bulk inserts are used for quiz submissions.
- **Security (RLS Bridge)**: Although using NextAuth for session management, we maintain Row Level Security (RLS) in Supabase by injecting the `user_id` into the Postgres session via a custom RPC call (`set_session_user`) within Server Actions.
- **Strict TDD**: Core logic (scoring engine, state management) is developed using a test-driven approach.
- **No ORM**: We use the native Supabase JS client for lightweight and transparent database interactions.

## 🛠️ Local Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd otaQku_technical_test
   ```

2. **Install dependencies**:
   ```bash
   bun install
   ```

3. **Configure Environment Variables**:
   Copy `.env.local.example` to `.env.local` and fill in your Supabase and NextAuth credentials.

4. **Setup Database**:
   Run the SQL found in `supabase/migrations/` and `supabase/seed.sql` in your Supabase SQL Editor.

5. **Run Development Server**:
   ```bash
   bun dev
   ```

6. **Run Tests**:
   ```bash
   bun test
   ```

## 📝 Limitations & Trade-offs

- **PDF Generation**: Currently uses `@react-pdf/renderer` for server-side generation. Complex client-side charts are represented as textual data in the report to ensure high-quality vector rendering in the PDF.
- **Rule-based Analytics**: Performance categories (Beginner, Intermediate, Advanced) are determined by fixed percentage thresholds as per initial requirements.
