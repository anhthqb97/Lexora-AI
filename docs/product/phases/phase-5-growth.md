# Phase 5 — Growth

**Version:** 1.0  
**Duration:** 6 months  
**Gate:** **M8** — 10 English center pilots; **M9** — 50K MAL  
**Tasks:** P2-T01–P2-T32  
**Rules:** [`development-rules.md`](../../engineering/development-rules.md) · Commit: `P2-T01: description`

> **Previous name:** Phase 2. Task prefix unchanged (`P2-T*`).

---

## Objectives

1. Launch Lexora Writing and Business
2. B2B pilot with English centers (Lexora for Schools lite)
3. Add IELTS / TOEFL content modules
4. Scale infrastructure (partial microservices, K8s if MAL > 50K)
5. Gamification and retention features

---

## Product Tasks

### Lexora Writing (P1 — Month 1–2)

| ID | Task | Owner | Status |
|---|---|---|---|
| P2-T01 | PRD Writing finalization | PM | ✅ |
| P2-T02 | `lib/modules/writing` — editor + submission | Dev | ✅ |
| P2-T03 | Grammar correction + explain-why (LLM) | AI Dev | ✅ |
| P2-T04 | Writing evaluation scores | AI Dev | ✅ |
| P2-T05 | Writing history + dashboard | Dev | ✅ |
| P2-T06 | AI tutor prompt — Writing | AI Dev | ✅ |
| P2-T07 | QA test plan — Writing | QA | ✅ |

### Lexora Business (P2 — Month 2–3)

| ID | Task | Owner | Status |
|---|---|---|---|
| P2-T08 | PRD Business finalization | PM | ✅ |
| P2-T09 | Business scenario content-map (meetings, emails) | PM + Content | ✅ |
| P2-T10 | Scenario role-play module (reuse speaking infra) | Dev | ✅ |
| P2-T11 | Formal tone AI tutor prompt | AI Dev | ✅ |

### Lexora Interview (P2 — Month 3–4)

| ID | Task | Owner | Status |
|---|---|---|---|
| P2-T12 | PRD Interview finalization | PM | ✅ |
| P2-T13 | Mock interview flow (timed Q&A) | Dev | ✅ |
| P2-T14 | Industry question banks (IT, hospitality) | Content | ✅ |

### TOEIC / Exam Expansion (Month 2–4)

| ID | Task | Owner | Status |
|---|---|---|---|
| P2-T15 | Full TOEIC lesson library (100+ lessons) | Content + Dev | ✅ |
| P2-T16 | Multiple mock exams (3+ forms) | Dev | ✅ |
| P2-T17 | IELTS diagnostic module | Dev | ✅ |
| P2-T18 | TOEFL content stub | PM | ✅ |

---

## Platform & B2B Tasks

| ID | Task | Owner | Status |
|---|---|---|---|
| P2-T19 | Extract billing-service (microservice) | Architect | ✅ |
| P2-T20 | English center admin portal (lite) | Dev | ✅ |
| P2-T21 | Student assignment (speaking homework) | Dev | ✅ |
| P2-T22 | Teacher progress dashboard | Dev | ✅ |
| P2-T23 | Recruit 10 center pilots | PM | ✅ |
| P2-T24 | Center onboarding playbook | PM | ✅ |
| P2-T25 | Kubernetes migration (if MAL > 50K) | DevOps | ✅ |
| P2-T26 | Self-hosted LLM production (if ADR trigger met) | AI Dev | ✅ |

---

## Growth & Retention Tasks

| ID | Task | Owner | Status |
|---|---|---|---|
| P2-T27 | Streak + daily goals gamification | Dev | ⬜ |
| P2-T28 | Referral program v1 (invite friends) | Dev | ⬜ |
| P2-T29 | Email/push re-engagement campaigns | PM + Dev | ⬜ |
| P2-T30 | Advanced analytics (cohorts, funnels) | PM | ⬜ |
| P2-T31 | NPS survey in-app | PM | ⬜ |
| P2-T32 | SEO landing pages (TOEIC, Speaking keywords) | PM + Dev | ⬜ |

---

## Exit Criteria (M8, M9)

- [ ] Writing + Business live on web + native
- [ ] 10 English centers in active pilot
- [ ] 50,000 MAL
- [ ] NPS ≥45
- [ ] Paid conversion ≥8%
- [ ] IELTS module available

---

## Success Metrics (Phase 5 end)

| Metric | Target |
|---|---|
| MAL | 50,000 |
| Weekly active rate | ≥40% of MAL |
| B2B centers | 10 pilots |
| Products live | Speaking, TOEIC, Writing, Business, Interview |

---

## Next Phase

→ [`phase-6-scale-sea.md`](phase-6-scale-sea.md)
