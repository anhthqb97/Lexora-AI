# API Gateway & BFF Routing

**Task:** P1C-T19  
**Version:** 1.0  
**Last Updated:** 2026-07-19  
**Status:** Architecture reference (optional Kong layer)

---

## Context

Lexora MVP uses a **Backend-for-Frontend (BFF)** pattern: Next.js App Router serves web UI and exposes `/api/v1/*` routes. Mobile (Expo) calls the same API with Bearer JWT.

Microservices (`ai-gateway`, `speech-service`) are invoked **server-side** from the monolith — not directly from clients.

---

## Current Architecture (Phase 4)

```
┌─────────────┐     ┌─────────────┐
│  Web (Next) │     │ Expo Mobile │
└──────┬──────┘     └──────┬──────┘
       │                   │
       └─────────┬─────────┘
                 ▼
         Next.js BFF /api/v1/*
                 │
       ┌─────────┼─────────┐
       ▼         ▼         ▼
   MongoDB  ai-gateway  speech-service
              │              │
              ▼              ▼
           LiteLLM        Azure STT
           OpenAI         (future)
```

---

## When to Add Kong / API Gateway

| Trigger | Action |
|---|---|
| MAL > 50K | Evaluate Kong or AWS API Gateway |
| Multiple client apps | Centralize rate limits, auth, versioning |
| Public third-party API | Required for partner integrations |

**Not needed for MVP** — Next.js BFF is sufficient.

---

## BFF Responsibilities

1. **Auth** — NextAuth (web) + JWT Bearer (mobile)
2. **Rate limiting** — per user/tier (Redis)
3. **Request validation** — Zod schemas
4. **Service routing** — `AI_GATEWAY_URL`, `SPEECH_SERVICE_URL` env vars
5. **Response envelope** — consistent `{ data }` / `{ error }` format

---

## Future Kong Routes (if adopted)

| Route | Upstream |
|---|---|
| `/api/v1/*` | next-js-bff |
| `/internal/ai/*` | ai-gateway-service |
| `/internal/speech/*` | speech-service |

Kong plugins: JWT validation, rate limiting, request logging, CORS.

---

## Decision

**Phase 4:** Keep Next.js as BFF. Document only — no Kong deploy.

**Phase 6:** Revisit when microservices count > 3 and MAL > 50K.

See [`architecture-decision-record.md`](architecture-decision-record.md) ADR-004.
