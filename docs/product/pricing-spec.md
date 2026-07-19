# Pricing Spec — Free & Paid Tiers

**Version:** 1.0  
**Status:** Approved (P0-T06, 2026-07-19)  
**Owner:** PM  
**Last Updated:** 2026-07-19  
**Task:** P0-T06

---

## 1. Tier overview

| Tier | Price (VND) | Target user |
|---|---|---|
| **Free** | 0 | Trial, students, budget-conscious learners |
| **Pro** | 299,000 / month | Regular practice, exam prep |

Annual plan (Phase 2): 2,990,000 VND / year (~17% discount) — not MVP.

---

## 2. Free tier limits (MVP)

| Feature | Limit | Reset | Enforcement |
|---|---|---|---|
| Speaking sessions | **3 / week** | Monday 00:00 ICT | Redis counter + paywall (PL-18) |
| TOEIC full mock test | **1 / month** | 1st of month ICT | Billing module quota |
| TOEIC diagnostic (placement) | **1 lifetime** (re-test Pro only) | — | User profile flag |
| Writing / Business / Interview | Not available | — | Product cards hidden or locked |

**Overflow UX:** Friendly paywall in Vietnamese explaining Pro benefits; no hard error.

---

## 3. Pro tier (MVP)

| Feature | Access |
|---|---|
| Speaking sessions | Unlimited (fair use: max 60 min/day anti-abuse) |
| TOEIC mocks | Unlimited |
| TOEIC diagnostic | Unlimited re-tests |
| Priority support | Email within 48h (Phase 2) |

---

## 4. Config keys (implementation)

```typescript
// lib/modules/billing/constants.ts (P1-T026+)
FREE_SPEAKING_SESSIONS_PER_WEEK = 3
FREE_TOEIC_MOCKS_PER_MONTH = 1
PRO_PRICE_VND_MONTHLY = 299_000
```

---

## 5. References

| Document | Link |
|---|---|
| Platform PRD §3.3 | [`platform/prd-platform.md`](platform/prd-platform.md) |
| Speaking PRD §10 | [`speaking/prd-speaking.md`](speaking/prd-speaking.md) |
| Unit economics | [`unit-economics-speaking.md`](unit-economics-speaking.md) |
| Brand positioning | [`brand.md`](brand.md) |
