# Beta Completion Rate Monitoring Guide

**Task:** P1-T063  
**Version:** 1.0  
**Last Updated:** 2026-07-19  
**Owner:** PM

---

## 1. Definition

**Session completion rate** = completed sessions ÷ started sessions (status `completed` / `active|completed`).

**Beta cohort completion** = learners with ≥1 completed session ÷ activated learners.

**Gate threshold (M3):** Session completion ≥ **60%**.

---

## 2. Daily Monitoring Cadence

| Time (ICT) | Action | Owner |
|---|---|---|
| 09:00 | Pull MongoDB metrics (see queries below) | PM + Dev |
| 09:30 | Post summary in #beta-war-room Slack | PM |
| 17:00 | Check drop-offs; send nudge email if <2 sessions | PM |
| EOD | Log in beta tracker sheet | PM |

---

## 3. Data Sources

| Metric | Collection | Query / Tool |
|---|---|---|
| Sessions started | `speaking_sessions` | `status IN (active, completed, ...)` |
| Sessions completed | `speaking_sessions` | `status = completed` |
| Avg session duration | `speaking_sessions` | `endedAt - startedAt` |
| Error rate | Sentry | `/speaking` transactions |
| AI latency p95 | Vercel / Sentry | `/api/v1/speaking/*` |

### Example aggregation (MongoDB)

```javascript
db.speaking_sessions.aggregate([
  { $match: { startedAt: { $gte: ISODate("2026-07-01") } } },
  {
    $group: {
      _id: "$status",
      count: { $sum: 1 },
    },
  },
]);
```

---

## 4. Dashboard Fields (Google Sheet / Looker)

| Column | Formula |
|---|---|
| Date | — |
| Cohort size (activated) | Count onboarding complete |
| Sessions started | Daily sum |
| Sessions completed | Daily sum |
| Completion rate | completed / started |
| Learners with ≥3 sessions | Count distinct userId |
| Avg usefulness (form) | AVG from feedback sheet |

---

## 5. Alert Thresholds

| Signal | Threshold | Action |
|---|---|---|
| Daily completion rate | <50% for 2 days | PM + Dev sync; check errors |
| Session start with no end | >30% in 24h | Investigate crash / mic issues |
| p95 API latency | >8s | Scale check; OpenAI status |
| Single-user repeated failures | ≥3 | Direct outreach |

---

## 6. Weekly Review

- Compare cohort segments (student vs professional)
- Correlate completion with device type
- Identify top 3 drop-off points (onboarding, mic consent, first turn)

---

## References

| Document | Link |
|---|---|
| Beta checklist | [`../../qa/beta-checklist.md`](../../qa/beta-checklist.md) |
| Go/no-go template | [`beta-go-no-go-template.md`](beta-go-no-go-template.md) |
