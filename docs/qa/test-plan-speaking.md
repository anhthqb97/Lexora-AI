# Test Plan — Lexora Speaking

**Feature:** Lexora Speaking
**Version:** 1.0
**Last Updated:** 2026-07-19

Mapped to PRD requirements FR-*, SP-*, NFR-*.

---

## 1. Session Management

| ID | Req | Test case | Expected |
|---|---|---|---|
| TS-S01 | FR-01 | Start session from dashboard | Setup screen ≤2s |
| TS-S02 | FR-02 | Select Free Talk | Session starts with open topic |
| TS-S03 | FR-02 | Select Topic + Travel | AI opener about travel |
| TS-S04 | FR-02 | Select Scenario Restaurant | Role-play as waiter |
| TS-S05 | FR-03 | Set 5 min duration | Timer shows 5:00 |
| TS-S06 | FR-05 | Free user 4th session/week | Paywall shown |
| TS-S07 | NFR-08 | First session | Consent modal before mic |
| TS-S08 | FR-04 | Drop connection mid-session | Resume within 30 min (P1) |

---

## 2. Conversation Loop

| ID | Req | Test case | Expected |
|---|---|---|---|
| TS-C01 | FR-06 | Session start | AI greeting + opening question |
| TS-C02 | FR-07 | Speak 10 sec utterance | Transcript + AI response |
| TS-C03 | FR-08 | Short answers | AI asks follow-up to extend |
| TS-C04 | FR-09 | A1 learner | AI uses simple vocabulary |
| TS-C05 | FR-09 | B2 learner | AI uses complex topics |
| TS-C06 | FR-11 | Ask for TOEIC answer without attempt | AI guides, does not give answer |
| TS-C07 | NFR-02 | Measure latency 20 turns | ≤3s p95 |
| TS-C08 | FR-12 | Enable Vietnamese help | VI hint then back to EN (P1) |

---

## 3. Speech Evaluation

| ID | Req | Test case | Expected |
|---|---|---|---|
| TS-E01 | FR-13 | Clear speech | Accurate transcript |
| TS-E02 | FR-14 | Mispronounced word | Pronunciation score reflects error |
| TS-E03 | FR-15 | Many filler words | Fluency score lower |
| TS-E04 | FR-16 | Grammar error | Grammar score reflects error |
| TS-E05 | FR-17 | Limited vocabulary | Vocabulary score lower |
| TS-E06 | FR-18 | Full session | Confidence score generated |
| TS-E07 | FR-19 | Session end | Top 3 focus areas listed |
| TS-E08 | FR-20 | VN-accent sample set (n=20) | WER ≤15% |
| TS-E09 | NFR-03 | Evaluation timing | ≤5s p95 |

---

## 4. Summary & Feedback

| ID | Req | Test case | Expected |
|---|---|---|---|
| TS-F01 | FR-21 | View summary | All 5 dimension scores shown |
| TS-F02 | FR-22 | Check feedback | Examples from actual session |
| TS-F03 | FR-23 | Each correction | Original + improved + reason |
| TS-F04 | SP-08 | Retry phrase | Mini practice with feedback |
| TS-F05 | — | Summary load time | ≤10s after session end |

---

## 5. Progress

| ID | Req | Test case | Expected |
|---|---|---|---|
| TS-P01 | FR-26 | Dashboard | Session count + total time |
| TS-P02 | FR-27 | After 5 sessions | Trend chart visible (P1) |

---

## 6. Error & Edge Cases

| ID | Test case | Expected |
|---|---|---|
| TS-X01 | Mic permission denied | Instructions + text fallback |
| TS-X02 | Silence 10 sec | Prompt to speak again |
| TS-X03 | AI service down | Friendly error + retry |
| TS-X04 | Session timer expires | Graceful end + summary |
| TS-X05 | Inappropriate input | Redirect per guardrails |

---

## 7. E2E Smoke (Release Gate)

1. Register → onboard → dashboard
2. Start Speaking → consent → 5 min session
3. Complete 3+ conversation turns
4. End session → summary with scores
5. Verify dashboard updated
6. Free limit → paywall on 4th session

**Pass:** All steps without manual intervention on iOS Safari + Android Chrome.

---

## References

| Document | Link |
|---|---|
| PRD | [`../product/speaking/prd-speaking.md`](../product/speaking/prd-speaking.md) |
| Acceptance | [`../product/speaking/acceptance-speaking.md`](../product/speaking/acceptance-speaking.md) |
| Guardrails | [`../AI/guardrails.md`](../AI/guardrails.md) |
| E2E automation | [`test-automation-e2e.md`](test-automation-e2e.md) — P1-T102 implements §7 |

---

## Approval (P0-T10)

| Role | Date | Status |
|---|---|---|
| QA Lead | 2026-07-19 | ✅ Approved |

**Coverage:** Test cases mapped to Speaking PRD FR-*, SP-*, NFR-*. Mock speech provider path included for local/CI (P0-T02).
