# Beta Go / No-Go Report Template

**Task:** P1-T066  
**Version:** 1.0  
**Last Updated:** 2026-07-19  
**Owner:** PM

---

## Report Metadata

| Field | Value |
|---|---|
| Beta period | YYYY-MM-DD → YYYY-MM-DD |
| Cohort size (activated) | |
| Report author | |
| Review date | |
| Recommendation | **GO** / **NO-GO** / **EXTEND 2 WEEKS** |

---

## 1. Executive Summary

_(3–5 sentences: overall beta health, key wins, blockers)_

---

## 2. Gate Metrics

| Metric | Threshold | Actual | Pass? |
|---|---|---|---|
| Session completion rate | ≥60% | | ☐ |
| Feedback usefulness | ≥3.8/5 | | ☐ |
| Open P0 bugs | 0 | | ☐ |
| Speech WER (VN accent) | ≤15% | | ☐ |
| NPS (exit survey) | ≥30 | | ☐ |

**Overall gate:** ☐ PASS ☐ FAIL

---

## 3. Engagement Summary

| Metric | Value |
|---|---|
| Total sessions started | |
| Total sessions completed | |
| Avg sessions per learner | |
| Avg session duration (min) | |
| Onboarding completion rate | |

---

## 4. Qualitative Feedback Themes

### Positive

1.
2.
3.

### Negative / Friction

1.
2.
3.

---

## 5. Bug Summary

| Severity | Open | Fixed during beta |
|---|---|---|
| P0 | | |
| P1 | | |
| P2 | | |

**Top 3 issues:**

1.
2.
3.

---

## 6. Speech & AI Quality

| Metric | Result |
|---|---|
| Mean WER (100 VN samples) | |
| AI latency p95 | |
| Summary generation p95 | |
| Guardrail incidents | |

_(Link: [`speech-accuracy-review-vn.md`](speech-accuracy-review-vn.md))_

---

## 7. Recommendation

### If GO

- Proceed to Sprint 8 TOEIC development
- Open beta target date: ___
- Pre-requisites: P0 fixes merged (P1-T075)

### If EXTEND

- Extension reason: ___
- Additional metrics to hit: ___
- Re-review date: ___

### If NO-GO

- Blockers: ___
- Required fixes before re-beta: ___

---

## 8. Sign-off

| Role | Name | Decision | Date |
|---|---|---|---|
| PM | | ☐ Approve ☐ Reject | |
| QA | | ☐ Approve ☐ Reject | |
| Architect | | ☐ Approve ☐ Reject | |
| Tech Lead | | ☐ Approve ☐ Reject | |

---

## References

| Document | Link |
|---|---|
| Beta checklist | [`../../qa/beta-checklist.md`](../../qa/beta-checklist.md) |
| Completion monitoring | [`beta-completion-monitoring.md`](beta-completion-monitoring.md) |
| Phase 3 plan | [`../phases/phase-3-toeic-launch.md`](../phases/phase-3-toeic-launch.md) |
