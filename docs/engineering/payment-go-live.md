# Payment Go-Live Configuration

**Task:** P1-T076  
**Version:** 1.0  
**Last Updated:** 2026-07-19  
**Owner:** Dev

---

## 1. Providers

| Provider | Env vars (production) | Webhook route |
|---|---|---|
| MoMo | `MOMO_PARTNER_CODE`, `MOMO_ACCESS_KEY`, `MOMO_SECRET_KEY` | `/api/v1/billing/webhook/momo` |
| VNPay | `VNPAY_TMN_CODE`, `VNPAY_HASH_SECRET` | `/api/v1/billing/webhook/vnpay` |
| Card (Stripe/VNPay card) | `VNPAY_CARD_*` or Stripe keys | Same VNPay webhook |

Store secrets in Vercel Production + GitHub Actions secrets — never in repo.

---

## 2. Pre-Go-Live Checklist

- [ ] Sandbox checkout tested end-to-end (3 providers)
- [ ] Production credentials rotated from sandbox
- [ ] Webhook URLs registered with MoMo / VNPay dashboards
- [ ] `activateSubscription()` verified in staging with real sandbox payment
- [ ] Idempotency on webhook (duplicate events ignored)
- [ ] Pro tier unlocks speaking + unlimited TOEIC mocks
- [ ] Refund policy documented (manual for MVP)

---

## 3. Environment Matrix

| Env | MoMo | VNPay | Notes |
|---|---|---|---|
| Local | Sandbox | Sandbox | `.env.local` |
| Staging | Sandbox | Sandbox | Vercel Preview |
| Production | Live | Live | Vercel Production |

---

## 4. Monitoring

| Metric | Alert |
|---|---|
| Payment success rate | <85% over 1h |
| Webhook 5xx | Any P0 |
| Checkout abandon | Track in analytics |

---

## References

| Document | Link |
|---|---|
| Billing module | `lib/modules/billing/` |
| Pricing spec | [`../product/pricing-spec.md`](../product/pricing-spec.md) |
| Secrets policy | [`ci-cd.md`](ci-cd.md) |
