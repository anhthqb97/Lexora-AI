# Plan — Lexora Speaking

> **Canonical execution plan:** [`../phases/phase-1-mvp-launch.md`](../phases/phase-1-mvp-launch.md) (tasks P1-T029–P1-T060)
>
> This file lists feature epics only. Use phase plan for task IDs and commits.

**Feature:** Lexora Speaking
**Version:** 1.0
**Sprints:** 4–6 (Week 9–14)
**Last Updated:** 2026-07-19

**Depends on:** Platform Stage 1 complete (auth, AI gateway, speech engine)

---

## Timeline

| Sprint | Weeks | Focus | Demo |
|---|---|---|---|
| 4 | 9–10 | Session setup, conversation loop | Speak → AI responds |
| 5 | 11–12 | Speech evaluation (5 dimensions) | Scores returned |
| 6 | 13–14 | Summary, dashboard, polish | End-to-end session |

---

## Epic E6: Session Management

| ID | Story | PRD | Points | Sprint |
|---|---|---|---|---|
| E6-01 | Start session from dashboard (one tap) | SP-01, FR-01 | 5 | 4 |
| E6-02 | Session type selection | SP-02, FR-02 | 5 | 4 |
| E6-03 | Duration picker (5/10/15/20 min) | FR-03 | 3 | 4 |
| E6-04 | Free-tier limit enforcement | FR-05 | 3 | 4 |
| E6-05 | Mic permission + voice consent | NFR-08 | 5 | 4 |
| E6-06 | Session resume after interrupt | FR-04 | 5 | 6 |

---

## Epic E7: Live Conversation Loop

| ID | Story | PRD | Points | Sprint |
|---|---|---|---|---|
| E7-01 | AI greeting + opening question | SP-03, FR-06 | 5 | 4 |
| E7-02 | Speak → transcribe → AI respond loop | FR-07, FR-13 | 13 | 4 |
| E7-03 | AI follow-up questions | FR-08 | 5 | 5 |
| E7-04 | Dynamic level adaptation (A1–C1) | SP-07, FR-09 | 8 | 5 |
| E7-05 | No exam answers without teaching | FR-11 | 3 | 5 |
| E7-06 | Inline gentle corrections | FR-10 | 5 | 6 |
| E7-07 | Vietnamese help toggle | FR-12 | 5 | 6 |

---

## Epic E8: Speech Evaluation

| ID | Story | PRD | Points | Sprint |
|---|---|---|---|---|
| E8-01 | Pronunciation scoring | FR-14 | 8 | 5 |
| E8-02 | Fluency scoring | FR-15 | 5 | 5 |
| E8-03 | Grammar scoring | FR-16 | 5 | 5 |
| E8-04 | Vocabulary scoring | FR-17 | 5 | 5 |
| E8-05 | Confidence score | FR-18 | 3 | 5 |
| E8-06 | Top 3 improvement areas | FR-19 | 3 | 5 |
| E8-07 | Vietnamese-accent tuning | FR-20 | 8 | 5 |

---

## Epic E9: Feedback & Summary

| ID | Story | PRD | Points | Sprint |
|---|---|---|---|---|
| E9-01 | Post-session explain-why summary | SP-04/05, FR-21–23 | 8 | 6 |
| E9-02 | Summary UI (scores, highlights) | SP-06 | 5 | 6 |
| E9-03 | Retry flagged phrases | SP-08 | 5 | 6 |
| E9-04 | Session end encouragement | — | 3 | 6 |
| E9-05 | Audio replay with correction | FR-24 | 8 | 6 |

---

## Epic E10: Progress & Dashboard

| ID | Story | PRD | Points | Sprint |
|---|---|---|---|---|
| E10-01 | Session count + practice time | FR-26 | 3 | 6 |
| E10-02 | Score trend charts (7/30/90 days) | SP-11, FR-27 | 5 | 6 |
| E10-03 | Recurring error patterns | FR-28 | 8 | 6 |
| E10-04 | Recommended next topics | FR-29 | 5 | 6 |

---

## Epic E11: Content Library

| ID | Story | Points | Sprint |
|---|---|---|---|
| E11-01 | 10 topics (see content-map) | 3 | 4 |
| E11-02 | 5 scenarios (see content-map) | 3 | 4 |
| E11-03 | TOEIC speaking prompts (P1) | 5 | 6 |

---

## Exit Criteria

See [`acceptance-speaking.md`](acceptance-speaking.md).

---

## References

| Document | Link |
|---|---|
| PRD | [`prd-speaking.md`](prd-speaking.md) |
| Content Map | [`content-map-speaking.md`](content-map-speaking.md) |
| UX | [`../../design/ux-speaking.md`](../../design/ux-speaking.md) |
| TDD | [`../../engineering/tdd-speaking.md`](../../engineering/tdd-speaking.md) |
