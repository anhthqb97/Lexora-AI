# 48-Hour War Room Monitoring Guide

**Task:** P1-T084  
**Version:** 1.0  
**Last Updated:** 2026-07-19

---

## 1. Purpose

Centralized monitoring for the **first 48 hours** after public launch (M5).

---

## 2. Team & Schedule

| Shift | Hours (ICT) | Primary | Backup |
|---|---|---|---|
| Day 1 AM | 06:00–14:00 | DevOps | Dev |
| Day 1 PM | 14:00–22:00 | Dev | PM |
| Day 1 Night | 22:00–06:00 | On-call Dev | DevOps |
| Day 2 | Rotate same | | |

**Channel:** `#launch-war-room` (Slack)

---

## 3. Dashboards (check every 30 min)

| Dashboard | Metrics |
|---|---|
| Sentry | Error rate, new issues, p95 transactions |
| Vercel Analytics | Traffic, 5xx, edge errors |
| MongoDB Atlas | CPU, connections, slow queries |
| Uptime | lexora.ai, `/api/v1/health` |
| Payments | Success rate, webhook failures |

---

## 4. Escalation

| Severity | Response | Example |
|---|---|---|
| P0 | Immediate all-hands | Site down, auth broken |
| P1 | Fix within 2h | TOEIC submit fails |
| P2 | Next business day | Copy typo |

---

## 5. Hourly Log Template

```
Hour: ___
Signups: ___
Active sessions: ___
Errors (Sentry): ___
p95 latency: ___
Payments: ___ success / ___ fail
Notes:
Action items:
```

---

## 6. Exit Criteria (end war room)

- 48h elapsed
- No open P0
- Error rate <0.5%
- Hand off to normal on-call

---

## References

| Document | Link |
|---|---|
| Uptime monitoring | [`uptime-monitoring.md`](uptime-monitoring.md) |
| Public launch runbook | [`public-launch-runbook.md`](public-launch-runbook.md) |
