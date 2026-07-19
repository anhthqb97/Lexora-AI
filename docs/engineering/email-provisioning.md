# Email Provider — Auth Emails (Resend)

**Version:** 1.0  
**Status:** Runbook  
**Task:** P0-T18  
**Last Updated:** 2026-07-19

**Provider choice:** **Resend** (simple API, good DX for Next.js). Alternative: SendGrid.

---

## 1. Resend setup

1. [resend.com](https://resend.com) → create account  
2. Add domain **`lexora.ai`** (or staging subdomain `mail.lexora.ai`)  
3. DNS records: SPF, DKIM, DMARC — verify in Resend dashboard  
4. API Keys → create **`lexora-staging`**  

### Vercel env var

```
RESEND_API_KEY=re_...
EMAIL_FROM=Lexora <noreply@lexora.ai>
```

Environments: Preview, Development (Production at launch).

---

## 2. Email templates (MVP)

| Template | Trigger | Subject (VI) |
|---|---|---|
| `verification` | Email signup | Xác nhận email Lexora AI |
| `password-reset` | Forgot password | Đặt lại mật khẩu Lexora AI |
| `receipt` | Payment success (P1) | Biên lai thanh toán Lexora AI |

Store template IDs in code at P1-T006 / P1-T026.

---

## 3. Validation test

```bash
export RESEND_API_KEY="re_..."

curl -s -X POST https://api.resend.com/emails \
  -H "Authorization: Bearer $RESEND_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "from": "Lexora <noreply@lexora.ai>",
    "to": ["your-team@example.com"],
    "subject": "Lexora staging email test",
    "html": "<p>P0-T18 validation — delete me.</p>"
  }'
```

**Pass:** Email arrives in team inbox within 2 minutes.

---

## 4. References

| Document | Link |
|---|---|
| Platform PRD auth | [`../product/platform/prd-platform.md`](../product/platform/prd-platform.md) |
| Staging env | [`staging-environment.md`](staging-environment.md) |
| Secrets policy | [`secrets-policy.md`](secrets-policy.md) |
