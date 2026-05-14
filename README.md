# otaQku Intelligence - Minimalist Assessment Platform

otaQku is a high-fidelity, interactive web application designed for rigorous knowledge evaluation, deep performance analytics, and professional reporting. Engineered with Swiss design principles, it prioritizes absolute clarity and cognitive ease.

## 🧠 Product Thinking

otaQku was conceived as a "workspace for the mind." In a world of cluttered educational tools, we focused on removing friction between the user and their evaluation. The "Stitch-inspired" UI uses a strict grid system and generous whitespace to create an environment of focus.

### Who will use this product?
- **Students & Professionals**: Preparing for high-stakes certifications or technical exams.
- **Candidates**: Conducting rigorous self-evaluations for technical or logical roles.
- **Lifelong Learners**: Tracking mastery across diverse domains (Logic, Design, History, Technical) with data-driven evidence.

### What problems are you solving?
- **Cognitive Overload**: Most assessment tools distract users with cluttered feedback. otaQku uses a minimalist design to keep focus on the questions.
- **Data Fragmentation**: It centralizes evaluation history in a searchable workspace, allowing users to track growth over time.
- **Reporting Friction**: Translating digital results into professional documents is often manual; we've automated this with a one-click PDF export that preserves the high-fidelity UI.

## 🛠 Technical Documentation

### Project Architecture
The application uses the **Next.js 15 App Router** architecture, leveraging a hybrid model of Server and Client components.

- **`src/app`**: Core routing and page segments.
    - **`actions/`**: Server Actions for authentication and quiz submissions, ensuring data integrity without exposing logic to the client.
    - **`api/report/`**: Server-side PDF generation using `@react-pdf/renderer`.
- **`src/lib/quiz-engine.ts`**: A deterministic scoring engine that handles multi-select, partial credit, and penalty logic.
- **`src/store/useQuizStore.ts`**: Lightweight state management via **Zustand** for transient quiz states (timers, current index) to avoid re-renders associated with heavier state libraries.

### Core Workflows
1. **Assessment**: The `QuizClient` manages the stateful interaction, while the `quiz-engine` calculates scores server-side via Server Actions to prevent client-side manipulation.
2. **Reporting**: The "Chart-to-PDF" pipeline uses `html2canvas` to capture the client-side dashboard state (Recharts/Tailwind) and transmits it to the server API to generate a structured PDF.

## 🚀 Why this Stack?
- **Next.js 15 & Bun**: Chosen for the fastest possible development cycle and execution. Next.js 15 Server Actions simplify the bridge between UI and Database.
- **Supabase (PostgreSQL)**: Relational data is critical for the complex many-to-many relationships between Quizzes, Questions, Options, and Attempts. **Row Level Security (RLS)** ensures user data isolation at the infrastructure level.
- **Tailwind CSS**: Allows for rapid iteration of the "Stitch" design system while keeping the CSS bundle size minimal.
- **TypeScript**: Essential for maintaining type safety across the assessment lifecycle—specifically ensuring that question types and score calculations remain consistent from the DB to the UI.

## 🚀 How to run it locally

1.  **Clone & Install**:
    ```bash
    git clone [repository-url]
    cd otaqku-technical-test
    bun install
    ```

2.  **Environment Configuration**:
    Create a `.env.local` file:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
    AUTH_SECRET=your_next_auth_secret
    ```

3.  **Database Setup**:
    Initialize your Supabase project with the provided schema and seed data:
    ```bash
    # Apply initial schema
    supabase migration up
    # Seed with 40+ questions across 4 categories
    psql -f supabase/seed.sql [your_connection_string]
    ```

4.  **Run Development Server**:
    ```bash
    bun dev
    ```

## ⚖️ Any known limitations, shortcuts taken or tradeoff made

- **Trade-off: Deterministic vs AI**: We chose a rule-based engine for scoring to ensure absolute reliability and low latency, sacrificing "natural language" feedback for mathematical precision.
- **Shortcut: Client-Side Timer**: The quiz timer is currently client-managed. For a production-grade high-stakes environment, we would implement a server-side "heartbeat" to prevent timer manipulation.
- **Limitation: Manual PDF Rendering**: While `html2canvas` is effective, it relies on the client's rendering engine. A more robust solution would involve server-side headless browser rendering (e.g., Playwright) for consistent PDF output.
- **Technical Debt**: During development, we prioritized UI fidelity and scoring logic. Some generic `any` types remain in the `ActivityTable` and `ResultDashboard` where Supabase-generated types were deeply nested, which should be refined in future iterations for stricter type safety.
- **Design Choice**: We used a lightweight SVG primitive for branding instead of heavy image assets to minimize initial page load and ensure infinite scalability on high-DPI displays.

---
© 2026 otaQku Intelligence. Engineered for clarity.
