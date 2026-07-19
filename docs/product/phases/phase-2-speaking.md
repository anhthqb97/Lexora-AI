# Phase 2 — Speaking MVP

**Version:** 1.0  
**Duration:** 6 weeks (Sprints 4–6) · **Weeks 9–14**  
**Gate:** **M2** — Speaking E2E, QA sign-off  
**Tasks:** P1-T029–P1-T060, P1-T102  
**Rules:** [`development-rules.md`](../../engineering/development-rules.md) · **One task = one commit**

> **Previous name:** Stage 1B of old monolithic "Phase 1 MVP Launch". Task IDs unchanged (`P1-T*`).

**Prerequisite:** Phase 1 complete (M1) — auth, AI pipeline, speech STT live.

**Next phase:** [`phase-3-toeic-launch.md`](phase-3-toeic-launch.md)

---

## Objectives

1. Full Lexora Speaking session loop (setup → live → summary)
2. Five-dimension evaluation (pronunciation, fluency, grammar, vocabulary, confidence)
3. Free-tier limits (3 sessions/week)
4. Dashboard progress + Speaking E2E in CI

---

## Sprint 4 (Week 9–10) — Session Core

| ID | Task | Owner | Pts | Status |
|---|---|---|---|---|
| P1-T029 | `lib/modules/speaking` scaffold | Dev | 3 | ✅ |
| P1-T030  Speaking Home page | Dev | 3 | ✅ |
| P1-T031  Session setup (type, topic, duration) | Dev | 5 | ✅ |
| P1-T032  Voice consent modal + logging | Dev | 5 | ✅ |
| P1-T033  Free-tier limit enforcement (3/week) | Dev | 3 | ✅ |
| P1-T034  Live session UI (mic, waveform, timer) | Dev | 8 | ✅ |
| P1-T035  AI greeting + opening question | AI Dev | 5 | ✅ |
| P1-T036  Speak → transcribe → AI respond loop | AI Dev | 13 | ✅ |
| P1-T037 | Topic library (10 topics) — content-map | PM + Dev | 3 | ⬜ |
| P1-T038 | Scenario library (5 scenarios) | PM + Dev | 3 | ⬜ |

**Demo:** Full conversation loop in staging.

---

## Sprint 5 (Week 11–12) — Evaluation

| ID | Task | Owner | Pts | Status |
|---|---|---|---|---|
| P1-T039 | Pronunciation scoring per turn | AI Dev | 8 | ⬜ |
| P1-T040 | Fluency scoring (pace, fillers) | AI Dev | 5 | ⬜ |
| P1-T041 | Grammar scoring | AI Dev | 5 | ⬜ |
| P1-T042 | Vocabulary scoring | AI Dev | 5 | ⬜ |
| P1-T043 | Confidence score aggregation | AI Dev | 3 | ⬜ |
| P1-T044 | Top 3 improvement areas | AI Dev | 3 | ⬜ |
| P1-T045 | VN-accent tuning / validation | AI Dev | 8 | ⬜ |
| P1-T046 | AI follow-up questions | AI Dev | 5 | ⬜ |
| P1-T047 | Dynamic level adaptation (A1–C1) | AI Dev | 8 | ⬜ |
| P1-T048 | Exam-answer guardrail | AI Dev | 3 | ⬜ |

**Demo:** 5-dimension scores returned after session.

---

## Sprint 6 (Week 13–14) — Summary & Polish

| ID | Task | Owner | Pts | Status |
|---|---|---|---|---|
| P1-T049 | Post-session explain-why summary (LLM) | AI Dev | 8 | ⬜ |
| P1-T050 | Summary UI (scores, highlights) | Dev | 5 | ⬜ |
| P1-T051 | Retry flagged phrases flow | Dev | 5 | ⬜ |
| P1-T052 | Session end encouragement message | AI Dev | 3 | ⬜ |
| P1-T053 | Dashboard: session count + practice time | Dev | 3 | ⬜ |
| P1-T054 | Speaking progress on dashboard | Dev | 3 | ⬜ |
| P1-T055 | Inline gentle corrections (P1) | AI Dev | 5 | ⬜ |
| P1-T056 | Vietnamese help toggle (P1) | Dev | 5 | ⬜ |
| P1-T057 | Session resume after interrupt (P1) | Dev | 5 | ⬜ |
| P1-T058 | Score trend charts 7/30/90d (P1) | Dev | 5 | ⬜ |
| P1-T102 | Speaking E2E smoke automated (Playwright) | QA + Dev | 8 | ⬜ |
| P1-T059 | QA verify E2E suite + mobile spot check | QA | 3 | ⬜ |
| P1-T060 | Load test: 500 concurrent sessions | Architect | 3 | ⬜ |

**Demo:** End-to-end session + summary + dashboard.

---

## Exit Criteria (M2)

- [ ] 5-min session on mobile browser (iOS + Android)
- [ ] All 5 evaluation dimensions scored
- [ ] Summary ≤10s after session end
- [ ] Free-tier limits enforced
- [ ] Speaking E2E smoke green in CI
- [ ] QA sign-off on P0 tests

---

## References

| Document | Link |
|---|---|
| Speaking PRD | [`../speaking/prd-speaking.md`](../speaking/prd-speaking.md) |
| Speaking TDD | [`../../engineering/tdd-speaking.md`](../../engineering/tdd-speaking.md) |
| Speaking UX | [`../../design/ux-speaking.md`](../../design/ux-speaking.md) |
| E2E spec | [`../../qa/test-automation-e2e.md`](../../qa/test-automation-e2e.md) |
| Previous phase | [`phase-1-platform.md`](phase-1-platform.md) |
| Next phase | [`phase-3-toeic-launch.md`](phase-3-toeic-launch.md) |
