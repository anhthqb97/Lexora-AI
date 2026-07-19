# Phase 1 — Platform Foundation

**Version:** 1.0  
**Duration:** 6 weeks (Sprints 1–3) · **Weeks 3–8**  
**Gate:** **M1** — Platform ready (auth, AI pipeline, billing sandbox)  
**Tasks:** P1-T001–P1-T028 (+ P1-T088–P1-T104 infra/CI subset)  
**Rules:** [`development-rules.md`](../../engineering/development-rules.md) · **One task = one commit**

> **Previous name:** Stage 1A of old monolithic "Phase 1 MVP Launch". Task IDs unchanged (`P1-T*`).

**Commit format:** `{task-id}: {content}` · Branch: `p1/P1-T001-short-desc`

**Next phase:** [`phase-2-speaking.md`](phase-2-speaking.md) — requires M1 pass

---

## Objectives

1. Next.js modular monolith + MongoDB + CI/CD
2. Auth (email, OTP, OAuth) + onboarding + dashboard
3. Shared AI + Azure Speech pipeline
4. Billing sandbox (MoMo, VNPay, cards)
5. E2E scaffold + platform smoke tests in CI

---

## Sprint 1 (Week 3–4) — Scaffold & Auth

| ID | Task | Owner | Pts | Status |
|---|---|---|---|---|
| P1-T001 | Next.js modular monolith scaffold | Dev | 3 | ✅ |
| P1-T002 | MongoDB Atlas + Mongoose connection | Dev | 2 | ✅ |
| P1-T003 | Docker Compose local MongoDB Redis Ollama | Dev | 3 | ✅ |
| P1-T004 | CI/CD lint test build Vercel deploy | Dev | 8 | ✅ |
| P1-T005 | Sentry error monitoring | Dev | 2 | ✅ |
| P1-T104 | Security + PR gate workflows | DevOps | 5 | ✅ |
| P1-T088 | Upstash Redis client (`lib/redis`) | Dev | 2 | ✅ |
| P1-T089 | Health check endpoint | Dev | 1 | ✅ |
| P1-T092 | Structured logging (pino) | Dev | 2 | ✅ |
| P1-T006 | Email password register login | Dev | 5 | ✅ |
| P1-T007 | Auth.js configuration | Dev | 3 | ✅ |
| P1-T008 | Design system Tailwind shadcn | Dev | 3 | ✅ |

**Demo:** User registers and logs in on staging.

---

## Sprint 2 (Week 5–6) — Onboarding & Dashboard

| ID | Task | Owner | Pts | Status |
|---|---|---|---|---|
| P1-T009 | Phone OTP login (+84) | Dev | 5 | ✅ |
| P1-T010 | Google + Facebook OAuth | Dev | 3 | ✅ |
| P1-T011 | User profile module (`lib/modules/user`) | Dev | 3 | ✅ |
| P1-T012 | Onboarding: goal selection | Dev | 3 | ✅ |
| P1-T013 | Onboarding: level selection (A1–C1) | Dev | 2 | ✅ |
| P1-T014 | Responsive dashboard layout (VI UI) | Dev | 5 | ✅ |
| P1-T015 | Product cards (TOEIC, Speaking, etc.) | Dev | 3 | ✅ |
| P1-T016 | PostHog analytics events schema | Dev | 3 | ✅ |
| P1-T017 | Free vs paid tier in MongoDB | Dev | 3 | ✅ |
| P1-T090 | API rate limiting middleware | Dev | 3 | ✅ |
| P1-T091 | MongoDB indexes + migration script | Dev | 3 | ✅ |
| P1-T099 | Playwright E2E scaffold + fixtures | Dev + QA | 5 | ✅ |
| P1-T100 | GitHub Actions E2E workflow (PR gate) | DevOps | 5 | ✅ |
| P1-T101 | Platform E2E specs (auth, onboarding) | QA + Dev | 5 | ✅ |

**Demo:** Onboarding → dashboard; E2E smoke passes in CI.

---

## Sprint 3 (Week 7–8) — AI, Speech & Billing

| ID | Task | Owner | Pts | Status |
|---|---|---|---|---|
| P1-T018 | `lib/ai` — OpenAI client + prompt loader | AI Dev | 5 | ✅ |
| P1-T019 | Deploy tutor-speaking-prompt + guardrails | AI Dev | 3 | ✅ |
| P1-T020 | Content moderation (input/output filter) | AI Dev | 5 | ✅ |
| P1-T021 | `lib/speech/azure` — STT integration | AI Dev | 8 | ✅ |
| P1-T022 | Azure pronunciation scoring | AI Dev | 8 | ✅ |
| P1-T023 | Conversation context manager (Redis) | AI Dev | 5 | ✅ |
| P1-T024 | Paywall component | Dev | 3 | ✅ |
| P1-T025 | MoMo payment sandbox integration | Dev | 8 | ✅ |
| P1-T026 | VNPay + card payment sandbox | Dev | 5 | ⬜ |
| P1-T027 | Settings page (profile, language, billing) | Dev | 3 | ⬜ |
| P1-T028 | Subscription management page | Dev | 5 | ⬜ |
| P1-T093 | Uptime + latency monitoring | DevOps | 3 | ⬜ |
| P1-T097 | Payment webhook endpoints (MoMo/VNPay) | Dev | 5 | ⬜ |

**Demo:** Mic → transcript → LLM response; MoMo sandbox payment.

---

## Exit Criteria (M1)

- [ ] Register → onboard → dashboard
- [ ] LLM responds with Lexora persona
- [ ] Speech-to-text works from mic
- [ ] MoMo sandbox payment succeeds
- [ ] Analytics events firing
- [ ] CI + E2E platform smoke green on PR

---

## Sprint 1 Task Details

Full DoD for scaffold, Docker, CI, E2E — see [`phase-1-mvp-launch.md`](phase-1-mvp-launch.md) § Sprint 1 Task Details (canonical until tasks expand per sprint).

Key commits:

| ID | Commit message |
|---|---|
| P1-T001 | `P1-T001: scaffold Next.js modular monolith` |
| P1-T003 | `P1-T003: add docker compose for local dev` |
| P1-T004 | `P1-T004: add CI/CD pipeline for Vercel` |
| P1-T104 | `P1-T104: add security and PR gate workflows` |

---

## References

| Document | Link |
|---|---|
| MVP overview | [`phase-1-mvp-launch.md`](phase-1-mvp-launch.md) |
| Platform PRD | [`../platform/prd-platform.md`](../platform/prd-platform.md) |
| Platform TDD | [`../../engineering/tdd-platform.md`](../../engineering/tdd-platform.md) |
| Next phase | [`phase-2-speaking.md`](phase-2-speaking.md) |
