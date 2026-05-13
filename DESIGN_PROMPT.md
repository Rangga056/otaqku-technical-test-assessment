# Design Prompt: otaQku - Interactive Quiz & Analytics

**Target Archetype**: Minimalist / Refined  
**Core Objective**: Create a professional, distraction-free environment for knowledge evaluation and performance tracking.

---

## 1. Visual Language & Tone
- **Aesthetic**: Swiss-influenced minimalism. High typographic contrast, precise alignment, and a focus on content over ornamentation.
- **Palette**: 
  - **Surface**: Pure White (`#FFFFFF`) with subtle off-white backgrounds (`#FDFDFD`).
  - **Primary**: Electric Blue (`#2563EB`) for focused actions.
  - **Text**: Deep Slate (`#0F172A`) for headings, Muted Slate (`#64748B`) for body.
  - **Feedback**: Emerald (`#10B981`) for success/correct, Rose (`#EF4444`) for errors/incorrect.
- **Typography**: 
  - **Headings**: Geist Sans (or Inter), Bold/Black weight, tight letter-spacing (`-0.02em`).
  - **Body**: Geist Sans, Regular/Medium weight, open line-height (`1.6`).
  - **Data**: Geist Mono for scores and statistics.

---

## 2. Structural Motifs
- **Corner Radii**: Aggressive rounding for a modern, approachable feel (Cards: `24px`, Buttons: `12px`).
- **Elevation**: Multi-layered, soft shadows instead of borders. Use "Elevation 1" for static cards and "Elevation 2" for hover states.
- **Glassmorphism**: Use `backdrop-filter: blur(12px)` and semi-transparent white overlays for sticky navigation and floating headers.
- **Whitespace**: Generous "Editorial" spacing. Use large margins (`64px+` on desktop) to create focus.

---

## 3. Screen Specifications

### Hero / Landing
- **Layout**: Typographic dominance. Large-scale headline (72px+) using a "leading-split" layout.
- **Visuals**: Abstract, high-blur mesh gradients in the background (Blue/Purple hues at 10% opacity).
- **CTA**: High-contrast primary button with a subtle "shimmer" effect.

### Dashboard
- **Stats**: Individual "Elevation 1" cards. Each stat has a unique colored icon background (soft pastels).
- **Activity**: Clean list items with horizontal progression. Use `border-left` indicators for status colors.
- **Density**: Medium-low. Prioritize scanability of "Highest Score" and "Avg. Percentage".

### Quiz Interface
- **Atmosphere**: Extreme focus. No navigation distractions.
- **Progression**: Thin, full-width progress bar at the top with a high-contrast blue fill.
- **Interaction**: Options are large, 2-line cards. Selected state uses a high-saturation blue border and light blue background.

### Analytics & Results
- **Charts**: Minimalist Recharts. No grid lines. Soft-edged Pie and Bar charts.
- **Breakdown**: Vertical timeline-style list of answers. Clear iconography for "Correct" vs. "Incorrect" using solid circle fills.

---

## 4. Interaction Principles
- **Transitions**: Ease-in-out using `cubic-bezier(0.4, 0, 0.2, 1)`.
- **Feedback**: Immediate visual response on all touch/click actions (subtle scale down `0.98` on click).
- **Loading**: Pulse skeletons that match the exact geometry of the cards.
