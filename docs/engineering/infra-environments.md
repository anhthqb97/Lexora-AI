# Infrastructure Environments — Lexora AI

**Version:** 1.0
**Status:** Approved baseline
**Owner:** Technical Lead / DevOps
**Last Updated:** 2026-07-19

> Canonical env vars: [`tech-stack.md`](tech-stack.md) §10 · Tasks: P0-T14–P0-T20, P1-T088–P1-T098

---

## 1. Environment Overview

| Environment | Purpose | Hosting | Database | Redis | LLM | Speech |
|---|---|---|---|---|---|---|
| **Local** | Developer machines | `npm run dev` + Docker Compose | MongoDB 7 (container) | Redis 7 (container) | Ollama (container) | Mock / optional Whisper |
| **Staging** | QA, demos, beta | Vercel preview + `main` branch | Atlas **staging** cluster | Upstash staging | OpenAI (staging key) | Azure (after P0-T16) |
| **Production** | Public users | Vercel production | Atlas **production** cluster | Upstash production | OpenAI (prod key) | Azure Southeast Asia |

**Rule:** Staging and production use **separate** Atlas clusters and API keys. Never point staging at prod data.

---

## 2. Provisioning Checklist (Phase 0)

| Task | Service | Notes |
|---|---|---|
| P0-T14 | Vercel project | Team access; preview deploys on PR |
| P0-T22 | GitHub repo | [anhthqb97/Lexora-AI](https://github.com/anhthqb97/Lexora-AI) — branch protection on `main` |
| P0-T14 | MongoDB Atlas staging | Region: Singapore (ap-southeast-1) |
| P0-T14 | Upstash Redis staging | REST API enabled |
| P0-T15 | `.env.example` | All vars documented; no secrets in git |
| P0-T16 | Azure Speech | Region: `southeastasia`; STT + pronunciation — **before Sprint 3 staging**; VN spike pre-beta |
| P0-T17 | OpenAI | Spend cap + 80% billing alert |
| P0-T18 | Email (Resend/SendGrid) | Verified sender domain |
| P0-T19 | SMS OTP (+84) | Vietnam delivery tested |
| P0-T20 | Production spec | This document + P1-T095 execution |

---

## 3. Deploy Promotion Flow

```
PR → Vercel Preview (ephemeral)
main merge → Vercel Staging (auto)
manual promote → Vercel Production (Sprint 9: P1-T095)
```

Production deploy requires:
- [ ] Security review passed (P1-T081)
- [ ] Launch checklist passed (P1-T082)
- [ ] Domain + SSL live (P1-T096)
- [ ] Backup policy configured (P1-T098)

---

## 4. Monitoring Stack (MVP)

| Layer | Tool | Task |
|---|---|---|
| Errors | Sentry | P1-T005 |
| Logs | Pino → Vercel logs | P1-T092 |
| Uptime | Better Stack / UptimeRobot | P1-T093 |
| Product analytics | PostHog | P1-T016 |
| Health probe | `GET /api/v1/health` | P1-T089 |

---

## 5. Secrets Management

| Secret type | Storage | Rotation |
|---|---|---|
| App secrets (`AUTH_SECRET`, API keys) | Vercel env vars (per environment) | Quarterly or on leak |
| Database URI | Vercel env + Atlas IP allowlist | On personnel change |
| Payment keys | Vercel env; separate sandbox vs prod | Per provider policy |

Local: copy `.env.example` → `.env.local` (gitignored). **Created in P0-T15 / P1-T003 — not in repo yet.**

Local Docker stack: see [`local-development.md`](local-development.md) — **implemented in P1-T003 only**.

---

## 6. Backup & Recovery (Production)

| Item | Policy | Task |
|---|---|---|
| MongoDB Atlas | Continuous backup; PITR enabled | P1-T098 |
| Restore test | Quarterly restore drill | Phase 1c |
| Redis | Ephemeral (session context); no backup required MVP | — |

---

## 7. References

| Document | Link |
|---|---|
| Tech stack | [`tech-stack.md`](tech-stack.md) |
| ADR | [`architecture-decision-record.md`](architecture-decision-record.md) |
| Phase 0 tasks | [`../product/phases/phase-0-discovery.md`](../product/phases/phase-0-discovery.md) |
| Phase 1 infra tasks | [`../product/phases/phase-1-mvp-launch.md`](../product/phases/phase-1-mvp-launch.md) § Infrastructure Track |
