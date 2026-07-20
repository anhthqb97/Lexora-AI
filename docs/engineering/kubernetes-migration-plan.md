# Kubernetes Migration Plan

**Task:** P2-T25  
**Trigger:** MAL > 50,000 (M9 gate)  
**Last Updated:** 2026-07-19

---

## Current State

- Next.js modular monolith on Azure App Service
- MongoDB Atlas, Redis Cache
- Extracted microservices: `ai-gateway-service`, `speech-service`, `billing-service`

---

## Target Architecture

```
Ingress (NGINX) → Next.js (3 replicas)
                → ai-gateway-service
                → speech-service
                → billing-service
External: MongoDB Atlas, Redis, Azure OpenAI / vLLM
```

---

## Migration Phases

1. **Phase A:** Containerize monolith + health probes
2. **Phase B:** Deploy services to AKS staging
3. **Phase C:** Blue/green cutover with feature flags
4. **Phase D:** HPA on CPU + request latency

---

## Rollback

Keep App Service warm for 2 weeks post-cutover.

---

## References

- [`self-hosted-llm-production.md`](self-hosted-llm-production.md)
- [`ci-cd.md`](ci-cd.md)
