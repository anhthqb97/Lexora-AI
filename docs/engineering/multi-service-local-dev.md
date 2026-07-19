# Multi-Service Local Development

**Task:** P1C-T18  
**Version:** 1.0  
**Last Updated:** 2026-07-19

---

## Overview

Phase 4 adds microservices alongside the Next.js monolith. Use Docker Compose for local multi-service dev.

```
Next.js (:3000)
  ├── ai-gateway (:8081) → OpenAI or LiteLLM (:4000)
  ├── speech-service (:8082)
  ├── MongoDB (:27017)
  ├── Redis (:6379)
  └── Ollama (:11434)
```

---

## Quick Start

```bash
cp .env.example .env.local
# Set AI_GATEWAY_URL=http://localhost:8081
# Optional: SPEECH_SERVICE_URL=http://localhost:8082

docker compose up -d
npm run local:wait
npm run dev
```

---

## Services

| Service | Port | Health |
|---|---|---|
| ai-gateway | 8081 | `GET /health` |
| speech-service | 8082 | `GET /health` |
| litellm | 4000 | `GET /health/liveliness` |
| mongodb | 27017 | mongosh ping |
| redis | 6379 | redis-cli ping |
| ollama | 11434 | `/api/tags` |

---

## Environment

| Variable | Purpose |
|---|---|
| `AI_GATEWAY_URL` | Monolith → ai-gateway for LLM calls |
| `SPEECH_SERVICE_URL` | Monolith → speech-service for STT/pronunciation |
| `LITELLM_MASTER_KEY` | LiteLLM proxy auth (staging) |

See [`.env.example`](../../.env.example) and [`litellm-staging.md`](litellm-staging.md).

---

## Troubleshooting

| Issue | Fix |
|---|---|
| ai-gateway 502 | Check `OPENAI_API_KEY` or use stub (empty key) |
| speech-service unreachable | Verify `docker compose ps speech-service` |
| LiteLLM slow start | Wait 30s; vLLM optional for local |

---

## References

- [`local-development.md`](local-development.md)
- [`architecture-decision-record.md`](architecture-decision-record.md) ADR-004
