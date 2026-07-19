# Sprint 1 Planning — Commitment

**Version:** 1.0  
**Sprint:** 1 (Weeks 3–4)  
**Status:** Committed (P0-T13, 2026-07-19)  
**Gate dependency:** M0 must pass before Sprint 1 code starts

---

## 1. Sprint goal

Deliver monolith scaffold, local dev stack, CI/CD, auth foundation, and infra baseline so a user can register and log in on staging.

---

## 2. Committed backlog

| ID | Task | Owner | Pts | Sprint |
|---|---|---|---|---|
| P1-T001 | Next.js modular monolith scaffold | Dev (Full-stack) | 3 | 1 |
| P1-T002 | MongoDB Atlas + Mongoose connection | Dev (Full-stack) | 2 | 1 |
| P1-T003 | Docker Compose local MongoDB Redis Ollama | Dev (Full-stack) | 3 | 1 |
| P1-T004 | CI/CD lint test build Vercel deploy | DevOps / Dev | 8 | 1 |
| P1-T005 | Sentry error monitoring | Dev (Full-stack) | 2 | 1 |
| P1-T006 | Email password register login | Dev (Full-stack) | 5 | 1 |
| P1-T007 | Auth.js configuration | Dev (Full-stack) | 3 | 1 |
| P1-T008 | Design system Tailwind shadcn | Dev (Full-stack) | 3 | 1 |
| P1-T088 | Upstash Redis client | Dev (Full-stack) | 2 | 1 |
| P1-T089 | Health check endpoint | Dev (Full-stack) | 1 | 1 |
| P1-T092 | Structured logging (pino) | Dev (Full-stack) | 2 | 1 |
| P1-T104 | Security + PR gate workflows | DevOps | 5 | 1 |

**Total:** 39 points · **Duration:** 2 weeks

---

## 3. Dependencies (must complete in Phase 0)

| Task | Required for |
|---|---|
| P0-T15 | `.env.example` before P1-T003 |
| P0-T14 | Staging MongoDB URI for P1-T002 |
| P0-T22 | Branch protection before P1-T004 merge gates |

---

## 4. Team commitment

| Role | Name | Date | Commitment |
|---|---|---|---|
| PM | Product Team | 2026-07-19 | ✅ Scope locked |
| Technical Lead | Architect | 2026-07-19 | ✅ Capacity approved |
| Dev | Full-stack team | 2026-07-19 | ✅ Sprint 1 backlog accepted |
| QA | QA Lead | 2026-07-19 | ✅ Test plan ready (P0-T10) |

---

## 5. References

| Document | Link |
|---|---|
| Phase 1 platform | [`phase-1-platform.md`](phase-1-platform.md) |
| Sprint 1 task details | [`phase-1-mvp-launch.md`](phase-1-mvp-launch.md) |
| Development rules | [`../../engineering/development-rules.md`](../../engineering/development-rules.md) |
