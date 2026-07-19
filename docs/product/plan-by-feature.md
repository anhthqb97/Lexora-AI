# Lexora AI — Documentation File Plan (By Feature)

**Version:** 1.0
**Status:** Active
**Last Updated:** 2026-07-19

This document defines **what files to create** for each Lexora feature — organized by product, not by sprint.

**Legend:** ✅ exists · 🔲 to create · 🔜 future phase

**Feature scope (28 modules):** [`feature-catalog.md`](feature-catalog.md) — mapped to Ph0–Ph6

**Last generated:** 2026-07-19 — Review: [`REVIEW-SIGNOFF.md`](REVIEW-SIGNOFF.md) · Hub: [`README.md`](../README.md)

---

## 1. Folder Structure

```
docs/
├── product/                          # Product & business docs
│   ├── brand.md                      ✅ Brand identity + product requirements
│   ├── master-plan.md                ✅ Master roadmap (all phases)
│   ├── phases/                       ✅ Phase plans + task lists
│   ├── plan-phase1-breakdown.md      📦 Archived sprint detail (Phase 1)
│   ├── plan-by-feature.md            ✅ This file
│   │
│   ├── platform/                     # Shared platform (auth, billing, dashboard)
│   │   ├── prd-platform.md           ✅
│   │   ├── plan-platform.md          ✅
│   │   └── acceptance-platform.md    ✅
│   │
│   ├── toeic/                        # Lexora TOEIC
│   │   ├── prd-toeic.md              ✅
│   │   ├── plan-toeic.md             ✅
│   │   ├── content-map-toeic.md      🔲
│   │   └── acceptance-toeic.md       🔲
│   │
│   ├── speaking/                     # Lexora Speaking
│   │   ├── prd-speaking.md           ✅
│   │   ├── plan-speaking.md          ✅
│   │   ├── content-map-speaking.md   ✅
│   │   └── acceptance-speaking.md    ✅
│   │
│   ├── writing/                      # Lexora Writing
│   │   ├── prd-writing.md            🔲
│   │   ├── plan-writing.md           🔲
│   │   └── acceptance-writing.md     🔲
│   │
│   ├── business/                     # Lexora Business
│   │   ├── prd-business.md           🔲
│   │   ├── plan-business.md          🔲
│   │   └── acceptance-business.md    🔲
│   │
│   ├── interview/                    # Lexora Interview
│   │   ├── prd-interview.md          🔲
│   │   ├── plan-interview.md         🔲
│   │   └── acceptance-interview.md   🔲
│   │
│   ├── kids/                         # Lexora Kids (Future)
│   │   └── prd-kids.md               🔜
│   │
│   ├── schools/                      # Lexora for Schools (Future)
│   │   └── prd-schools.md            🔜
│   │
│   └── enterprise/                   # Lexora Enterprise (Future)
│       └── prd-enterprise.md         🔜
│
├── AI/                               # AI prompts & behavior specs
│   ├── system-prompts.md             ✅ Senior Product Team + brand context
│   ├── tutor-speaking-prompt.md      ✅ Lexora Speaking AI coach
│   ├── tutor-toeic-prompt.md         🔲
│   ├── tutor-writing-prompt.md       🔲
│   ├── tutor-business-prompt.md      🔲
│   ├── tutor-interview-prompt.md     🔲
│   └── guardrails.md                 ✅ Shared AI safety rules
│
├── design/                           # UX & UI specs
│   ├── design-system.md              ✅ Colors, typography, components
│   ├── workflow-overview-detail.md   ✅ Flowcharts — overview + detail
│   ├── ux-platform.md                ✅ Auth, onboarding, dashboard flows
│   ├── ux-speaking.md                ✅
│   ├── ux-toeic.md                   🔲
│   ├── ux-writing.md                 🔲
│   ├── ux-business.md                🔲
│   └── ux-interview.md               🔲
│
├── engineering/                      # Technical docs
│   ├── tech-stack.md                 ✅ MVP + target stack (v1.0)
│   ├── architecture-decision-record.md ✅ ADR
│   ├── development-rules.md            ✅ Git, commit, code rules
│   ├── tdd-platform.md               ✅ Technical Design Doc — platform
│   ├── tdd-speaking.md               ✅
│   ├── tdd-toeic.md                  🔲
│   ├── api-contracts.md              ✅ REST API reference
│   ├── data-model.md                 ✅ Database schema
│   └── feasibility-speech.md         ✅ Speech engine spike results
│
├── qa/                               # Quality assurance
│   ├── test-plan-platform.md         ✅
│   ├── test-plan-speaking.md         ✅
│   ├── test-automation-e2e.md        ✅ E2E + CI strategy (plan)
│   ├── test-plan-toeic.md            🔲
│   └── beta-checklist.md             ✅
│
└── marketing/                        # Go-to-market
    ├── landing-page-copy.md          🔲
    ├── app-store-copy.md             🔜 Phase 2 (native apps)
    └── pricing-page-copy.md          🔲
```

---

## 2. Standard File Set Per Feature

Every **Current** feature should have this file set:

| File | Purpose | Owner |
|---|---|---|
| `prd-{feature}.md` | What to build — goals, users, requirements, metrics | PM |
| `plan-{feature}.md` | How to build — epics, stories, dependencies, timeline | PM |
| `content-map-{feature}.md` | Content inventory — topics, scenarios, prompts, lessons | PM + Content |
| `acceptance-{feature}.md` | Launch checklist — go/no-go criteria | PM + QA |
| `tutor-{feature}-prompt.md` | AI behavior spec (if AI-powered) | AI Engineer |
| `ux-{feature}.md` | User flows and wireframe notes | PM + Designer |
| `tdd-{feature}.md` | Technical design for feature-specific APIs/services | Architect |
| `test-plan-{feature}.md` | Test cases mapped to PRD requirements | QA Lead |

**Platform** features (auth, billing, dashboard) follow the same pattern under `platform/`.

---

## 3. Feature Breakdown

### 3.1 Platform (Shared) — P0

**Scope:** Auth, onboarding, billing, dashboard shell, navigation, settings.

| File | Status | Priority | Notes |
|---|---|---|---|
| `product/platform/prd-platform.md` | 🔲 | P0 | Auth (email, OTP, OAuth), subscription, dashboard |
| `product/platform/plan-platform.md` | 🔲 | P0 | Epics E1–E5 from phase plan |
| `product/platform/acceptance-platform.md` | 🔲 | P0 | User can register, pay, reach dashboard |
| `design/ux-platform.md` | 🔲 | P0 | Onboarding, paywall, settings flows |
| `design/design-system.md` | 🔲 | P0 | Deep Blue, Teal, Orange from brand.md |
| `engineering/tdd-platform.md` | 🔲 | P0 | Auth API, billing API, user model |
| `engineering/data-model.md` | 🔲 | P0 | Users, subscriptions, sessions |
| `engineering/api-contracts.md` | 🔲 | P0 | Shared API reference |
| `qa/test-plan-platform.md` | 🔲 | P0 | Auth, billing, onboarding tests |

---

### 3.2 Lexora Speaking — P0

**Scope:** AI conversation coach, speech evaluation, session summary, progress.

| File | Status | Priority | Notes |
|---|---|---|---|
| `product/speaking/prd-speaking.md` | ✅ | P0 | Canonical Speaking PRD (v1.0) |
| `product/speaking/plan-speaking.md` | 🔲 | P0 | Epics E6–E11 from phase plan |
| `product/speaking/content-map-speaking.md` | 🔲 | P0 | 10 topics, 5 scenarios, TOEIC prompts |
| `product/speaking/acceptance-speaking.md` | 🔲 | P0 | PRD launch criteria as checklist |
| `AI/tutor-speaking-prompt.md` | ✅ | P0 | Already complete |
| `design/ux-speaking.md` | 🔲 | P0 | 5 screens: setup, live, summary, retry, dashboard |
| `engineering/tdd-speaking.md` | 🔲 | P0 | Session API, speech pipeline, scoring |
| `engineering/feasibility-speech.md` | 🔲 | P0 | Stage 0 spike results |
| `qa/test-plan-speaking.md` | 🔲 | P0 | E2E session, evaluation, summary |

**User stories:** SP-01 to SP-08 (P0), SP-09 to SP-12 (P1)

---

### 3.3 Lexora TOEIC — P0

**Scope:** Adaptive lessons, mock exams, score tracking, improvement plans.

| File | Status | Priority | Notes |
|---|---|---|---|
| `product/toeic/prd-toeic.md` | 🔲 | P0 | **Create next** — highest priority after Speaking |
| `product/toeic/plan-toeic.md` | 🔲 | P0 | Epics E13 from phase plan |
| `product/toeic/content-map-toeic.md` | 🔲 | P0 | Listening, reading, grammar lesson inventory |
| `product/toeic/acceptance-toeic.md` | 🔲 | P0 | 1 full mock exam works end-to-end |
| `AI/tutor-toeic-prompt.md` | 🔲 | P0 | Explain-why for TOEIC answers |
| `design/ux-toeic.md` | 🔲 | P0 | Diagnostic, lesson, mock exam, score report |
| `engineering/tdd-toeic.md` | 🔲 | P1 | Adaptive engine, question bank API |
| `qa/test-plan-toeic.md` | 🔲 | P0 | Mock exam scoring accuracy |

**Key requirements to define in PRD:**
- Diagnostic test flow
- Adaptive lesson algorithm
- Mock exam format (ETS-aligned)
- Score prediction model
- Improvement plan generation

---

### 3.4 Lexora Writing — P1

**Scope:** Grammar correction, vocabulary enhancement, writing evaluation, feedback.

| File | Status | Priority | Notes |
|---|---|---|---|
| `product/writing/prd-writing.md` | 🔲 | P1 | After Speaking + TOEIC MVP |
| `product/writing/plan-writing.md` | 🔲 | P1 | |
| `product/writing/acceptance-writing.md` | 🔲 | P1 | |
| `AI/tutor-writing-prompt.md` | 🔲 | P1 | Correction with explain-why |
| `design/ux-writing.md` | 🔲 | P1 | Editor, feedback panel, history |
| `engineering/tdd-writing.md` | 🔲 | P1 | |
| `qa/test-plan-writing.md` | 🔲 | P1 | |

---

### 3.5 Lexora Business — P2

**Scope:** Meetings, emails, presentations, negotiations, workplace communication.

| File | Status | Priority | Notes |
|---|---|---|---|
| `product/business/prd-business.md` | 🔲 | P2 | Phase 1 later stage |
| `product/business/plan-business.md` | 🔲 | P2 | |
| `product/business/content-map-business.md` | 🔲 | P2 | Scenario library: meetings, emails, etc. |
| `AI/tutor-business-prompt.md` | 🔲 | P2 | Formal/professional tone |
| `design/ux-business.md` | 🔲 | P2 | |
| `qa/test-plan-business.md` | 🔲 | P2 | |

---

### 3.6 Lexora Interview — P2

**Scope:** Mock interviews, speaking assessments, confidence coaching, feedback.

| File | Status | Priority | Notes |
|---|---|---|---|
| `product/interview/prd-interview.md` | 🔲 | P2 | Can share speech infra with Speaking |
| `product/interview/plan-interview.md` | 🔲 | P2 | |
| `product/interview/content-map-interview.md` | 🔲 | P2 | Industry-specific interview questions |
| `AI/tutor-interview-prompt.md` | 🔲 | P2 | Interviewer persona |
| `design/ux-interview.md` | 🔲 | P2 | |
| `qa/test-plan-interview.md` | 🔲 | P2 | |

---

### 3.7 Future Features — Phase 2+

| Feature | Phase | Minimum File |
|---|---|---|
| Lexora Kids | Phase 3 | `product/kids/prd-kids.md` |
| Lexora for Schools | Phase 3 | `product/schools/prd-schools.md` |
| Lexora Enterprise | Phase 3 | `product/enterprise/prd-enterprise.md` |

Create PRD only when feature enters roadmap planning.

---

## 4. Shared / Cross-Feature Files

| File | Status | Purpose |
|---|---|---|
| `product/brand.md` | ✅ | Brand identity, values, requirements, roadmap |
| `product/plan-phase1-breakdown.md` | ✅ | Cross-feature sprint timeline |
| `AI/system-prompts.md` | ✅ | Team persona + brand context for all AI work |
| `AI/guardrails.md` | 🔲 | Shared: no exam cheating, content moderation, privacy |
| `design/design-system.md` | 🔲 | Brand colors, typography, UI components |
| `engineering/api-contracts.md` | 🔲 | All feature APIs in one reference |
| `engineering/data-model.md` | 🔲 | Shared entities: User, Session, Score, Subscription |
| `qa/beta-checklist.md` | 🔲 | Cross-feature beta and launch gates |
| `marketing/landing-page-copy.md` | 🔲 | Vietnamese landing page |
| `marketing/pricing-page-copy.md` | 🔲 | Free vs paid tier messaging |

---

## 5. Creation Priority Queue

Ordered by when each file is needed (from phase plan):

### Immediate (Week 1–2, Stage 0)

| # | File | Feature |
|---|---|---|
| 1 | `engineering/feasibility-speech.md` | Speaking |
| 2 | `design/ux-speaking.md` | Speaking |
| 3 | `design/ux-platform.md` | Platform |
| 4 | `engineering/tdd-platform.md` | Platform |
| 5 | `product/platform/prd-platform.md` | Platform |
| 6 | `product/speaking/plan-speaking.md` | Speaking |
| 7 | `product/speaking/acceptance-speaking.md` | Speaking |
| 8 | `qa/test-plan-speaking.md` | Speaking |

### Before Sprint 3 (Week 5)

| # | File | Feature |
|---|---|---|
| 9 | `AI/guardrails.md` | Shared |
| 10 | `design/design-system.md` | Shared |
| 11 | `engineering/data-model.md` | Platform |
| 12 | `engineering/api-contracts.md` | Platform |
| 13 | `product/platform/plan-platform.md` | Platform |
| 14 | `product/speaking/content-map-speaking.md` | Speaking |
| 15 | `engineering/tdd-speaking.md` | Speaking |

### Before Sprint 8 (Week 15, TOEIC)

| # | File | Feature |
|---|---|---|
| 16 | `product/toeic/prd-toeic.md` | TOEIC |
| 17 | `product/toeic/plan-toeic.md` | TOEIC |
| 18 | `product/toeic/content-map-toeic.md` | TOEIC |
| 19 | `AI/tutor-toeic-prompt.md` | TOEIC |
| 20 | `design/ux-toeic.md` | TOEIC |
| 21 | `qa/test-plan-toeic.md` | TOEIC |

### Before Launch (Week 17–20)

| # | File | Feature |
|---|---|---|
| 22 | `marketing/landing-page-copy.md` | Marketing |
| 23 | `marketing/pricing-page-copy.md` | Marketing |
| 24 | `qa/beta-checklist.md` | Shared |
| 25 | `product/toeic/acceptance-toeic.md` | TOEIC |

### Phase 1 Later (Post-Launch)

| # | File | Feature |
|---|---|---|
| 26 | `product/writing/prd-writing.md` | Writing |
| 27 | `product/business/prd-business.md` | Business |
| 28 | `product/interview/prd-interview.md` | Interview |

---

## 6. File Naming Conventions

| Pattern | Example | Use |
|---|---|---|
| `prd-{feature}.md` | `prd-speaking.md` | Product Requirements Document |
| `plan-{feature}.md` | `plan-toeic.md` | Epics, stories, timeline for one feature |
| `acceptance-{feature}.md` | `acceptance-speaking.md` | Launch checklist |
| `content-map-{feature}.md` | `content-map-toeic.md` | Content inventory |
| `tutor-{feature}-prompt.md` | `tutor-speaking-prompt.md` | AI system prompt |
| `ux-{feature}.md` | `ux-platform.md` | UX flows and wireframes |
| `tdd-{feature}.md` | `tdd-speaking.md` | Technical Design Doc |
| `test-plan-{feature}.md` | `test-plan-toeic.md` | QA test plan |

**Rules:**
- Lowercase, hyphen-separated
- Feature name matches product: `speaking`, `toeic`, `writing`, `business`, `interview`, `platform`
- No version numbers in filenames (use version inside the doc)
- One feature per folder under `product/`

---

## 7. Migration Notes

**Completed (2026-07-19):**

| Old path | Current canonical path |
|---|---|
| `docs/product/prd-lexora-speaking.md` | `docs/product/speaking/prd-speaking.md` (stub redirect kept) |

Cross-links updated. See [`REVIEW-SIGNOFF.md`](../REVIEW-SIGNOFF.md).

---

## 8. Summary Matrix

| Feature | Phase | PRD | Plan | Content | AI Prompt | UX | TDD | QA | Acceptance |
|---|---|---|---|---|---|---|---|---|---|
| **Platform** | P0 | ✅ | ✅ | — | — | ✅ | ✅ | ✅ | ✅ |
| **Speaking** | P0 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **TOEIC** | P0 | ✅ | ✅ | 🔲 | 🔲 | 🔲 | 🔲 | 🔲 | 🔲 |
| **Writing** | P1 | 🔲 | 🔲 | — | 🔲 | 🔲 | 🔲 | 🔲 | 🔲 |
| **Business** | P2 | 🔲 | 🔲 | 🔲 | 🔲 | 🔲 | — | 🔲 | — |
| **Interview** | P2 | 🔲 | 🔲 | 🔲 | 🔲 | 🔲 | — | 🔲 | — |
| **Kids** | Future | 🔜 | — | — | — | — | — | — | — |
| **Schools** | Future | 🔜 | — | — | — | — | — | — | — |
| **Enterprise** | Future | 🔜 | — | — | — | — | — | — | — |

**Counts:** 27 done · 13 to create · 3 future

**Still to create (P0/P1 blockers):** TOEIC content map, TOEIC TDD, TOEIC UX, TOEIC QA, TOEIC acceptance

---

## 9. References

| Document | Link |
|---|---|
| Doc hub | [`../README.md`](../README.md) |
| Final review | [`../REVIEW-SIGNOFF.md`](../REVIEW-SIGNOFF.md) |
| Brand & Requirements | [`brand.md`](brand.md) |
| Master plan | [`master-plan.md`](master-plan.md) |
| Phase 1–3 tasks (MVP) | [`phases/phase-1-mvp-launch.md`](phases/phase-1-mvp-launch.md) |
| Phase 1 Platform | [`phases/phase-1-platform.md`](phases/phase-1-platform.md) |
| Phase 2 Speaking | [`phases/phase-2-speaking.md`](phases/phase-2-speaking.md) |
| Phase 3 Launch | [`phases/phase-3-toeic-launch.md`](phases/phase-3-toeic-launch.md) |
| Phase 1 sprint detail (archive) | [`plan-phase1-breakdown.md`](plan-phase1-breakdown.md) |
| Feature catalog | [`feature-catalog.md`](feature-catalog.md) |
| PRD — Speaking | [`speaking/prd-speaking.md`](speaking/prd-speaking.md) |
| System Prompts | [`../AI/system-prompts.md`](../AI/system-prompts.md) |
