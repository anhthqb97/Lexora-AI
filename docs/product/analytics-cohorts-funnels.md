# Analytics — Cohorts & Funnels

**Task:** P2-T30  
**Last Updated:** 2026-07-19

---

## Core Funnels

1. **Activation:** Register → Onboarding → First session
2. **Retention:** D1 → D7 → D30 return
3. **Monetization:** Free → Paywall view → Checkout → Pro

---

## Cohort Definitions

| Cohort | Dimension |
|---|---|
| Signup week | ISO week of registration |
| Goal | TOEIC / Speaking / Business |
| Level | A2 / B1 / B2 |
| Channel | Organic / Referral / Center |

---

## Key Metrics (Phase 5)

| Metric | Target |
|---|---|
| D7 retention | ≥40% |
| Free → Pro (90d) | ≥8% |
| Speaking sessions/user/week | ≥2.5 |

---

## Tooling

- Event schema: `lib/analytics/events.ts` (future)
- Export to BigQuery (Phase 6 P3-T25)
