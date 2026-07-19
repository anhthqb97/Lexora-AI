# Design System — Lexora AI

**Version:** 1.0
**Last Updated:** 2026-07-19

Based on [`docs/product/brand.md`](../product/brand.md) brand colors and personality.

---

## 1. Brand Personality in UI

Intelligent · Friendly · Professional · Encouraging · Modern · Trustworthy · Human-centered

**UI should feel:** Clean, spacious, motivating — never intimidating or overly academic.

---

## 2. Colors

### Primary — Deep Blue

| Token | Hex | Use |
|---|---|---|
| `--color-primary-900` | `#0A1628` | Headers, dark backgrounds |
| `--color-primary-700` | `#1A3A5C` | Primary buttons, nav |
| `--color-primary-500` | `#2563EB` | Links, active states |
| `--color-primary-100` | `#DBEAFE` | Light backgrounds |

**Purpose:** Trust, professionalism, intelligence

### Secondary — Teal

| Token | Hex | Use |
|---|---|---|
| `--color-secondary-600` | `#0D9488` | Progress bars, success |
| `--color-secondary-400` | `#2DD4BF` | Listening indicator, accents |
| `--color-secondary-100` | `#CCFBF1` | Card highlights |

**Purpose:** Growth, learning, freshness

### Accent — Orange

| Token | Hex | Use |
|---|---|---|
| `--color-accent-600` | `#EA580C` | Primary CTAs |
| `--color-accent-500` | `#F97316` | Hover states |
| `--color-accent-100` | `#FFEDD5` | Badge backgrounds |

**Purpose:** Motivation, energy, achievement

### Neutrals

| Token | Hex | Use |
|---|---|---|
| `--color-gray-900` | `#111827` | Body text |
| `--color-gray-600` | `#4B5563` | Secondary text |
| `--color-gray-200` | `#E5E7EB` | Borders |
| `--color-gray-50` | `#F9FAFB` | Page background |
| `--color-white` | `#FFFFFF` | Cards |

### Semantic

| Token | Hex | Use |
|---|---|---|
| `--color-success` | `#059669` | Correct, improvement |
| `--color-warning` | `#D97706` | Caution, time running out |
| `--color-error` | `#DC2626` | Errors (use sparingly) |

**Rule:** Never use red for speaking scores — use growth bars with Teal/Blue.

---

## 3. Typography

**Font stack (web):**
- **Headings:** Inter, system-ui, sans-serif
- **Body:** Inter, system-ui, sans-serif
- **Vietnamese:** Inter supports Vietnamese diacritics

| Scale | Size | Weight | Use |
|---|---|---|---|
| H1 | 28px / 1.75rem | 700 | Page titles |
| H2 | 22px / 1.375rem | 600 | Section headers |
| H3 | 18px / 1.125rem | 600 | Card titles |
| Body | 16px / 1rem | 400 | Default text |
| Small | 14px / 0.875rem | 400 | Captions, labels |
| Tiny | 12px / 0.75rem | 400 | Timestamps |

**Line height:** 1.5 body, 1.25 headings

---

## 4. Spacing & Layout

- **Base unit:** 4px
- **Page padding:** 16px mobile, 24px tablet+
- **Card padding:** 16px
- **Section gap:** 24px
- **Max content width:** 480px (mobile-first), 768px dashboard

---

## 5. Components

### Buttons

| Variant | Style | Use |
|---|---|---|
| Primary | Orange bg, white text | Main CTAs ("Bắt đầu luyện nói") |
| Secondary | Blue outline | Secondary actions |
| Ghost | Text only | Cancel, back |
| Disabled | Gray, 50% opacity | Unavailable actions |

**Min height:** 44px (touch target)

### Cards

- White background, `--color-gray-200` border, 12px radius
- Subtle shadow: `0 1px 3px rgba(0,0,0,0.1)`
- Product cards: icon + title + short description + arrow

### Progress Bars

- Teal fill on gray track
- Show numeric score alongside (e.g. 8.2/10)
- Label dimension name in Vietnamese

### Input Fields

- 12px radius, 1px gray border
- Focus: blue ring
- Error: red border + message below

### Modals

- Centered, max-width 400px
- Backdrop: rgba(0,0,0,0.5)
- Close X top-right

---

## 6. Icons & Imagery

- **Style:** Outlined, rounded, 24px default
- **Lexora logo:** Minimalist "L" + speech bubble (see brand.md)
- **Speaking session:** Microphone, waveform, robot coach avatar (friendly, not uncanny)
- **Avoid:** Stock photos of generic classrooms; prefer illustrations

---

## 7. Voice & Copy (UI)

From brand voice: Simple · Clear · Motivating · Professional · Educational · Positive

**Do:** "Buổi luyện hoàn thành! 🎉", "Bạn đang tiến bộ!"
**Don't:** "Your performance was inadequate", overly academic grammar terms without explanation

---

## 8. Accessibility

- WCAG 2.1 AA target
- Color contrast ≥4.5:1 for body text
- Focus visible on all interactive elements
- Min touch target 44×44px

---

## References

| Document | Link |
|---|---|
| Brand | [`../product/brand.md`](../product/brand.md) |
