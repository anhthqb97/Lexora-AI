# Re-engagement Campaigns

**Task:** P2-T29  
**Last Updated:** 2026-07-19

---

## Campaign Types

| Campaign | Trigger | Channel |
|---|---|---|
| Streak at risk | No session 48h, streak ≥3 | Push + email |
| Weekly digest | Sunday 9am | Email |
| Assignment due | 24h before due | Push |
| Win-back | 14 days inactive | Email |

---

## Push Template API

Stub endpoint: `POST /api/v1/notifications/push-template`

Templates stored in code; future: CMS integration.

---

## Metrics

- Open rate ≥25% (push)
- Click-through ≥8%
- Re-activation within 7 days ≥15%
