# Phase 3 — TOEIC, Beta & Public Launch

**Version:** 1.0  
**Duration:** 8 weeks (Sprints 7–10) · **Weeks 15–22**  
**Gate:** **M3** (beta) → **M4** (TOEIC) → **M5** (public launch)  
**Tasks:** P1-T061–P1-T087, P1-T103, P1-T095–P1-T098  
**Rules:** [`development-rules.md`](../../engineering/development-rules.md) · **One task = one commit**

> **Previous name:** Stage 1C of old monolithic "Phase 1 MVP Launch". Task IDs unchanged (`P1-T*`).

**Prerequisite:** Phase 2 complete (M2) — Speaking MVP live in staging.

**Next phase:** [`phase-4-native-scale.md`](phase-4-native-scale.md) — after M5 + retention gate

---

## Objectives

1. Closed beta (50 learners) — M3 gate
2. Lexora TOEIC (diagnostic + 1 full mock + explain-why) — M4
3. Production payments, deploy, marketing — M5 public launch 🚀

---

## Sprint 7 (Week 15–16) — Closed Beta

| ID | Task | Owner | Status |
|---|---|---|---|
| P1-T061 | Recruit 50 beta learners | PM | ⬜ |
| P1-T062 | Beta feedback form (rating + NPS) | PM | ⬜ |
| P1-T063 | Monitor completion rate daily | PM | ⬜ |
| P1-T064 | Fix P0 bugs from beta | Dev | ⬜ |
| P1-T065 | Speech accuracy review (100 VN samples) | AI Dev | ⬜ |
| P1-T066 | Beta report + go/no-go recommendation | PM | ⬜ |

**Beta gate (M3):** Completion ≥60%, rating ≥3.8/5.

---

## Sprint 8 (Week 17–18) — TOEIC MVP

| ID | Task | Owner | Pts | Status |
|---|---|---|---|---|
| P1-T067 | Finalize TOEIC content-map | PM | — | ✅ |
| P1-T068 | `lib/modules/toeic` scaffold | Dev | 3 | ✅ |
| P1-T069 | TOEIC diagnostic test (L+R subset) | Dev | 8 | ✅ |
| P1-T070 | Question bank seed (500 questions) | Content + Dev | 8 | ✅ |
| P1-T071 | Mock exam module (1 full test) | Dev | 13 | ✅ |
| P1-T072 | Score report + explain-why on wrong answers | AI Dev | 8 | ✅ |
| P1-T073 | TOEIC dashboard integration | Dev | 5 | ⬜ |
| P1-T074 | AI tutor prompt — TOEIC | AI Dev | 3 | ⬜ |
| P1-T075 | Bug fixes from beta | Dev | — | ⬜ |
| P1-T103 | TOEIC E2E smoke (Playwright) | QA + Dev | 5 | ⬜ |

**Demo:** Complete 1 TOEIC mock exam with score report; TOEIC E2E in CI.

---

## Sprint 9 (Week 19–20) — Open Beta & Payments

| ID | Task | Owner | Status |
|---|---|---|---|
| P1-T076 | Payment go-live (MoMo, VNPay, cards) | Dev | ⬜ |
| P1-T077 | Marketing landing page (Vietnamese) | PM + Dev | ⬜ |
| P1-T078 | Pricing page copy | PM | ⬜ |
| P1-T079 | Open beta — 500 users | PM | ⬜ |
| P1-T080 | Performance hardening (2K concurrent) | Architect | ⬜ |
| P1-T081 | Security review (auth, payments, AI) | Architect | ⬜ |
| P1-T095 | Production deploy (Vercel + Atlas prod) | DevOps | ⬜ |
| P1-T096 | Domain DNS + SSL (lexora.ai) | DevOps | ⬜ |
| P1-T098 | MongoDB Atlas backup + restore policy | DevOps | ⬜ |
| P1-T082 | Launch checklist — beta-checklist.md | QA | ⬜ |

---

## Sprint 10 (Week 21–22) — Public Launch

| ID | Task | Owner | Status |
|---|---|---|---|
| P1-T083 | Public launch 🚀 | PM | ⬜ |
| P1-T084 | Monitor errors + latency (48h war room) | Full team | ⬜ |
| P1-T085 | Post-launch 30-day metric dashboard | PM | ⬜ |
| P1-T086 | Release notes v1.0 | PM | ⬜ |
| P1-T087 | Retrospective + Phase 4 planning | PM | ⬜ |

---

## Infrastructure (this phase)

| ID | Task | Sprint | Owner |
|---|---|---|---|
| P1-T095 | Production deploy | 9 | DevOps |
| P1-T096 | Domain + SSL | 9 | DevOps |
| P1-T098 | DB backup policy | 9 | DevOps |

---

## Exit Criteria (M5 — Public Launch)

- [ ] Speaking + TOEIC live in production
- [ ] Payments working (MoMo, VNPay, cards)
- [ ] No open P0 bugs
- [ ] Session completion ≥70%
- [ ] 30-day retention tracking active

---

## Full MVP Sprint Calendar

| Sprint | Weeks | Phase | Demo |
|---|---|---|---|
| 0 | 1–2 | Phase 0 | Feasibility + wireframes |
| 1–3 | 3–8 | **Phase 1** Platform | Auth → dashboard → mic + MoMo |
| 4–6 | 9–14 | **Phase 2** Speaking | Conversation → scores → E2E |
| 7–10 | 15–22 | **Phase 3** Launch | Beta → TOEIC → go-live |

---

## References

| Document | Link |
|---|---|
| TOEIC PRD | [`../toeic/prd-toeic.md`](../toeic/prd-toeic.md) |
| Beta checklist | [`../../qa/beta-checklist.md`](../../qa/beta-checklist.md) |
| Previous phase | [`phase-2-speaking.md`](phase-2-speaking.md) |
| Next phase | [`phase-4-native-scale.md`](phase-4-native-scale.md) |
