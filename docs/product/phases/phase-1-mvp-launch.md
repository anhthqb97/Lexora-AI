# MVP Build — Phases 1–3 Overview

**Version:** 1.0  
**Total duration:** 20 weeks (Sprints 1–10) · **Gate:** M5 Public Launch  
**Status:** Split into **3 manageable phase plans** (2026-07-19)

> **Learn Smarter. Speak Better.**

The original monolithic "Phase 1 MVP Launch" (104 tasks) is now **three separate phase documents** for easier planning, ownership, and gate reviews.

**Task IDs unchanged:** All build tasks remain `P1-T001`–`P1-T104` — no renumbering required.

---

## Phase map

| Phase | Document | Weeks | Sprints | Gate | Focus |
|---|---|---|---|---|---|
| **1** | [`phase-1-platform.md`](phase-1-platform.md) | 3–8 | 1–3 | **M1** | Auth, dashboard, AI/speech infra, billing sandbox |
| **2** | [`phase-2-speaking.md`](phase-2-speaking.md) | 9–14 | 4–6 | **M2** | Lexora Speaking MVP + E2E |
| **3** | [`phase-3-toeic-launch.md`](phase-3-toeic-launch.md) | 15–22 | 7–10 | **M3–M5** | Beta, TOEIC, prod deploy, launch |

**After MVP:**

| Phase | Document | Gate |
|---|---|---|
| **4** | [`phase-4-native-scale.md`](phase-4-native-scale.md) | M6 — Native app |
| **5** | [`phase-5-growth.md`](phase-5-growth.md) | M8–M9 — 50K MAL |
| **6** | [`phase-6-scale-sea.md`](phase-6-scale-sea.md) | M10 — SEA launch |

**Index:** [`README.md`](README.md) · **Master plan:** [`../master-plan.md`](../master-plan.md)

---

## Dependency chain

```
Phase 0 (Discovery, M0)
    ↓
Phase 1 Platform (M1)
    ↓
Phase 2 Speaking (M2)
    ↓
Phase 3 TOEIC + Launch (M3 → M5)
    ↓
Phase 4 Native (M6)
    ↓
Phase 5 Growth (M8–M9)
    ↓
Phase 6 Scale & SEA (M10)
```

---

## Cross-phase tracks

### Infrastructure

| ID | Task | Phase | Sprint |
|---|---|---|---|
| P1-T088–P1-T092 | Redis, health, logging | 1 | 1–2 |
| P1-T090–P1-T091 | Rate limit, indexes | 1 | 2 |
| P1-T093, P1-T097 | Monitoring, webhooks | 1 | 3 |
| P1-T095–P1-T098 | Prod deploy, DNS, backup | 3 | 9 |

### E2E & CI

| ID | Task | Phase | Sprint |
|---|---|---|---|
| P1-T004, P1-T104 | CI + security + PR gate | 1 | 1 |
| P1-T099–P1-T101 | Playwright + platform E2E | 1 | 2 |
| P1-T102 | Speaking E2E smoke | 2 | 6 |
| P1-T103 | TOEIC E2E smoke | 3 | 8 |

Spec: [`test-automation-e2e.md`](../../qa/test-automation-e2e.md) · CI: [`ci-cd.md`](../../engineering/ci-cd.md)

---

## Sprint 1 Task Details (canonical)

Detailed DoD for early platform tasks — expand other sprints per [`TASK-TEMPLATE.md`](TASK-TEMPLATE.md).

### P1-T001 — Scaffold Next.js modular monolith

| Field | Value |
|---|---|
| **Branch** | `p1/P1-T001-monolith-scaffold` |
| **Owner** | Dev |
| **Phase** | 1 |

**Scope:** Next.js 15 App Router, TypeScript, Tailwind; `lib/modules/{auth,user,speaking,toeic,billing}`; stub `app/api/v1/*`.

**DoD:** `npm run dev` works; structure matches `tdd-platform.md`; no secrets in repo.

**Commit:** `P1-T001: scaffold Next.js modular monolith`

---

### P1-T002 — MongoDB Mongoose connection

**DoD:** App connects to Atlas staging on startup.

**Commit:** `P1-T002: add MongoDB Mongoose connection`

---

### P1-T003 — Docker Compose local dev

**Scope:** Per [`local-development.md`](../../engineering/local-development.md).

**DoD:** `npm run local:setup` → all services healthy.

**Commit:** `P1-T003: add docker compose for local dev`

---

### P1-T004 — CI/CD pipeline

**Scope:** Per [`ci-cd.md`](../../engineering/ci-cd.md) §4.1.

**Commit:** `P1-T004: add CI/CD pipeline for Vercel`

---

### P1-T104 — Security + PR review gates

**Scope:** `security.yml`, `pr-gate.yml`, CODEOWNERS, PR template.

**Commit:** `P1-T104: add security and PR gate workflows`

---

### P1-T099 — Playwright E2E scaffold

**Commit:** `P1-T099: add Playwright E2E scaffold and fixtures`

---

### P1-T100 — GitHub Actions E2E workflow

**Commit:** `P1-T100: add GitHub Actions E2E workflow for PR gate`

---

### P1-T101 — Platform E2E specs

**Commit:** `P1-T101: add platform E2E specs for auth and onboarding`

---

### P1-T102 — Speaking E2E smoke

**Commit:** `P1-T102: add speaking E2E smoke automation`

---

### P1-T005 — Sentry monitoring

**Commit:** `P1-T005: integrate Sentry error monitoring`

---

### P1-T006 — Email password auth

**Commit:** `P1-T006: add email password register and login`

---

### P1-T007 — Auth.js configuration

**Commit:** `P1-T007: configure Auth.js for Next.js`

---

### P1-T008 — Design system setup

**Commit:** `P1-T008: setup Tailwind and shadcn design system`

---

> **Archived monolith:** Full original task tables preserved in git history (file split 2026-07-19). Use phase-specific files for day-to-day tracking.

---

## References

| Document | Link |
|---|---|
| Phase 1 | [`phase-1-platform.md`](phase-1-platform.md) |
| Phase 2 | [`phase-2-speaking.md`](phase-2-speaking.md) |
| Phase 3 | [`phase-3-toeic-launch.md`](phase-3-toeic-launch.md) |
| Speaking PRD | [`../speaking/prd-speaking.md`](../speaking/prd-speaking.md) |
| TOEIC PRD | [`../toeic/prd-toeic.md`](../toeic/prd-toeic.md) |
