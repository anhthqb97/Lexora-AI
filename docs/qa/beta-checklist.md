# Beta & Launch Checklist — Lexora AI

**Version:** 1.0
**Last Updated:** 2026-07-19

Cross-feature gates for closed beta, open beta, and public launch.

---

## 1. Closed Beta (50 learners, Week 13–14)

### Pre-beta

- [ ] Speaking MVP acceptance checklist complete
- [ ] Platform acceptance checklist complete
- [ ] Staging environment stable 7 days
- [ ] Beta feedback form ready (Google Form or in-app)
- [ ] 50 learners recruited (30 students, 20 professionals)

### During beta

- [ ] Monitor session completion rate daily
- [ ] Monitor AI latency and error rates
- [ ] Collect feedback usefulness rating (1–5)
- [ ] Triage P0 bugs within 24h

### Beta exit gate

| Metric | Threshold | Actual |
|---|---|---|
| Session completion rate | ≥60% | |
| Feedback usefulness | ≥3.8/5 | |
| P0 bugs open | 0 | |
| Speech WER (VN-accent) | ≤15% | |

**Decision:** Proceed to open beta / Extend beta 2 weeks / Fix and re-test

---

## 2. Open Beta (500 users, Week 17–18)

### Pre-open-beta

- [ ] Closed beta gate passed
- [ ] P0/P1 bugs from closed beta fixed
- [ ] Payment sandbox → production credentials
- [ ] MoMo + VNPay production tested
- [ ] Landing page live
- [ ] Analytics dashboards configured

### Open beta gate

| Metric | Threshold | Actual |
|---|---|---|
| Uptime | ≥99.5% | |
| Payment success rate | ≥85% | |
| Session completion | ≥65% | |
| Support tickets/day | <20 | |

---

## 3. Public Launch (Week 19–20)

### Launch criteria (all required)

**Platform**
- [ ] Auth: email, OTP, Google, Facebook
- [ ] Onboarding complete flow
- [ ] Payments live (MoMo, VNPay, cards)
- [ ] Dashboard loads ≤3s on 4G

**Speaking**
- [ ] 5-min session end-to-end on mobile
- [ ] 5 evaluation dimensions scored
- [ ] Summary ≤10s after session end
- [ ] Free tier limits enforced

**TOEIC (if launching together)**
- [ ] 1 diagnostic test completable
- [ ] 1 full mock exam with score report

**Quality**
- [ ] QA sign-off Platform + Speaking
- [ ] No open P0 bugs
- [ ] Guardrails tested (20 injection tests pass)
- [ ] Privacy policy + terms published (VI)

**Ops**
- [ ] Error monitoring live
- [ ] On-call rotation defined
- [ ] Rollback plan documented

---

## 4. Post-Launch (30 days)

| Metric | Target | Week 1 | Week 2 | Week 3 | Week 4 |
|---|---|---|---|---|---|
| MAL | ramp | | | | |
| Session completion | ≥70% | | | | |
| Feedback rating | ≥4.0/5 | | | | |
| 30-day retention | ≥30% | | | | |
| Paid conversion | ≥8% | | | | |
| NPS | ≥40 | | | | |

---

## 5. Sign-off

| Gate | PM | QA | Architect | Date |
|---|---|---|---|---|
| Closed beta start | [ ] | [ ] | [ ] | |
| Open beta start | [ ] | [ ] | [ ] | |
| Public launch | [ ] | [ ] | [ ] | |

---

## References

| Document | Link |
|---|---|
| Phase 1 Plan | [`../product/plan-phase1-breakdown.md`](../product/plan-phase1-breakdown.md) |
| Acceptance Speaking | [`../product/speaking/acceptance-speaking.md`](../product/speaking/acceptance-speaking.md) |
| Acceptance Platform | [`../product/platform/acceptance-platform.md`](../product/platform/acceptance-platform.md) |
