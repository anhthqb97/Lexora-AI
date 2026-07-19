# Local Development — Specification (Plan Only)

**Version:** 1.0
**Status:** Plan — **not implemented**
**Implementation task:** P1-T003 (+ P0-T15 for `.env.example`)
**Last Updated:** 2026-07-19

> **Do not build ahead of sprint.** This doc defines what P1-T003 must deliver so the team can test locally with Docker.

---

## 1. Goal

Every developer can run Lexora on their machine **without cloud dependencies** for core stack:

| Service | Local (Docker) | Staging/Prod |
|---|---|---|
| MongoDB | Container | Atlas |
| Redis | Container | Upstash |
| LLM | Ollama container | OpenAI |
| Speech | **Mock** (default) or optional Whisper local — **no Azure** | Azure Speech (P0-T16) |
| App | `npm run dev` | Vercel |

---

## 2. Deliverables (P1-T003)

| File / artifact | Purpose |
|---|---|
| `docker-compose.yml` | MongoDB 7, Redis 7, Ollama |
| `.env.example` | Documented vars (P0-T15 may create first) |
| `.gitignore` | Exclude `.env.local`, `node_modules`, `.next` |
| `scripts/local-check.sh` | Verify MongoDB + Redis + Ollama reachable |
| `scripts/wait-for-services.sh` | Wait for healthchecks after `docker compose up` |
| `scripts/ollama-pull-model.sh` | Pull default dev model (`llama3.2:3b`) |
| Root `README.md` § Local setup | Quick start commands |
| `package.json` scripts | `docker:up`, `docker:down`, `local:check`, `local:setup` |

---

## 3. Docker Compose spec

```yaml
# Planned services (implement in P1-T003)
services:
  mongodb:   # port 27017, volume mongodb_data, healthcheck ping
  redis:     # port 6379, volume redis_data, healthcheck PONG
  ollama:    # port 11434, volume ollama_data, healthcheck ollama list
```

**Local connection strings:**

```bash
MONGODB_URI=mongodb://localhost:27017/lexora
REDIS_URL=redis://localhost:6379
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.2:3b
SPEECH_PROVIDER=mock
# WHISPER_LOCAL_URL=http://localhost:8001   # optional — SPEECH_PROVIDER=whisper-local
```

---

## 4. Local test workflow (acceptance)

After P1-T003 + P1-T001 (Next.js scaffold):

```bash
cp .env.example .env.local
npm run local:setup      # docker up + wait + check
npm run ollama:pull      # first time only
npm run dev              # Next.js on :3000
npm run local:check      # all services OK
```

**DoD checklist (P1-T003):**

- [ ] `docker compose up -d` starts all 3 services
- [ ] Healthchecks pass within 60s
- [ ] `npm run local:check` exits 0
- [ ] MongoDB accepts connection on `27017`
- [ ] Redis responds to `PING`
- [ ] Ollama API responds at `http://localhost:11434/api/tags`
- [ ] Documented in README — no cloud keys required for DB/Redis/LLM/**Speech (mock)**

---

## 5. Related tasks

| Task | When | What |
|---|---|---|
| P0-T15 | Phase 0 | `.env.example` + secrets policy |
| P1-T001 | Sprint 1 | Next.js scaffold |
| P1-T002 | Sprint 1 | Mongoose → local MongoDB |
| P1-T003 | Sprint 1 | **This spec → code** |
| P1-T088 | Sprint 1 | App Redis client (local + Upstash) |
| P1-T089 | Sprint 1 | Health endpoint includes DB/Redis status |

---

## 6. References

| Document | Link |
|---|---|
| Infra environments | [`infra-environments.md`](infra-environments.md) |
| Phase 1 Sprint 1 | [`../product/phases/phase-1-mvp-launch.md`](../product/phases/phase-1-mvp-launch.md) |
| Tech stack §9–10 | [`tech-stack.md`](tech-stack.md) |
| ADR-003 LLM | [`architecture-decision-record.md`](architecture-decision-record.md) |
| Speech providers | [`speech-providers.md`](speech-providers.md) |
