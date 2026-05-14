# otaQku Intelligence - Minimalist Assessment Platform

otaQku is a high-fidelity, interactive web application designed for rigorous knowledge evaluation, deep performance analytics, and professional reporting. Engineered with Swiss design principles, it prioritizes absolute clarity and cognitive ease.

## 🧠 Product Thinking

### The Problem
Traditional assessment tools often suffer from cognitive overload—cluttered interfaces, distracting feedback, and a lack of actionable post-quiz analysis. Users need a platform that focuses their attention on the knowledge at hand and provides structured, professional documentation of their progress.

### The Solution
otaQku solves this by providing:
- **Distraction-Free Environment**: A "Stitch-inspired" minimalist UI with dark dotted backgrounds and clear typography.
- **Immediate Multi-Dimensional Feedback**: Real-time score calculations and categorical performance breakdowns.
- **Professional Portability**: One-click "Chart-to-PDF" reporting for formal documentation of results.

### Target Users
- **Students & Professionals**: Preparing for certifications or exams.
- **Candidates**: Conducting self-evaluations for technical roles.
- **Lifelong Learners**: Tracking their mastery across diverse domains.

## 🛠 Architecture & Tech Choices

### Core Stack
- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/) for optimized Server-Side Rendering and fast client-side navigation.
- **Language**: [TypeScript](https://www.typescriptlang.org/) for robust type-safety across the quiz engine and database layers.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) for a custom, minimalist design system.
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL + Auth) using Row Level Security (RLS) for absolute data isolation.
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) for lightweight, efficient quiz state tracking.

### The "Chart-to-PDF" Strategy
One of the technical highlights is the reporting engine. To ensure the PDF accurately reflects the beautiful client-side visualizations:
1.  **Rendering**: Metrics and charts are rendered on the client using Recharts and Tailwind.
2.  **Capture**: [html2canvas](https://html2canvas.hertzen.com/) captures the high-DPI dashboard state as a Base64 image.
3.  **Generation**: The image is sent to a Next.js API Route where [@react-pdf/renderer](https://react-pdf.org/) generates a structured, multi-page PDF on the server and streams it back to the user.

## 🚀 Local Setup Instructions

1.  **Clone the Repository**:
    ```bash
    git clone [repository-url]
    cd otaqku-technical-test
    ```

2.  **Install Dependencies**:
    ```bash
    bun install
    ```

3.  **Environment Configuration**:
    Create a `.env.local` file with your Supabase credentials:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
    AUTH_SECRET=your_next_auth_secret
    ```

4.  **Database Setup**:
    - Run the migration in `supabase/migrations/`.
    - Apply the seed data in `supabase/seed.sql` to populate the library with 40 assessment items.

5.  **Run Development Server**:
    ```bash
    bun dev
    ```
    Access the application at `http://localhost:3000`.

## ⚖️ Limitations & Trade-offs
- **Rule-Based Insights**: Currently uses a high-performance rule engine for scoring and categorization rather than AI, ensuring deterministic and reliable results.
- **Fixed-Time Assessments**: The timer is currently client-side; future iterations will include server-side heartbeat checks for competitive integrity.
- **PDF Layout**: Optimized for A4 printing; chart capture scales to fit, which may vary slightly across different viewport sizes.

---
© 2026 otaQku Intelligence. Engineered for clarity.
