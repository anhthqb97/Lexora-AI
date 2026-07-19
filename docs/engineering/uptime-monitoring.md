# Uptime and Latency Monitoring — Lexora AI

**Version:** 1.0  
**Task:** P1-T093  
**Last Updated:** 2026-07-19

---

## 1. Health endpoint

`GET /api/v1/health` returns:

| Field | Description |
|---|---|
| `status` | `ok` or `degraded` |
| `checks.mongodb` | Database connection state |
| `checks.redis` | Redis ping state |
| `metrics.uptimeSeconds` | Process uptime |
| `metrics.latencyMs` | Health check round-trip latency |

**Alert threshold:** `status !== ok` for 2 consecutive minutes → page on-call.

---

## 2. External uptime monitoring

Configure Better Stack or UptimeRobot to poll:

```
GET https://staging.lexora.ai/api/v1/health
Interval: 60s
Alert: status != 200 OR body.status == degraded
```

---

## 3. Latency tracking

| Endpoint | Target p95 | Tool |
|---|---|---|
| `/api/v1/health` | < 200ms | Uptime monitor |
| `/api/v1/speaking/sessions/{id}/turns` | < 3000ms | PostHog + Sentry |
| OpenAI chat completion | < 5000ms | Server logs |

See [`latency-report.md`](latency-report.md) for speech pipeline targets.

---

## 4. References

| Document | Link |
|---|---|
| Infra environments | [`infra-environments.md`](infra-environments.md) |
| Sentry | P1-T005 |
| PostHog events | P1-T016 |
