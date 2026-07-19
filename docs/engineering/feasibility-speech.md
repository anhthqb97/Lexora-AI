# Feasibility Memo — Speech Engine

**Feature:** Lexora Speaking
**Version:** 1.0
**Status:** Approved baseline — spike execution pending (P0-T02)
**Owner:** AI Engineer + System Architect
**Last Updated:** 2026-07-19

---

## 1. Objective

Evaluate speech-to-text (STT) and pronunciation assessment options for Vietnamese-accent English before Sprint 3.

**Decision required:** Build vs buy — Azure Speech recommended for MVP (see ADR-006).

**Architecture context:** [`architecture-decision-record.md`](architecture-decision-record.md)

---

## 2. Candidates

| Engine | STT | Pronunciation | VN-accent | Latency | Cost estimate |
|---|---|---|---|---|---|
| **Azure Speech** | ✅ | ✅ Pronunciation Assessment | Good (tunable) | ~1–2s | ~$1/1000 min |
| **Google Cloud STT** | ✅ | Limited | Good | ~1–2s | ~$0.96/1000 min |
| **OpenAI Whisper** | ✅ | ❌ (STT only) | Good | ~2–4s | Self-hosted variable |
| **ELSA API** | ✅ | ✅ | VN-focused | ~2s | Higher, competitor |

**Recommendation (proposed):** **Azure Speech Services** for MVP — STT + Pronunciation Assessment in one API, enterprise SLA, Southeast Asia regions.

---

## 3. Spike Test Plan

### 3.1 Sample set

- **100 audio clips** from Vietnamese English speakers
- Levels: 20 A1, 30 A2, 30 B1, 15 B2, 5 C1
- Content: read-aloud + spontaneous (30 sec each)
- Record on mobile (iOS Safari, Android Chrome) — real conditions

### 3.2 Metrics

| Metric | Pass threshold |
|---|---|
| STT word error rate (WER) | ≤15% |
| Pronunciation score correlation vs human rater | ≥0.75 |
| End-to-end latency (speech end → transcript) | ≤2s p95 |
| End-to-end latency (full evaluation) | ≤5s p95 |
| Uptime during 1-week trial | ≥99% |

### 3.3 Test procedure

1. Record 100 samples via test web app
2. Run through Azure Speech STT + Pronunciation Assessment
3. 2 human raters score same clips (1–10 pronunciation, fluency)
4. Compare AI vs human correlation
5. Measure latency from Vietnam (HCMC) to Azure SE Asia region

---

## 4. Proposed Architecture

```
Learner mic → WebRTC/MediaRecorder → Backend API
  → Azure Speech (STT + Pronunciation)
  → Transcript + scores → LLM Gateway (conversation)
  → Response → Frontend
```

**Audio storage (proposed):** Transcripts + scores only; raw audio deleted after 24h processing window.

---

## 5. Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| VN-accent WER >15% | Medium | High | Custom phrase lists; post-processing |
| Latency >5s on 4G | Medium | High | Streaming STT; edge region |
| Azure cost at scale | Low | Medium | Cache common phrases; batch where possible |
| Vendor lock-in | Medium | Low | Abstract behind SpeechProvider interface |

---

## 6. Cost Projection (Phase 1)

| Assumption | Value |
|---|---|
| Avg session length | 10 min |
| Sessions/month (10K MAL, 3/week) | ~120,000 |
| Speech minutes/month | ~1,200,000 |
| Azure cost (~$1/1000 min) | ~$1,200/month |

Acceptable if LTV:CAC ≥6:1 per brand targets.

---

## 7. Decision Log

| # | Question | Proposed answer | Status |
|---|---|---|---|
| 1 | Engine choice | Azure Speech | ✅ Approved (ADR-006) |
| 2 | Raw audio storage | No — transcript + scores only | ✅ Approved |
| 3 | Fallback if mic fails | Text input mode | ✅ Approved |
| 4 | Region | Azure Southeast Asia | ⏳ Confirm in spike |

---

## 8. Next Steps

- [ ] Execute spike with 100 VN-accent samples
- [ ] Legal review audio retention policy
- [ ] Architect sign-off on SpeechProvider abstraction
- [ ] Update [`tdd-speaking.md`](tdd-speaking.md) with final decision

---

## References

| Document | Link |
|---|---|
| PRD Speaking | [`../product/speaking/prd-speaking.md`](../product/speaking/prd-speaking.md) |
| TDD Speaking | [`tdd-speaking.md`](tdd-speaking.md) |
