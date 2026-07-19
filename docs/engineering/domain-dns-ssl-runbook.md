# Domain DNS & SSL Runbook — lexora.ai

**Task:** P1-T096  
**Version:** 1.0  
**Last Updated:** 2026-07-19  
**Owner:** DevOps

---

## 1. Domain Registrar

**Domain:** `lexora.ai`  
**Registrar:** (e.g. Namecheap / Cloudflare Registrar)

---

## 2. DNS Records (Vercel)

| Type | Name | Value | TTL |
|---|---|---|---|
| A | `@` | `76.76.21.21` | 300 |
| CNAME | `www` | `cname.vercel-dns.com` | 300 |
| TXT | `@` | `vercel-dns-verification=...` | 300 |

Add domain in Vercel Project → Settings → Domains → `lexora.ai` + `www.lexora.ai`.

---

## 3. SSL/TLS

- Vercel auto-provisions Let's Encrypt certificates
- Force HTTPS: enabled in Vercel
- HSTS: enable after 48h stable production

**Verify:**

```bash
curl -I https://lexora.ai
# expect HTTP/2 200, strict-transport-security (after HSTS)
```

---

## 4. Email / Auth Redirects

Update OAuth redirect URIs:

- `https://lexora.ai/api/auth/callback/google`
- `https://lexora.ai/api/auth/callback/facebook`

Update `NEXTAUTH_URL=https://lexora.ai` in production env.

---

## 5. Cutover Checklist

- [ ] Lower TTL to 300 before migration
- [ ] Add Vercel DNS records
- [ ] Wait propagation (up to 24h)
- [ ] Verify SSL on mobile + desktop
- [ ] Update MoMo/VNPay return URLs to production domain
- [ ] Restore TTL to 3600

---

## 6. Rollback

Point A record to previous host IP; revert env `NEXTAUTH_URL`.

---

## References

| Document | Link |
|---|---|
| Production deploy | [`production-deploy-runbook.md`](production-deploy-runbook.md) |
| Payment go-live | [`payment-go-live.md`](payment-go-live.md) |
