# Phase 5 Backlog Planning

**Task:** P1C-T22  
**Version:** 1.0  
**Last Updated:** 2026-07-19  
**Owner:** PM

---

## Overview

Phase 5 focuses on **growth**: new products (Writing, Business, Interview), B2B pilots, exam expansion, and retention features.

**Gate:** M8 (10 center pilots) · M9 (50K MAL)  
**Plan:** [`phases/phase-5-growth.md`](phases/phase-5-growth.md)

---

## Sprint Themes (Months 7–12)

| Sprint | Theme | Key deliverables |
|---|---|---|
| 15–16 | Lexora Writing | Editor, grammar correction, scores, dashboard |
| 17–18 | Lexora Business | Scenario role-play, formal tone tutor |
| 19–20 | B2B lite | Center admin, assignments, teacher dashboard |
| 21–22 | Exam expansion | TOEIC lessons, IELTS diagnostic, multiple mocks |
| 23–24 | Growth & retention | Streaks v2, referral v1, SEO, NPS |

---

## Priority Stack

| Priority | Items |
|---|---|
| P0 | Writing module (P2-T01–T07), B2B admin lite (P2-T20–T22) |
| P1 | Business module, IELTS diagnostic, gamification (P2-T27) |
| P2 | Interview module, K8s migration (if MAL > 50K), self-hosted LLM prod |

---

## Dependencies from Phase 4

| Phase 4 output | Phase 5 use |
|---|---|
| ai-gateway-service | Writing/Business LLM prompts |
| Expo mobile app | Writing + Business on native |
| Daily challenge | Extend to streak + daily goals (P2-T27) |
| Referral v0.1 | Upgrade to v1 with rewards (P2-T28) |

---

## Resource Assumptions

| Role | FTE |
|---|---|
| Dev | 2 |
| AI Dev | 1 |
| PM + Content | 1 |
| QA | 0.5 |

---

## Risks

| Risk | Mitigation |
|---|---|
| B2B sales cycle slow | Start center outreach in Sprint 15 |
| Writing LLM cost | Route via ai-gateway + LiteLLM |
| Content quality | Hire reviewer before 100+ TOEIC lessons |

---

## Entry Checklist (Phase 5)

- [x] Phase 4 complete (native app + ai-gateway)
- [ ] 30-day retention ≥35% (or PM override)
- [ ] No P0 bugs 14 days
- [ ] Unit economics reviewed

---

## References

- [`master-plan.md`](master-plan.md)
- [`phase-3-retrospective-phase-4-planning.md`](phase-3-retrospective-phase-4-planning.md)
- [`phases/phase-6-scale-sea.md`](phases/phase-6-scale-sea.md)
