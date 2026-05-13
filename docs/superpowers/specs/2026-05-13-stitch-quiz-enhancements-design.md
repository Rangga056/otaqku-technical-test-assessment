# Stitch-Inspired Quiz & Interactive Analytics Design

## 1. Context & Purpose
The goal is to elevate the otaQku platform to a premium, "Stitch-inspired" experience. This involves replacing static placeholders with interactive, data-driven components and ensuring a high-fidelity visual experience that matches the reference designs.

## 2. Aesthetic Direction: Swiss Refined (Stitch Style)
*   **Archetype:** Swiss / Refined.
*   **Differentiator:** 3D Perspective Interaction.
*   **Tokens:**
    *   `--color-primary`: `#4285F4` (Stitch Blue)
    *   `--color-surface`: `#FFFFFF`
    *   `--color-background`: `#F8F9FA`
    *   `--color-border`: `#DADCE0`
    *   `--font-family`: `Inter`, `Geist Sans`, or system-sans.
    *   `--shadow-stitch`: `0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)`

## 3. Component Architecture

### 3.1 Interactive Hero Section
*   **Hero Card (`HeroCard.tsx`):**
    *   Use `framer-motion` for `useMotionValue` and `useTransform` to create a mouse-tracking 3D tilt effect.
    *   **Visual Assets:**
        *   Generate a high-fidelity technical/architectural schematic image using **Nano Banana** to replace the placeholder icon.
        *   Embed a `recharts` Area Chart showing "Global Knowledge Growth" with a blue-to-transparent gradient fill.
    *   **Interaction:** Smooth transition on hover and exit.

### 3.2 Stitch-Perfect Results Dashboard (`ResultDashboard.tsx`)
*   **Layout:** 2-column grid as per reference image.
*   **Category Performance (Left):**
    *   Iterate through score categories (e.g., Logic, Design, History).
    *   Custom progress bar components with smooth entry animations.
*   **Stat Grid (Right):**
    *   **Score Card:** Large percentage display.
    *   **Percentile Card:** Dynamic calculation: "Top 8%" or "Better than 92% of users".
    *   **Time Cards:** "Time Elapsed" and "Avg. Pace" (calculated from attempt duration).
    *   **Achievement Card:** Badge icon + title (e.g., "Logical Savant").
*   **Celebration Logic:**
    *   Integration with `canvas-confetti`.
    *   Threshold: >80% score triggers a full-screen firework burst.
    *   Threshold: <50% score displays the comparative percentile message to encourage the user.

### 3.3 Robust PDF Reporting (`/api/report/[id]`)
*   **Fix:** The Route Handler will be refactored to consume the `renderToStream` output into a `Buffer` or `Uint8Array` before returning a `NextResponse`. This ensures the PDF is fully generated before the browser attempts to download/preview.
*   **Template Update:** `PDFTemplate.tsx` will be updated to mirror the dashboard's layout, including the stat grid and category bars.

## 4. Data Strategy & Expansion
*   **Dynamic Percentile Utility:**
    *   SQL query: `SELECT count(*) FROM quiz_attempts WHERE quiz_id = ? AND total_score < ?` divided by total attempts for that quiz.
*   **Content Expansion:**
    *   Update `seed.sql` to provide 10+ questions for "General Knowledge".
    *   Add a new "Design Principles" quiz with 10+ questions.

## 5. Success Criteria
1.  Hero card tilts smoothly on mouse hover.
2.  Hero card contains a real chart and high-fidelity image.
3.  Results page matches the Stitch reference design perfectly.
4.  Fireworks trigger on high scores.
5.  PDF report previews and downloads correctly in all browsers.
6.  Each quiz contains at least 10 valid questions.
