# Phase 4 — Native App & Scale

**Version:** 1.0  
**Duration:** 8 weeks (after public launch)  
**Gate:** **M6** — Native app live; retention ≥35% to start  
**Tasks:** P1C-T01–P1C-T22  
**Rules:** [`development-rules.md`](../../engineering/development-rules.md) · One task = one commit

> **Previous name:** Phase 1c. Task prefix unchanged (`P1C-T*`).

---

## Objectives

1. Launch Expo native app (iOS + Android)
2. Extract first microservice (ai-gateway)
3. Evaluate self-hosted LLM (vLLM) vs OpenAI cost
4. Improve retention and session frequency

---

## Entry Gate

Start Phase 4 only when:

- [ ] Public launch stable ≥2 weeks
- [ ] 30-day retention ≥35% OR PM override with beta data
- [ ] No P0 bugs in production
- [ ] OpenAI monthly cost baseline documented

---

## Task List

### Month 1 — Native App (Weeks 1–4)

| ID | Task | Owner | Status |
|---|---|---|---|
| P1C-T01 | Expo project scaffold (`apps/mobile`) | Dev | ✅ |
| P1C-T02 | Shared TypeScript types package | Dev | ✅ |
| P1C-T03 | Auth flow (SecureStore + JWT) | Dev | ✅ |
| P1C-T04 | Dashboard screen | Dev | ✅ |
| P1C-T05 | Speaking Home + session setup | Dev | ✅ |
| P1C-T06 | Live session (expo-av mic) | Dev | ✅ |
| P1C-T07 | Session summary screen | Dev | ✅ |
| P1C-T08 | TOEIC home + mock exam (read-only MVP) | Dev | ✅ |
| P1C-T09 | Push notifications setup (Expo) | Dev | ✅ |
| P1C-T10 | EAS Build pipeline (iOS + Android) | Dev | ✅ |
| P1C-T11 | App Store + Google Play submission | PM | ✅ |
| P1C-T12 | Native app QA test plan | QA | ✅ |

### Month 2 — Service Extraction & LLM (Weeks 5–8)

| ID | Task | Owner | Status |
|---|---|---|---|
| P1C-T13 | Extract `lib/ai` → ai-gateway-service | Architect + AI | ✅ |
| P1C-T14 | LiteLLM proxy setup (staging) | AI Dev | ✅ |
| P1C-T15 | vLLM + Qwen2.5 evaluation (quality vs GPT-4o) | AI Dev | ✅ |
| P1C-T16 | Cost comparison report (OpenAI vs self-hosted) | PM + AI | ⬜ |
| P1C-T17 | Extract `lib/speech` → speech-service (if latency issue) | Architect | ⬜ |
| P1C-T18 | Docker Compose multi-service local dev | DevOps | ⬜ |
| P1C-T19 | API Gateway routing layer (optional Kong/BFF) | Architect | ⬜ |
| P1C-T20 | Daily speaking challenge feature (P1) | Dev | ⬜ |
| P1C-T21 | Referral program v0.1 | PM + Dev | ⬜ |
| P1C-T22 | Phase 5 backlog planning | PM | ⬜ |

---

## Exit Criteria (M6)

- [ ] Expo app live on App Store + Google Play
- [ ] Native speaking session works end-to-end
- [ ] ai-gateway-service extracted and deployed
- [ ] LLM cost/quality decision documented (stay OpenAI or migrate)
- [ ] MAL growth ≥20% vs launch month

---

## Architecture Change

```
Before: Next.js monolith (lib/ai, lib/speech inside)
After:  Next.js web + Expo mobile → ai-gateway-service → OpenAI or vLLM
```

See [`architecture-decision-record.md`](../../engineering/architecture-decision-record.md) ADR-004.

---

## Next Phase

→ [`phase-5-growth.md`](phase-5-growth.md)
