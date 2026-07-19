# Beta P0 Bug Triage Process

**Task:** P1-T064  
**Version:** 1.0  
**Last Updated:** 2026-07-19  
**Owner:** Dev

---

## 1. Severity Definitions

| Level | Definition | Examples | SLA |
|---|---|---|---|
| **P0** | Blocks core beta flow; data loss; security | Cannot login; session crash loop; payment charged twice | Fix ≤24h |
| **P1** | Major feature broken; workaround exists | Summary missing scores; mic fails on Safari | Fix ≤72h |
| **P2** | Minor UX; cosmetic | Wrong Vietnamese copy; slow non-blocking load | Next sprint |
| **P3** | Enhancement | Nice-to-have UI polish | Backlog |

---

## 2. Intake Channels

- `#beta-bugs` Slack (primary)
- Google Form "bugs" field on feedback form
- Sentry auto-alerts (P0/P1 auto-create GitHub issue)
- Direct PM email

---

## 3. Triage Workflow

```
Report → Triage (PM + Dev on-call) → GitHub issue labeled P0/P1/P2
   → Assign owner → Fix on branch → Staging verify → Deploy → Notify reporter
```

| Step | Owner | Time |
|---|---|---|
| Acknowledge report | On-call Dev | ≤2h (business hours) |
| Reproduce + severity | PM + Dev | ≤4h |
| P0 fix deployed | Dev | ≤24h |
| Regression test added | Dev | Same PR as fix |
| Close + update beta tracker | PM | Same day as deploy |

---

## 4. P0 Escalation

1. Page on-call Dev via PagerDuty / phone tree
2. Freeze non-critical merges to `main`
3. Hotfix branch `hotfix/P1-T064-{slug}` → fast-track review → staging → prod
4. Post-mortem within 48h if user-impacting >1h

---

## 5. Beta-Specific P0 Checklist

- [ ] Auth (OTP, Google, Facebook)
- [ ] Session create → turn → end → summary
- [ ] Voice consent + mic capture
- [ ] Free tier limit display (not blocking incorrectly)
- [ ] PII not exposed in logs

---

## 6. GitHub Issue Template

**Title:** `[P0][Beta] {short description}`

**Body:**

- Reporter / learner ID (hashed)
- Steps to reproduce
- Expected vs actual
- Device + browser
- Sentry link
- Screenshots / recording

**Labels:** `beta`, `P0`, `speaking` (or `platform`)

---

## 7. Exit Gate

**M3 requires 0 open P0 bugs** before open beta (P1-T079).

Fixes from closed beta tracked in task **P1-T075**.

---

## References

| Document | Link |
|---|---|
| Beta checklist | [`../../qa/beta-checklist.md`](../../qa/beta-checklist.md) |
| CI/CD | [`../../engineering/ci-cd.md`](../../engineering/ci-cd.md) |
