# Phase 3 Retrospective & Phase 4 Planning

**Task:** P1-T087  
**Version:** 1.0  
**Last Updated:** 2026-07-19  
**Owner:** PM

---

## 1. Phase 3 Summary

**Duration:** Sprints 7–10 (Weeks 15–22)  
**Gates:** M3 Beta → M4 TOEIC → M5 Public Launch

### Delivered

| Area | Outcome |
|---|---|
| Closed beta | 50 learners, recruitment + feedback process |
| TOEIC MVP | Diagnostic, mock exam, score report, explain-why |
| Payments | MoMo, VNPay, Pro tier live |
| Launch | Production deploy, DNS, backup policy, runbooks |

---

## 2. Retrospective

### What went well 👍

| Item | Notes |
|---|---|
| Speaking module patterns | Accelerated TOEIC scaffold |
| Beta process docs | Clear M3 gate metrics |
| commit-tree discipline | One task = one commit maintained |

### What could improve 👎

| Item | Action for Phase 4 |
|---|---|
| Question content quality | Hire content reviewer; reduce generated variants |
| E2E auth setup | Playwright storage state for logged-in flows |
| Load test earlier | Run 2K test before open beta, not after |

### Metrics vs targets

| Metric | Target | Actual | Met? |
|---|---|---|---|
| Beta completion | ≥60% | _TBD_ | ☐ |
| Launch completion | ≥70% | _TBD_ | ☐ |
| 30-day retention | ≥30% | _TBD_ | ☐ |
| Paid conversion | ≥8% | _TBD_ | ☐ |

---

## 3. Phase 4 Planning Preview

See [`phases/phase-4-native-scale.md`](phases/phase-4-native-scale.md).

### Proposed themes (Sprints 11–14)

| Theme | Priority |
|---|---|
| React Native iOS + Android apps | P0 |
| Business English module | P1 |
| TOEIC content expansion (1000+ Q) | P1 |
| Push notifications + offline mode | P2 |

### Retention gate (enter Phase 4)

- [ ] M5 launch complete
- [ ] 30-day retention ≥30%
- [ ] No open P0 for 14 days
- [ ] Unit economics reviewed

---

## 4. Action Items

| # | Action | Owner | Due |
|---|---|---|---|
| 1 | Fill retrospective metrics | PM | Launch +30d |
| 2 | Phase 4 sprint planning | PM + TL | Week 23 |
| 3 | Mobile spike (RN) | Architect | Sprint 11 |
| 4 | Content bank QA | Content | Sprint 11 |

---

## 5. Team Shout-outs

_(Add names after launch)_

---

## References

| Document | Link |
|---|---|
| Phase 3 plan | [`phase-3-toeic-launch.md`](phases/phase-3-toeic-launch.md) |
| Phase 4 plan | [`phase-4-native-scale.md`](phases/phase-4-native-scale.md) |
| Master plan | [`master-plan.md`](master-plan.md) |
