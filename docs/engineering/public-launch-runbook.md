# Public Launch Runbook

**Task:** P1-T083  
**Version:** 1.0  
**Last Updated:** 2026-07-19  
**Owner:** PM

---

## 1. Launch Decision

**Go criteria:** All items in [`beta-checklist.md`](../qa/beta-checklist.md) §3 Public Launch checked.

**Launch date:** ___________ (ICT)

**War room:** See [`launch-war-room-48h.md`](launch-war-room-48h.md)

---

## 2. T-24 Hours

- [ ] Final production deploy (P1-T095)
- [ ] DNS/SSL verified (P1-T096)
- [ ] Payment live smoke test
- [ ] Marketing landing page live
- [ ] Press / social posts scheduled
- [ ] Support macros ready (Vietnamese)

---

## 3. T-0 Launch Hour

| Time | Action | Owner |
|---|---|---|
| T-0 | Remove beta gate / open registration | Dev |
| T+0 | Post launch announcement | PM |
| T+0 | Monitor Sentry + uptime | DevOps |
| T+1h | First metrics check | PM |

---

## 4. T+24 Hours

- [ ] Review signups, completion, payments
- [ ] Triage P0/P1 bugs
- [ ] Customer support summary

---

## 5. Communications

**Launch tweet/post (VI):**  
Lexora chính thức ra mắt! 🚀 Luyện nói AI + TOEIC thông minh — miễn phí bắt đầu tại lexora.ai

---

## 6. Rollback Trigger

Rollback if ANY of:

- Auth down >15 min
- Payment webhook failure >50% for 30 min
- Data breach suspected

Follow [`production-deploy-runbook.md`](production-deploy-runbook.md) rollback.

---

## References

| Document | Link |
|---|---|
| Release notes | [`../product/release-notes-v1.0.md`](../product/release-notes-v1.0.md) |
| Post-launch metrics | [`../product/post-launch-30-day-metrics.md`](../product/post-launch-30-day-metrics.md) |
