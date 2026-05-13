# Stitch-Inspired Quiz & Interactive Analytics Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the quiz experience into a premium, interactive platform matching the Stitch design language with 3D hover effects, dynamic percentiles, and robust PDF reporting.

**Architecture:** Enhancing frontend components with `framer-motion` and `canvas-confetti`, refactoring the PDF generation stream, and expanding the quiz database.

**Tech Stack:** Next.js (App Router), Supabase, Framer Motion, Recharts, Canvas Confetti, React-PDF.

---

### Task 1: Environment & Dependency Setup

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Add required dependencies**
Run: `npm install framer-motion canvas-confetti && npm install -D @types/canvas-confetti`
- [ ] **Step 2: Commit**
```bash
git commit -m "chore: add framer-motion and canvas-confetti"
```

### Task 2: Hero Visual Assets (Nano Banana)

**Files:**
- Create: `public/hero-schematic.png`

- [ ] **Step 1: Generate technical illustration**
Use `mcp_nanobanana_generate_image` with prompt: "A minimalist Swiss-style architectural technical schematic of a data processing unit, clean lines, blueprint blue and white, professional, high-fidelity, 1024x1024"
- [ ] **Step 2: Save to public folder**
- [ ] **Step 3: Commit**
```bash
git commit -m "assets: add technical hero illustration"
```

### Task 3: Interactive Hero Card Enhancement

**Files:**
- Create: `src/components/layout/HeroCard.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create 3D HeroCard component**
Implement mouse-tracking 3D tilt with `framer-motion`. Embed `recharts` AreaChart and the generated schematic.
- [ ] **Step 2: Integrate HeroCard into HomePage**
Replace the static card in `src/app/page.tsx` with the new `HeroCard`.
- [ ] **Step 3: Commit**
```bash
git commit -m "feat: add interactive 3D hero card with real chart"
```

### Task 4: Dynamic Percentile & Statistics Logic

**Files:**
- Modify: `src/lib/quiz-engine.ts`

- [ ] **Step 1: Implement percentile calculation**
```typescript
export async function calculatePercentile(quizId: string, score: number) {
  // Query Supabase for attempts on this quiz with lower scores
}
```
- [ ] **Step 2: Add achievement logic**
Map scores to badge titles (e.g., >90% = "Logical Savant").
- [ ] **Step 3: Commit**
```bash
git commit -m "feat: implement dynamic percentile and achievement logic"
```

### Task 5: Stitch-Style Result Dashboard & Fireworks

**Files:**
- Modify: `src/components/quiz/ResultDashboard.tsx`

- [ ] **Step 1: Redesign layout**
Implement the 2-column layout from `stitch-quizpage-design.png`.
- [ ] **Step 2: Add Fireworks**
Trigger `canvas-confetti` if score > 80%.
- [ ] **Step 3: Display Percentile**
Show the "Top X%" or comparative message.
- [ ] **Step 4: Commit**
```bash
git commit -m "feat: redesign result dashboard with fireworks and percentiles"
```

### Task 6: Robust PDF Report Fix

**Files:**
- Modify: `src/app/api/report/[id]/route.ts`
- Modify: `src/components/report/PDFTemplate.tsx`

- [ ] **Step 1: Fix PDF stream handling**
Convert `renderToStream` to a `Buffer` to prevent broken downloads.
- [ ] **Step 2: Update PDF layout**
Align PDF design with the new dashboard (grid stats, progress bars).
- [ ] **Step 3: Commit**
```bash
git commit -m "fix: resolve PDF download issues and update template"
```

### Task 7: Database Content Expansion

**Files:**
- Modify: `supabase/seed.sql`

- [ ] **Step 1: Add 10+ questions to General Knowledge**
- [ ] **Step 2: Add Design Principles quiz (10+ questions)**
- [ ] **Step 3: Commit**
```bash
git commit -m "content: expand quiz database to 10+ questions per quiz"
```
