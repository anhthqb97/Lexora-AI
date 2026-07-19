# Security Review Checklist — Pre-Launch

**Task:** P1-T081  
**Version:** 1.0  
**Last Updated:** 2026-07-19  
**Owner:** Architect

---

## 1. Authentication

- [ ] NextAuth session cookies: `httpOnly`, `secure`, `sameSite=lax`
- [ ] OTP rate limiting (send + verify)
- [ ] Password hashing bcrypt cost ≥10
- [ ] OAuth state parameter validated (Google, Facebook)

---

## 2. Authorization

- [ ] All `/api/v1/*` routes check `getAuthUserId()` except health/webhooks
- [ ] Users cannot access other users' sessions/attempts (IDOR tests)
- [ ] Admin routes not exposed in MVP

---

## 3. Payments

- [ ] Webhook signature verification (MoMo, VNPay)
- [ ] Idempotent subscription activation
- [ ] No price tampering client-side (server validates plan amount)
- [ ] PCI: no raw card data stored (redirect to provider)

---

## 4. AI & Data

- [ ] `OPENAI_API_KEY` server-side only
- [ ] Prompt injection tests (20 cases) — see [`guardrails.md`](../AI/guardrails.md)
- [ ] Voice recordings: consent required, retention policy documented
- [ ] PII not logged (emails hashed in analytics)

---

## 5. Infrastructure

- [ ] HTTPS everywhere (HSTS on lexora.ai)
- [ ] MongoDB IP allowlist + TLS
- [ ] Secrets in Vercel env, not git
- [ ] Dependency audit: `npm audit` — no critical open
- [ ] Sentry scrubbing for request bodies

---

## 6. Sign-off

| Area | Reviewer | Date | Pass |
|---|---|---|---|
| Auth | | | ☐ |
| Payments | | | ☐ |
| AI | | | ☐ |
| Infra | | | ☐ |

**Block public launch if any P0 security item fails.**

---

## References

| Document | Link |
|---|---|
| Secrets policy | [`secrets-policy.md`](secrets-policy.md) |
| ADR | [`architecture-decision-record.md`](architecture-decision-record.md) |
