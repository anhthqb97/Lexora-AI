# Architecture Decision Record — Lexora AI

**Version:** 1.0
**Status:** Approved
**Date:** 2026-07-19
**Deciders:** Solution Architect, Product Team

---

## ADR-001: Evolutionary Architecture (Modular Monolith → Microservices)

### Context

Lexora AI targets Vietnam English learners with AI speaking, TOEIC prep, and subscription billing. Initial stack discussions included full microservices, self-hosted LLM, MongoDB, Kubernetes, and native apps from day one.

Team constraints:
- ~20-week Phase 1 MVP
- Small team (PM, architect, AI engineer, 2 full-stack, part-time QA)
- Must validate product-market fit before scaling infra

### Decision

**Phase 1 (MVP):** Build a **modular monolith** — single Next.js 15 app with clear `lib/modules/*` boundaries, MongoDB Atlas, OpenAI GPT-4o, Azure Speech, Vercel hosting.

**Phase 2+ (Target):** Evolve to **microservices**, **self-hosted LLM** (vLLM + LiteLLM), **Expo native apps**, and **Kubernetes** when metrics justify the complexity.

### Rationale

| Factor | Monolith MVP | Full microservices day 1 |
|---|---|---|
| Time to launch | ~20 weeks achievable | +8–12 weeks infra |
| Team size | Fits 4–5 engineers | Needs DevOps + 8+ engineers |
| Operational burden | Low (Vercel) | High (K8s, service mesh) |
| Product risk | Focus on speaking quality | Distraction from learner UX |

Microservice **interfaces** are designed now; physical split happens on triggers (see ADR-004).

### Consequences

**Positive:**
- Faster launch; learners get value sooner
- Module folders map 1:1 to future services
- Lower burn rate pre-revenue

**Negative:**
- Must enforce module boundaries in code review
- Single deploy scales vertically first
- Refactor cost if boundaries ignored early

---

## ADR-002: MongoDB as Primary Database

### Decision

Use **MongoDB Atlas** (Singapore region) with **Mongoose**, one cluster for MVP, collection prefixes per module.

### Rationale

- Speaking sessions, turns, and scores are document-shaped (nested JSON, flexible schema)
- TOEIC attempts store variable answer arrays efficiently
- Horizontal scaling without schema migrations for content iterations

### Constraints

- Use **transactions** for billing + subscription updates
- Index `{ userId, startedAt: -1 }` on all user-scoped collections
- Export analytics to PostHog / warehouse for reporting — not heavy aggregation in app

### Future split trigger

Separate database per service when a single cluster exceeds 80% capacity or compliance requires isolation.

---

## ADR-003: LLM Strategy — OpenAI MVP, Self-Hosted at Scale

### Decision

| Phase | LLM |
|---|---|
| MVP production | OpenAI GPT-4o (server-side) |
| Local development | Ollama (Qwen2.5 / Llama 3) |
| Scale (Phase 2) | Self-hosted vLLM + LiteLLM; OpenAI as fallback |

### Rationale

- GPT-4o delivers tutor quality immediately — no GPU ops for launch
- Self-hosted requires model tuning, GPU cost, and on-call — premature before MAL proof
- PDPD: conversations processed server-side; no client keys; transcript retention policy enforced

### Split trigger

Extract **ai-gateway-service** when:
- Monthly OpenAI bill > ~$3,000, OR
- Legal requires in-region LLM inference, OR
- MAL > 10,000 with predictable token volume

---

## ADR-004: Service Extraction Order

When splitting monolith to microservices:

1. **ai-gateway-service** — LLM prompts, guardrails, rate limits
2. **speech-service** — Azure STT + pronunciation (CPU-bound)
3. **billing-service** — MoMo/VNPay webhooks, subscription state
4. **speaking-service**, **toeic-service**, **auth-service** — when MAL > 50K

Each module in `lib/modules/{name}` becomes a candidate service with unchanged API contracts.

---

## ADR-005: Mobile — Web First, Native Second

### Decision

- **MVP launch:** Responsive Next.js web (mobile browser)
- **Phase 1c:** Expo (React Native) after closed beta shows retention ≥ 35%

### Rationale

- Mic access works on iOS Safari / Android Chrome for speaking MVP
- Native doubles client maintenance before product validation
- Same `/api/v1` contracts reused when Expo ships

---

## ADR-006: Speech Engine — Azure Production, Local-First Dev

### Decision

**Production / staging (Sprint 3+):** **Azure Speech Services** (Southeast Asia) for STT + Pronunciation Assessment.

**Local dev / CI / Phase 0:** **`SpeechProvider` abstraction** with **`mock`** (default) and optional **`whisper-local`** — **no Azure keys required**.

Whisper self-hosted for production deferred to Phase 2+.

### Rationale

- Team can build and test speaking flows locally before Azure provisioning (P0-T16)
- E2E and CI use `SPEECH_PROVIDER=mock` — no cloud dependency
- Azure remains best choice for VN-accent pronunciation assessment in beta/production
- Integrated pronunciation scoring vs DIY Whisper pipeline for **production only**

### Implementation

- Spec: [`speech-providers.md`](speech-providers.md)
- Azure VN spike (100 samples) runs **before closed beta**, not Phase 0 gate
- Split **speech-service** only if latency or cost requires it

---

## ADR-007: Hosting — Vercel for MVP

### Decision

Deploy Next.js monolith to **Vercel**. MongoDB Atlas + Upstash Redis as managed services. **No Kubernetes for MVP.**

### Rationale

- Zero DevOps for small team
- Preview URLs for QA
- Migrate to K8s when multi-service topology is live

---

## Architecture Principles

1. **Product before platform** — learners care about speaking quality, not service count
2. **Split on data** — extract when CPU, cost, or team boundaries force it
3. **Vietnam first** — Singapore region; VND payments; Vietnamese UI
4. **Privacy by design** — no raw audio retention; PDPD consent flows
5. **Explain-why is the moat** — invest in prompts and evaluation over infra complexity

---

## Document Map

| Phase | Architecture doc |
|---|---|
| MVP build | [`tech-stack.md`](tech-stack.md) § MVP |
| Target state | [`tech-stack.md`](tech-stack.md) § Target |
| Platform design | [`tdd-platform.md`](tdd-platform.md) |
| Speaking design | [`tdd-speaking.md`](tdd-speaking.md) |

---

## Review Schedule

| Milestone | Review |
|---|---|
| Week 14 (closed beta) | Revisit ADR-003 (LLM cost), ADR-005 (native) |
| MAL 10K | Revisit ADR-001 (first service extraction) |
| MAL 50K | Full architecture review |

---

## ADR-008: Documentation Governance

### Decision

- **Single hub:** `docs/README.md`
- **Binding architecture:** ADR documents only
- **Execution source of truth:** `master-plan.md` + `phases/` task IDs
- **Commit rule:** one task = one commit per `development-rules.md`
- **Review record:** `REVIEW-SIGNOFF.md` updated at major milestones

### Owners

| Doc type | Approver |
|---|---|
| PRD / brand / plans | PM |
| ADR / TDD / stack / dev rules | Technical Lead |
| AI prompts / guardrails | AI Engineer |
| QA plans / acceptance | QA Lead |

### Consequences

- Reduces doc drift and duplicate plans
- All developers start from `docs/README.md`
- Feature plans (`platform/plan-platform.md`) are supporting; phase plans are canonical for tasks

---

## ADR-009: Audio Storage & Privacy (Speaking)

**Status:** Approved (P0-T05, 2026-07-19)  
**Deciders:** Architect, PM, Legal review pending at launch

### Context

Speaking sessions capture learner voice audio. Vietnam **Personal Data Protection Decree (PDPD)** requires lawful basis, consent, minimization, and defined retention. P0-T01 locked product intent; this ADR makes it binding for engineering.

### Decision

| Data type | Store? | Retention | Location |
|---|---|---|---|
| Raw audio (upload) | Yes — transient only | **Delete within 24 hours** after STT + pronunciation scoring | Encrypted object storage (staging/prod); not persisted locally in CI |
| Transcript text | Yes | Session lifetime + 12 months (learner progress) | MongoDB `speaking_turns` |
| Pronunciation scores | Yes | Same as transcript | MongoDB |
| Voice biometrics / voiceprint | **No** | — | Not collected |

**Consent:** Explicit opt-in modal before first speaking session (FR NFR-08). Consent record stored with timestamp and policy version.

**Third parties:** Azure Speech processes audio in transit; no long-term storage by Lexora beyond 24h rule. OpenAI receives **text transcripts only**, not raw audio.

**Learner rights:** Export and delete via account settings (platform PRD); deletion cascades transcripts and scores; raw audio already purged.

### Rationale

- Minimizes PDPD exposure and breach impact
- Transcripts sufficient for explain-why feedback and progress tracking
- Aligns with brand principle: privacy by design (ADR principles §)

### Consequences

**Positive:** Lower storage cost; simpler DPA with Azure (processing only)  
**Negative:** Cannot replay original audio for dispute resolution — mitigated by storing transcript + scores + turn metadata

**Sign-off:** Architect ✅ · Legal ⏳ (formal review before public beta, Sprint 7)
