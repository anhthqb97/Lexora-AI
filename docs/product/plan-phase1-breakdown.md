# Lexora AI — Phase 1 Execution Plan

**Version:** 1.0
**Status:** Draft — **Archived.** Superseded by [`master-plan.md`](master-plan.md) + [`phases/phase-1-mvp-launch.md`](phases/phase-1-mvp-launch.md). Keep for sprint narrative detail only.
**Owner:** Product Team
**Last Updated:** 2026-07-19
**Horizon:** ~20 weeks (10 sprints × 2 weeks)

> **Canonical planning docs:** [`master-plan.md`](master-plan.md) · [`phases/README.md`](phases/README.md)

> **Learn Smarter. Speak Better.**

---

## 1. Executive Summary

This plan breaks Phase 1 into **4 stages** before public launch:

| Stage | Name | Duration | Outcome |
|---|---|---|---|
| 0 | Discovery & Sign-off | 2 weeks | PRD approved, spikes done, designs ready |
| 1 | Platform Foundation | 4 weeks | Auth, billing, dashboard shell, AI infra |
| 2 | Lexora Speaking MVP | 6 weeks | End-to-end speaking sessions live in staging |
| 3 | Beta, TOEIC Start & Launch | 8 weeks | Closed beta → public launch + TOEIC MVP begins |

**Launch target products:** Lexora Speaking (full MVP) + Lexora TOEIC (core MVP) on shared platform.

**Architecture (MVP):** Next.js modular monolith + MongoDB + OpenAI + Azure Speech — see [`docs/engineering/architecture-decision-record.md`](../engineering/architecture-decision-record.md).

**Post-launch (Phase 1c+):** Expo native app, microservice extraction, self-hosted LLM — when beta metrics justify.

---

## 2. High-Level Timeline

```
Week  1–2   [Stage 0] Discovery, spikes, UX wireframes, PRD sign-off
Week  3–4   [Stage 1] Sprint 1–2: Platform foundation
Week  5–6   [Stage 1] Sprint 3: AI pipeline + speech engine integration
Week  7–8   [Stage 2] Sprint 4: Speaking session core loop
Week  9–10  [Stage 2] Sprint 5: Speech evaluation + feedback
Week  11–12 [Stage 2] Sprint 6: Summary, dashboard, polish
Week 13–14  [Stage 3] Sprint 7: Closed beta (50 learners)
Week 15–16  [Stage 3] Sprint 8: TOEIC MVP + bug fixes
Week 17–18  [Stage 3] Sprint 9: Open beta + payment live
Week 19–20  [Stage 3] Sprint 10: Public launch + post-launch review
```

---

## 3. Stage 0 — Discovery & Sign-off (Week 1–2)

**Gate:** No coding until this stage passes.

### 3.1 Week 1 — Decisions & Spikes

| # | Task | Owner | Deliverable | Done when |
|---|---|---|---|---|
| 0.1 | Resolve 5 open questions in Speaking PRD | PM | Updated PRD v1.0 | All questions answered |
| 0.2 | Speech engine spike (Azure vs Google vs custom) | AI Engineer + Architect | Feasibility Memo | Accuracy ≥85% on VN-accent samples |
| 0.3 | Latency spike on 4G (Vietnam) | AI Engineer | Latency report | Text ≤3s, speech ≤5s p95 |
| 0.4 | Cost model per session | PM + Architect | Unit economics sheet | Cost/session documented |
| 0.5 | Audio storage decision (raw vs transcript) | Architect + Legal | Privacy decision log | Legal sign-off |
| 0.6 | Define free tier limits | PM | Pricing spec v0.1 | 3 sessions/week free (proposed) |

**Proposed answers (pending sign-off):**

| Open Question | Proposed Decision |
|---|---|
| Free tier limits | 3 speaking sessions/week; unlimited for paid |
| Vietnamese help default | ON for A1–A2, OFF for B1+ |
| Speech engine | Azure Speech (STT + pronunciation assessment) for MVP |
| Audio storage | Transcripts + scores only; no raw audio after 24h |
| TOEIC speaking in MVP | Picture description + respond to questions only |

### 3.2 Week 2 — Design & Backlog

| # | Task | Owner | Deliverable |
|---|---|---|---|
| 0.7 | User flow wireframes (5 core screens) | PM + Designer | UX Spec |
| 0.8 | Technical Design Doc (TDD) | Architect | `docs/engineering/tdd-platform.md` |
| 0.9 | Break PRD into epics + stories | PM | Backlog (see Section 6) |
| 0.10 | QA test plan draft | QA Lead | Test plan v0.1 |
| 0.11 | PRD walkthrough & sign-off | PM | Approved PRD v1.0 |
| 0.12 | Sprint 1 planning | Full team | Sprint 1 backlog ready |

### 3.3 Stage 0 Exit Criteria

- [ ] Feasibility Memo approved — speech accuracy and latency acceptable
- [ ] PRD signed off by PM, Architect, AI Engineer, QA
- [ ] Wireframes for: Dashboard, Session Setup, Live Session, Summary, Onboarding
- [ ] TDD reviewed — API contracts defined
- [ ] Backlog prioritized with P0 stories estimated
- [ ] Dev/staging environments provisioned

---

## 4. Stage 1 — Platform Foundation (Week 3–6)

Build shared infrastructure all Lexora products need.

### Epic E1: Project Setup & DevOps

| Story | Description | Points | Sprint |
|---|---|---|---|
| E1-01 | Next.js modular monolith scaffold | 3 | 1 |
| E1-02 | CI/CD pipeline (lint, test, deploy to staging) | 5 | 1 |
| E1-03 | Dev + staging + prod environments | 3 | 1 |
| E1-04 | Error monitoring + logging (Sentry or equivalent) | 2 | 1 |
| E1-05 | Product analytics events schema | 3 | 2 |

### Epic E2: Authentication & User Management

| Story | Description | Points | Sprint |
|---|---|---|---|
| E2-01 | Email + password registration and login | 5 | 1 |
| E2-02 | Phone OTP login (Vietnam) | 5 | 2 |
| E2-03 | Google + Facebook OAuth | 3 | 2 |
| E2-04 | User profile (name, level, goals) | 3 | 2 |
| E2-05 | Onboarding flow (goal selection, level assessment stub) | 5 | 2 |

**Acceptance (E2-05):**
- Given a new user, when they complete onboarding, then their goal (TOEIC / Speaking / Business) and estimated level (A1–C1) are saved.

### Epic E3: Subscription & Billing

| Story | Description | Points | Sprint |
|---|---|---|---|
| E3-01 | Free vs paid tier model in database | 3 | 2 |
| E3-02 | Paywall component (session limit reached) | 3 | 3 |
| E3-03 | MoMo payment integration | 8 | 3 |
| E3-04 | VNPay + card payment integration | 5 | 3 |
| E3-05 | Subscription management page (upgrade, cancel) | 5 | 3 |

### Epic E4: Dashboard Shell

| Story | Description | Points | Sprint |
|---|---|---|---|
| E4-01 | Responsive layout (Vietnamese UI) | 5 | 2 |
| E4-02 | Learner dashboard home (products, progress stub) | 5 | 2 |
| E4-03 | Navigation between Lexora products | 3 | 2 |
| E4-04 | Settings page (language, notifications, account) | 3 | 3 |

### Epic E5: AI Infrastructure

| Story | Description | Points | Sprint |
|---|---|---|---|
| E5-01 | LLM gateway service (prompt injection, guardrails) | 8 | 3 |
| E5-02 | Deploy Lexora Speaking tutor prompt to staging | 3 | 3 |
| E5-03 | Content moderation layer (input + output filter) | 5 | 3 |
| E5-04 | Speech-to-text integration (Azure Speech) | 8 | 3 |
| E5-05 | Pronunciation scoring integration | 8 | 3 |
| E5-06 | Conversation context manager (session memory) | 5 | 3 |

### Stage 1 Exit Criteria

- [ ] User can register, onboard, and land on dashboard
- [ ] LLM responds in staging with Lexora tutor persona
- [ ] Speech-to-text returns transcript from mic input
- [ ] Payment flow works in sandbox (MoMo)
- [ ] Analytics events firing for key actions

---

## 5. Stage 2 — Lexora Speaking MVP (Week 7–12)

Build the full speaking loop from PRD.

### Epic E6: Session Management

| Story | PRD Ref | Description | Points | Sprint |
|---|---|---|---|---|
| E6-01 | SP-01, FR-01 | Start speaking session from dashboard (one tap) | 5 | 4 |
| E6-02 | SP-02, FR-02 | Session type selection (Free Talk, Topic, Scenario) | 5 | 4 |
| E6-03 | FR-03 | Duration picker (5, 10, 15, 20 min) | 3 | 4 |
| E6-04 | FR-05 | Free-tier session limit enforcement | 3 | 4 |
| E6-05 | NFR-08 | Microphone permission + voice consent flow | 5 | 4 |
| E6-06 | FR-04 | Session resume after interruption (P1) | 5 | 6 |

**Acceptance (E6-01):**
- Given a logged-in learner on dashboard, when they tap "Start Speaking", then session setup screen loads in ≤2s.

**Acceptance (E6-05):**
- Given a first-time user, when they start a session, then voice consent modal appears before mic access; consent is logged.

### Epic E7: Live Conversation Loop

| Story | PRD Ref | Description | Points | Sprint |
|---|---|---|---|---|
| E7-01 | SP-03, FR-06 | AI greeting and opening question | 5 | 4 |
| E7-02 | FR-07, FR-13 | Speak → transcribe → AI respond loop | 13 | 4 |
| E7-03 | FR-08 | AI follow-up questions to extend dialogue | 5 | 5 |
| E7-04 | SP-07, FR-09 | Dynamic level adaptation (A1–C1) | 8 | 5 |
| E7-05 | FR-11 | Guardrail: no exam answers without teaching | 3 | 5 |
| E7-06 | FR-10 | Inline gentle corrections (P1) | 5 | 6 |
| E7-07 | FR-12 | Vietnamese help toggle (P1) | 5 | 6 |

**Acceptance (E7-02):**
- Given an active session, when learner speaks for 5–30 seconds, then transcript appears and AI responds within ≤3s p95.

### Epic E8: Speech Evaluation

| Story | PRD Ref | Description | Points | Sprint |
|---|---|---|---|---|
| E8-01 | FR-14 | Pronunciation scoring (word level) | 8 | 5 |
| E8-02 | FR-15 | Fluency scoring (pace, pauses, fillers) | 5 | 5 |
| E8-03 | FR-16 | Grammar scoring on spoken responses | 5 | 5 |
| E8-04 | FR-17 | Vocabulary scoring | 5 | 5 |
| E8-05 | FR-18 | Overall confidence score | 3 | 5 |
| E8-06 | FR-19 | Top 3 improvement areas per session | 3 | 5 |
| E8-07 | FR-20 | Vietnamese-accent English tuning | 8 | 5 |

**Acceptance (E8-01–05):**
- Given a completed 5-min session, when evaluation runs, then scores for all 5 dimensions return within ≤5s p95.

### Epic E9: Feedback & Summary

| Story | PRD Ref | Description | Points | Sprint |
|---|---|---|---|---|
| E9-01 | SP-04, SP-05, FR-21–23 | Post-session summary with explain-why feedback | 8 | 6 |
| E9-02 | SP-06 | Session summary UI (scores, highlights, examples) | 5 | 6 |
| E9-03 | SP-08 | Retry flagged phrases | 5 | 6 |
| E9-04 | — | Session end AI encouragement message | 3 | 6 |
| E9-05 | FR-24 | Audio replay alongside correction (P1) | 8 | 6 |

**Acceptance (E9-01):**
- Given session end, when summary generates, then each correction shows: original, improved version, and reason why.

### Epic E10: Progress & Dashboard

| Story | PRD Ref | Description | Points | Sprint |
|---|---|---|---|---|
| E10-01 | FR-26 | Dashboard: session count + total practice time | 3 | 6 |
| E10-02 | SP-11, FR-27 | Score trend charts 7/30/90 days (P1) | 5 | 6 |
| E10-03 | FR-28 | Recurring error pattern detection (P1) | 8 | 6 |
| E10-04 | FR-29 | Recommended next topics (P1) | 5 | 6 |

### Epic E11: Content Library (MVP)

| Story | Description | Points | Sprint |
|---|---|---|---|
| E11-01 | Topic library (10 topics: Travel, Tech, Health, etc.) | 3 | 4 |
| E11-02 | Scenario library (5 scenarios: Restaurant, Interview, etc.) | 3 | 4 |
| E11-03 | TOEIC practice prompts (picture + Q&A) (P1) | 5 | 6 |

### Stage 2 Exit Criteria (MVP Launch Checklist)

- [ ] Full 5-minute speaking session works end-to-end on mobile browser
- [ ] All 5 evaluation dimensions scored
- [ ] Summary displays within 10 seconds of session end
- [ ] Free-tier limits enforced
- [ ] Session data on dashboard
- [ ] AI latency meets NFR targets in load test
- [ ] QA sign-off on P0 test cases

---

## 6. Stage 3 — Beta, TOEIC & Launch (Week 13–20)

### Epic E12: Closed Beta (Week 13–14)

| Story | Description | Owner |
|---|---|---|
| E12-01 | Recruit 50 beta learners (university + professional) | PM |
| E12-02 | Beta feedback form (usefulness rating, NPS) | PM |
| E12-03 | Fix P0 bugs from beta | Dev team |
| E12-04 | Speech accuracy review with 100 VN-accent samples | AI Engineer |
| E12-05 | Beta report: completion rate, feedback scores | PM |

**Beta gate:** Session completion ≥60%, feedback rating ≥3.8/5 → proceed to open beta.

### Epic E13: Lexora TOEIC MVP (Week 15–16, parallel)

| Story | Description | Points | Sprint |
|---|---|---|---|
| E13-01 | TOEIC PRD finalization | — | PM, Week 14 |
| E13-02 | TOEIC diagnostic test (listening + reading stub) | 8 | 8 |
| E13-03 | Adaptive lesson engine (basic) | 13 | 8 |
| E13-04 | Mock exam module (1 full test) | 13 | 8 |
| E13-05 | Score tracking + improvement plan | 8 | 8 |
| E13-06 | TOEIC dashboard integration | 5 | 8 |

### Epic E14: Open Beta & Launch (Week 17–20)

| Story | Description | Sprint |
|---|---|---|
| E14-01 | Payment go-live (MoMo, VNPay, cards) | 9 |
| E14-02 | Marketing landing page (Vietnamese) | 9 |
| E14-03 | Open beta (500 users) | 9 |
| E14-04 | Performance hardening (2,000 concurrent sessions) | 9 |
| E14-05 | Public launch | 10 |
| E14-06 | Post-launch 30-day metric review | 10 |

### Stage 3 Exit Criteria

- [ ] Public launch with Speaking + TOEIC core
- [ ] Payment conversion funnel live
- [ ] No open P0 bugs
- [ ] Session completion ≥70%
- [ ] 30-day retention tracking active

---

## 7. Sprint Calendar

| Sprint | Weeks | Focus | Key Demo |
|---|---|---|---|
| 0 | 1–2 | Discovery | Feasibility Memo + wireframes |
| 1 | 3–4 | Platform setup, auth | User registers and logs in |
| 2 | 5–6 | Onboarding, dashboard shell | User completes onboarding |
| 3 | 7–8 | AI infra, speech engine, billing | Mic → transcript → LLM response |
| 4 | 9–10 | Speaking session core | Full conversation loop |
| 5 | 11–12 | Speech evaluation | 5-dimension scores live |
| 6 | 13–14 | Summary, dashboard, polish | End-to-end session + summary |
| 7 | 15–16 | Closed beta | 50 learners testing |
| 8 | 17–18 | TOEIC MVP + bug fixes | TOEIC mock exam demo |
| 9 | 19–20 | Open beta, payments | Paid subscription works |
| 10 | 21–22 | Public launch | 🚀 Go live |

---

## 8. Team & RACI

| Role | Stage 0 | Stage 1 | Stage 2 | Stage 3 |
|---|---|---|---|---|
| **Product Manager** | PRD, backlog, decisions | Prioritize, unblock | Accept stories, beta | Launch, metrics |
| **Business Analyst** | Requirements traceability | User stories, AC | Beta feedback analysis | KPI reporting |
| **System Architect** | TDD, spikes | Platform design | API review | Scale, hardening |
| **AI Engineer** | Speech spike | LLM + speech pipeline | Evaluation tuning | VN-accent optimization |
| **Frontend Dev** | Wireframe review | Dashboard, auth UI | Session UI, summary | Landing page |
| **Backend Dev** | — | Auth, billing, APIs | Session management | TOEIC engine |
| **QA Lead** | Test plan | Integration tests | E2E speaking tests | Beta + launch QA |

**Minimum team (MVP):** 1 PM, 1 Architect, 1 AI Engineer, 2 Full-stack Devs, 1 QA (part-time OK in Stage 0).

---

## 9. Milestones & Go/No-Go Gates

| Milestone | Week | Gate Criteria | If fail |
|---|---|---|---|
| **M0: Discovery Complete** | 2 | Spikes pass, PRD signed | Extend spikes 1 week |
| **M1: Platform Ready** | 6 | Auth + AI pipeline in staging | Delay Speaking 1 sprint |
| **M2: Speaking MVP** | 12 | E2E session works, QA sign-off | Beta delay 2 weeks |
| **M3: Closed Beta Pass** | 14 | Completion ≥60%, rating ≥3.8 | Fix accuracy/latency |
| **M4: TOEIC Core** | 16 | 1 mock exam works | Launch Speaking only |
| **M5: Public Launch** | 20 | All launch criteria met | Soft launch, iterate |

---

## 10. Risk Checkpoints

| Week | Checkpoint | Action if red |
|---|---|---|
| 2 | Speech accuracy <80% on VN samples | Evaluate alternate engine or narrow MVP |
| 6 | LLM latency >5s p95 | Add streaming, smaller model, caching |
| 10 | Session completion <50% in internal test | UX simplification sprint |
| 14 | Beta feedback <3.5/5 | Prompt tuning + evaluation recalibration |
| 18 | Payment integration blocked | Launch free-only, add payments in v1.1 |

---

## 11. Document Roadmap (What to Create Next)

| # | Document | Owner | Due |
|---|---|---|---|
| 1 | Feasibility Memo (speech engine) | Architect + AI | Week 1 |
| 2 | UX Spec + wireframes | PM + Designer | Week 2 |
| 3 | Technical Design Doc | Architect | Week 2 |
| 4 | QA Test Plan | QA Lead | Week 2 |
| 5 | PRD — Lexora TOEIC | PM | Week 14 |
| 6 | AI Tutor Prompt — TOEIC | AI Engineer | Week 15 |
| 7 | Marketing Landing Page Copy | PM | Week 17 |
| 8 | Release Notes v1.0 | PM | Week 20 |

---

## 12. Definition of Done (All Stories)

A story is **Done** when:

- [ ] Code merged to main with passing CI
- [ ] Acceptance criteria verified by QA
- [ ] API documented (if applicable)
- [ ] Analytics events added (if user-facing)
- [ ] No P0/P1 bugs open for the story
- [ ] PO accepts the demo

---

## 13. References

| Document | Link |
|---|---|
| Brand & Product Requirements | [`brand.md`](brand.md) |
| PRD — Lexora Speaking | [`speaking/prd-speaking.md`](speaking/prd-speaking.md) |
| AI Tutor Prompt — Speaking | [`../AI/tutor-speaking-prompt.md`](../AI/tutor-speaking-prompt.md) |
| System Prompts | [`../AI/system-prompts.md`](../AI/system-prompts.md) |
