# Unit Economics — Speaking Session

**Version:** 1.0  
**Status:** Approved baseline (P0-T04)  
**Owner:** PM + Architect  
**Last Updated:** 2026-07-19  
**Task:** P0-T04

---

## 1. Session model (baseline)

| Assumption | Value | Source |
|---|---|---|
| Session duration | 10 minutes | Speaking PRD FR-03 default |
| Learner turns | ~10 | ~1 min user speech per turn |
| Total learner speech | ~4 min | Remaining time = AI TTS + thinking |
| LLM model (staging/prod) | GPT-4o | [`tdd-speaking.md`](../engineering/tdd-speaking.md) |
| Speech engine (staging/prod) | Azure Speech SE Asia | ADR-006, P0-T16 |

**Pricing sources (July 2026 public rates — revalidate before launch):**

| Service | Rate |
|---|---|
| Azure Speech STT | ~$1.00 / 1,000 audio minutes |
| Azure Pronunciation Assessment | Bundled with STT tier |
| Azure Neural TTS | ~$16.00 / 1M characters |
| OpenAI GPT-4o | $2.50 / 1M input tokens · $10.00 / 1M output tokens |

---

## 2. Cost per 10-minute session

| Component | Calculation | Est. USD |
|---|---|---|
| Azure STT (4 min learner audio) | 4 × ($1 / 1000) | $0.004 |
| Azure TTS (~2,500 chars AI speech) | 2,500 × ($16 / 1M) | $0.040 |
| GPT-4o turns (10 × ~600 in / 250 out) | 6K in + 2.5K out | $0.040 |
| GPT-4o session summary | 1.5K in + 800 out | $0.012 |
| Infra allocation (Vercel, Atlas, Redis) | Flat / session at MVP scale | $0.004 |
| **Total variable cost / session** | | **~$0.10** |

**Conservative buffer (latency retries, longer sessions):** **$0.15 / session** for budgeting.

**Local dev (`SPEECH_PROVIDER=mock`, Ollama):** ~$0.00–0.05 / session (LLM only if using OpenAI).

---

## 3. Projection at 10K MAL

| Metric | Conservative | Moderate | Notes |
|---|---|---|---|
| MAL | 10,000 | 10,000 | Phase 1 target milestone |
| Speaking adoption | 30% | 40% | Users with ≥1 speaking session/month |
| Active speaking users | 3,000 | 4,000 | |
| Avg sessions / user / month | 6 | 8 | Free cap = 12 max (3/week) |
| Total sessions / month | 18,000 | 32,000 | |
| Variable cost @ $0.12/session | **$2,160** | **$3,840** | OpenAI + Azure only |
| Variable cost @ $0.15/session | **$2,700** | **$4,800** | With buffer |

---

## 4. Revenue vs cost (sanity check)

| Tier | Price (VND) | ~USD | Sessions included |
|---|---|---|---|
| Free | 0 | — | 3 speaking / week |
| Pro (planned) | 299,000 / mo | ~$12 | Unlimited speaking |

| Scenario @ 10K MAL | Value |
|---|---|
| Paid conversion | 5% → 500 Pro users |
| Gross revenue / month | 500 × $12 = **$6,000** |
| Speaking variable cost (moderate) | **$3,840** |
| Speaking gross margin | ~36% before team/infra fixed costs |

**Conclusion:** Unit economics are **viable at 10K MAL** if paid conversion ≥5% and average free usage stays near caps. Monitor GPT-4o token usage per session in PostHog (P1-T016).

---

## 5. Cost controls

| Control | When | Task |
|---|---|---|
| Session duration caps | MVP | FR-03 max 20 min |
| Free tier limits | MVP | 3 sessions/week (P0-T06) |
| OpenAI spend cap + 80% alert | Staging | P0-T17 |
| LiteLLM → cheaper model for A1–A2 | MAL > 10K | ADR-003 review |
| Self-hosted vLLM | Cost or PDPD trigger | ADR-003 target |

---

## 6. References

| Document | Link |
|---|---|
| Feasibility memo | [`feasibility-speech.md`](../engineering/feasibility-speech.md) |
| Pricing spec | [`pricing-spec.md`](pricing-spec.md) (P0-T06) |
| Latency report | [`latency-report.md`](../engineering/latency-report.md) |
