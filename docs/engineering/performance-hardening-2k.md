# Performance Hardening — 2K Concurrent Sessions

**Task:** P1-T080  
**Version:** 1.0  
**Last Updated:** 2026-07-19  
**Owner:** Architect

---

## 1. Target

Support **2,000 concurrent active sessions** (Speaking + TOEIC) at p95 API latency ≤ **3s** on 4G.

---

## 2. Bottleneck Analysis

| Layer | Risk | Mitigation |
|---|---|---|
| Next.js API routes | Cold starts | Vercel Pro, edge caching for static |
| MongoDB Atlas | Connection pool exhaustion | Pool size 50, `connectDatabase` singleton |
| OpenAI | Rate limits | Queue + stub fallback in dev |
| Azure Speech | STT quota | Retry with backoff, regional endpoint |
| Redis (Upstash) | Hot keys | Shard counters by userId hash |

---

## 3. Load Test Plan

| Scenario | Tool | Target |
|---|---|---|
| 500 concurrent speaking | k6 / Artillery | p95 <5s |
| 2K mixed (70% read, 30% speak) | k6 | p95 <3s API |
| TOEIC mock submit burst | k6 | 100 req/s sustained 5 min |

Reference: [`load-test-speaking.md`](load-test-speaking.md)

---

## 4. Caching Strategy

| Data | TTL | Store |
|---|---|---|
| TOEIC question bank | 24h | CDN + in-memory |
| User tier | 5 min | Redis |
| Speaking topics | 1h | Edge cache |

---

## 5. Database Indexes

Ensure indexes on:

- `speaking_sessions`: `{ userId: 1, startedAt: -1 }`
- `toeic_attempts`: `{ userId: 1, type: 1, createdAt: -1 }`
- `toeic_questions`: `{ formIds: 1 }`

Run: `npm run db:create-indexes`

---

## 6. Rollout

1. Staging load test → fix regressions
2. Enable Sentry performance monitoring
3. Scale Atlas to M10 before open beta 500
4. Re-test at 2K before public launch

---

## 7. Alerting

| Signal | Threshold |
|---|---|
| p95 latency | >5s for 5 min |
| Error rate | >1% |
| MongoDB CPU | >80% |
