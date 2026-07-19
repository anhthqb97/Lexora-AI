# Latency Report — Speaking Pipeline

**Version:** 1.0  
**Status:** Phase 0 baseline (local mock) · Vietnam Azure test pending pre-beta  
**Task:** P0-T03  
**Last Updated:** 2026-07-19

---

## 1. Targets (NFR)

| Stage | Target p95 | Measured (local mock) | Measured (VN 4G + Azure) |
|---|---|---|---|
| STT (speech → transcript) | ≤2s | ≤50ms (mock) | ⏳ Pre-beta (P0-T16) |
| AI text response | ≤3s | Depends on Ollama/OpenAI | ⏳ Pre-beta |
| Full turn evaluation | ≤5s | ≤200ms (mock scores) | ⏳ Pre-beta |

**Source:** [`feasibility-speech.md`](feasibility-speech.md) · [`tdd-speaking.md`](tdd-speaking.md) §5

---

## 2. Phase 0 — Local baseline (P0-T03)

**Environment:** Developer machine · `SPEECH_PROVIDER=mock` · Ollama or OpenAI for LLM.

| Step | Component | Expected local |
|---|---|---|
| 1 | Audio upload → API | ≤200ms |
| 2 | Mock STT | ≤50ms |
| 3 | LLM response (Ollama `llama3.2:3b`) | 1–4s (hardware dependent) |
| 4 | Mock pronunciation scores | ≤50ms |

**Phase 0 pass:** Pipeline completes with mock provider; no Azure or Vietnam network required.

**How to measure (after P1-T001):**

```bash
SPEECH_PROVIDER=mock npm run dev
# Run scripts/latency-speaking-turn.sh (P1-T089+) or manual Postman timing
```

---

## 3. Pre-beta — Vietnam 4G + Azure (deferred)

**When:** After P0-T16 (Azure provisioned), before closed beta (Sprint 7).

| Test | Method |
|---|---|
| Network | Real 4G in HCMC/Hanoi (not Wi‑Fi) |
| STT | Azure Speech Southeast Asia |
| LLM | OpenAI GPT-4o (staging) |
| Tool | PostHog + server-side timestamps on `/api/v1/speaking/sessions/{id}/turns` |

**Pass:** STT ≤2s p95 · AI ≤3s p95 · eval ≤5s p95 from Vietnam.

Results will be appended to §4 when measured.

---

## 4. Production measurement results

| Date | Environment | STT p95 | AI p95 | Eval p95 | Pass? |
|---|---|---|---|---|---|
| — | VN 4G + Azure | — | — | — | Pending pre-beta |

---

## 5. References

| Document | Link |
|---|---|
| Speech providers | [`speech-providers.md`](speech-providers.md) |
| Feasibility memo | [`feasibility-speech.md`](feasibility-speech.md) |
| Infra environments | [`infra-environments.md`](infra-environments.md) |
