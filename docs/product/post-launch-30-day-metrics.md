# Post-Launch 30-Day Metrics Dashboard Spec

**Task:** P1-T085  
**Version:** 1.0  
**Last Updated:** 2026-07-19  
**Owner:** PM

---

## 1. Purpose

Track product health for **30 days** after public launch — feed retention gate for Phase 4.

---

## 2. Core KPIs

| KPI | Definition | Target | Source |
|---|---|---|---|
| MAL | Monthly active learners (≥1 session) | Ramp | MongoDB + analytics |
| Session completion | completed / started | ≥70% | `speaking_sessions` |
| TOEIC mock completion | completed mocks / started | ≥60% | `toeic_attempts` |
| 30-day retention | D30 / D0 cohort | ≥30% | Analytics |
| Paid conversion | paid / registered | ≥8% | `subscriptions` |
| NPS | Exit survey 0–10 | ≥40 | Forms |
| Feedback rating | 1–5 avg | ≥4.0 | In-app / form |

---

## 3. Dashboard Layout (Looker / Metabase)

### Tab 1 — Overview

- MAL trend (daily)
- Signups vs activations (onboarding complete)
- Revenue (Pro MRR estimate)

### Tab 2 — Engagement

- Speaking sessions/day
- TOEIC attempts/day
- Avg session duration

### Tab 3 — Quality

- Sentry error rate
- AI latency p95
- Payment success rate

### Tab 4 — Cohort retention

- D1, D7, D14, D30 retention curves

---

## 4. Weekly PM Review

| Week | Review date | Decision |
|---|---|---|
| 1 | Launch +7d | Fix top 3 friction points |
| 2 | +14d | Pricing / onboarding tweaks |
| 3 | +21d | Content gaps |
| 4 | +30d | Phase 4 go/no-go |

---

## 5. Data Pipeline

```
MongoDB → nightly ETL → warehouse (or Google Sheets MVP)
Sentry → weekly export
Payment webhooks → subscription events table
```

---

## References

| Document | Link |
|---|---|
| Beta checklist §4 | [`../qa/beta-checklist.md`](../qa/beta-checklist.md) |
| Master plan | [`../product/master-plan.md`](../product/master-plan.md) |
