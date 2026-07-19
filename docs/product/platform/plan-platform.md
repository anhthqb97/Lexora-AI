# Plan — Lexora Platform

> **Canonical execution plan:** [`../phases/phase-1-mvp-launch.md`](../phases/phase-1-mvp-launch.md) (tasks P1-T001–P1-T028)
>
> This file lists feature epics only. Use phase plan for task IDs and commits.

**Feature:** Platform (shared infrastructure)
**Version:** 1.0
**Sprints:** 1–3 (Week 3–8)
**Last Updated:** 2026-07-19

---

## Timeline

| Sprint | Weeks | Focus |
|---|---|---|
| 1 | 3–4 | DevOps, auth (email), project scaffold |
| 2 | 5–6 | OTP, OAuth, onboarding, dashboard shell |
| 3 | 7–8 | Billing, AI gateway, speech integration |

---

## Epic E1: Project Setup & DevOps

| ID | Story | Points | Sprint | Task ID | Acceptance |
|---|---|---|---|---|---|
| E1-01 | Next.js modular monolith scaffold (`lib/modules/*`) | 3 | 1 | P1-T001 | CI runs on push |
| E1-02 | CI/CD pipeline (lint, format, test, build, deploy staging) | 8 | 1 | P1-T004 | All ci/* jobs pass on PR |
| E1-16 | Security + PR review gates | 5 | 1 | P1-T104 | audit + task-id + CODEOWNERS |
| E1-15 | E2E automation (Playwright + GitHub Actions) | 13 | 2–6 | P1-T099–P1-T102 | E2E smoke blocks PR merge |
| E1-03 | Dev + staging environments | 3 | 0–1 | P0-T14, P1-T003 | Team can access staging URL |
| E1-04 | Production environment + domain | 5 | 9 | P0-T20, P1-T095, P1-T096 | lexora.ai live with SSL |
| E1-05 | Error monitoring (Sentry) | 2 | 1 | P1-T005 | Errors appear in dashboard |
| E1-06 | Structured logging | 2 | 1 | P1-T092 | JSON logs in staging |
| E1-07 | Health check endpoint | 1 | 1 | P1-T089 | `/api/v1/health` returns status |
| E1-08 | Redis client (Upstash) | 2 | 1 | P1-T088 | Redis ping succeeds |
| E1-09 | API rate limiting | 3 | 2 | P1-T090 | Abuse blocked on auth routes |
| E1-10 | MongoDB indexes + migrations | 3 | 2 | P1-T091 | Indexes match data-model.md |
| E1-11 | Uptime + latency monitoring | 3 | 3 | P1-T093 | Alerts on downtime |
| E1-12 | Payment webhook infra | 5 | 3 | P1-T097 | MoMo/VNPay callbacks verified |
| E1-13 | DB backup policy | 2 | 9 | P1-T098 | Atlas PITR enabled |
| E1-14 | Product analytics events schema | 3 | 2 | P1-T016 | Events documented |

---

## Epic E2: Authentication & User Management

| ID | Story | Points | Sprint | Acceptance |
|---|---|---|---|---|
| E2-01 | Email + password register/login | 5 | 1 | User can sign up and log in |
| E2-02 | Phone OTP login (+84) | 5 | 2 | OTP delivered and verified |
| E2-03 | Google + Facebook OAuth | 3 | 2 | Social login works |
| E2-04 | User profile (name, level, goal) | 3 | 2 | Profile saved to DB |
| E2-05 | Onboarding flow | 5 | 2 | Goal + level captured |

---

## Epic E3: Subscription & Billing

| ID | Story | Points | Sprint | Acceptance |
|---|---|---|---|---|
| E3-01 | Free vs paid tier in database | 3 | 2 | Tier stored on user |
| E3-02 | Paywall component | 3 | 3 | Shown when limit hit |
| E3-03 | MoMo payment integration | 8 | 3 | Sandbox payment succeeds |
| E3-04 | VNPay + card payment | 5 | 3 | Alternative methods work |
| E3-05 | Subscription management page | 5 | 3 | User can view/cancel plan |

---

## Epic E4: Dashboard Shell

| ID | Story | Points | Sprint | Acceptance |
|---|---|---|---|---|
| E4-01 | Responsive layout (Vietnamese UI) | 5 | 2 | Works on mobile 375px |
| E4-02 | Dashboard home (product cards) | 5 | 2 | All 5 products visible |
| E4-03 | Cross-product navigation | 3 | 2 | No re-login between products |
| E4-04 | Settings page | 3 | 3 | Profile, language, billing |

---

## Epic E5: AI Infrastructure

| ID | Story | Points | Sprint | Acceptance |
|---|---|---|---|---|
| E5-01 | LLM gateway (prompt injection, guardrails) | 8 | 3 | Speaking prompt deployable |
| E5-02 | Deploy tutor-speaking-prompt to staging | 3 | 3 | Lexora persona in responses |
| E5-03 | Content moderation layer | 5 | 3 | Blocked content flagged |
| E5-04 | Speech-to-text (Azure Speech) | 8 | 3 | Mic → transcript works |
| E5-05 | Pronunciation scoring integration | 8 | 3 | Word-level scores returned |
| E5-06 | Conversation context manager | 5 | 3 | Multi-turn memory works |

---

## Exit Criteria

- [ ] User registers, completes onboarding, lands on dashboard
- [ ] LLM responds with Lexora tutor persona in staging
- [ ] Speech-to-text returns transcript from mic
- [ ] MoMo sandbox payment completes
- [ ] Analytics events fire for signup, login, session start

---

## References

| Document | Link |
|---|---|
| PRD | [`prd-platform.md`](prd-platform.md) |
| Acceptance | [`acceptance-platform.md`](acceptance-platform.md) |
| Phase 1 Plan | [`../phases/phase-1-mvp-launch.md`](../phases/phase-1-mvp-launch.md) |
| Infra environments | [`../../engineering/infra-environments.md`](../../engineering/infra-environments.md) |
