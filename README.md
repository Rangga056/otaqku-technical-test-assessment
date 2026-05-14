# otaQku Intelligence - Minimalist Assessment Platform

otaQku is a high-fidelity, interactive web application designed for rigorous knowledge evaluation, deep performance analytics, and professional reporting. Engineered with Swiss design principles, it prioritizes absolute clarity and cognitive ease.

## 🧠 Product Thinking

### The Problem
Traditional assessment tools often suffer from cognitive overload—cluttered interfaces, distracting feedback, and a lack of actionable post-quiz analysis. Users need a platform that focuses their attention on the knowledge at hand and provides structured, professional documentation of their progress.

### What Problems are we Solving?
- **Cognitive Load**: By using a minimalist "Stitch-inspired" UI, we remove all visual noise that doesn't contribute to the learning process.
- **Data Fragmentation**: otaQku centralizes all evaluation history in a searchable, sortable workspace.
- **Reporting Friction**: Translating digital metrics into professional PDF documents is usually manual; we've automated this with a one-click high-fidelity export.

### Who will use this product?
- **Students & Professionals**: Preparing for high-stakes certifications or exams.
- **Candidates**: Conducting rigorous self-evaluations for technical or logical roles.
- **Lifelong Learners**: Tracking their mastery across diverse domains with data-driven evidence.

## 🛠 Technical Documentation

### Project Architecture
The application is built using the **Next.js 15 App Router** architecture, leveraging a mix of Server and Client components for optimal performance and SEO.

- **`src/app`**: Contains all route segments.
    - **`api/report`**: Server-side PDF generation logic.
    - **`auth`**: Custom authentication flows (NextAuth v5).
    - **`quiz`**: The core assessment engine.
- **`src/components`**: Modular UI components.
    - **`quiz/`**: Specialized interactive assessment and result components.
    - **`dashboard/`**: Data-intensive workspace components (e.g., Activity Table).
- **`src/lib`**: Shared logic including the `quiz-engine` for deterministic scoring.
- **`supabase/`**: Database migrations and comprehensive seed data (40+ questions).

### The "Chart-to-PDF" Strategy
1.  **Rendering**: Metrics and charts are rendered on the client using Recharts and Tailwind.
2.  **Capture**: [html2canvas](https://html2canvas.hertzen.com/) captures the high-DPI dashboard state.
3.  **Generation**: The image is sent to a Next.js API Route via `POST` where [@react-pdf/renderer](https://react-pdf.org/) generates a structured PDF on the server.

## 🚀 Why this Stack?
- **Next.js 15**: Chosen for its superior handling of Server Actions and the ability to handle authentication and API routes in a unified framework.
- **Supabase (PostgreSQL)**: Relational data is critical for linking quizzes, questions, and attempts. **Row Level Security (RLS)** is used to ensure that users can *never* access another user's evaluation data at the database level.
- **Zustand**: Selected for state management during quizzes because it is significantly lighter than Redux and offers a simpler API for transient UI states (like the current question index).
- **TypeScript**: Mandatory for ensuring that the complex types of a quiz (options, correct answers, scores) remain consistent from the DB to the UI.

## 🚀 Local Setup Instructions

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

3.  **Database & Seed**:
    Apply the migration in `supabase/migrations/` and the updated `supabase/seed.sql` to your Supabase project to populate the 4 categories.

4.  **Run**:
    ```bash
    bun dev
    ```

## ⚖️ Limitations & Trade-offs
- **Rule-Based vs AI**: We chose a deterministic rule-based engine for scoring to ensure absolute reliability and low latency, sacrificing "natural language" feedback for mathematical precision.
- **Client-Side Timer**: The timer is currently client-managed for UX smoothness. For high-stakes environments, a server-side "heartbeat" would be a necessary upgrade.
- **Data Table vs Infinite Scroll**: We implemented a searchable/sortable Data Table for the evaluation history. While infinite scroll is better for "browsing," a table is superior for "managing" professional records.
- **SVG Branding**: We used a lightweight SVG primitive for the favicon instead of multiple PNG assets to minimize initial page load and maintain infinite scalability across high-DPI displays.

---
© 2026 otaQku Intelligence. Engineered for clarity.
