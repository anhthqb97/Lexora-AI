# SMS OTP Provider — Vietnam (+84)

**Version:** 1.0  
**Status:** Runbook  
**Task:** P0-T19  
**Last Updated:** 2026-07-19

**Provider choice:** **ESMS.vn** or **Stringee** — both support +84 OTP at scale. Twilio works but higher cost for VN.

---

## 1. ESMS setup (recommended for VN)

1. [esms.vn](https://esms.vn) → register business account  
2. Brandname SMS → register **LEXORA** (approval 3–5 business days)  
3. API → copy **ApiKey** and **SecretKey**  

### Vercel env vars

```
SMS_PROVIDER=esms
ESMS_API_KEY=
ESMS_SECRET_KEY=
SMS_SENDER=LEXORA
```

Environments: Preview, Development.

---

## 2. OTP message format

```
Ma xac thuc Lexora AI cua ban la {OTP}. Co hieu luc trong 5 phut. Khong chia se ma nay.
```

| Rule | Value |
|---|---|
| OTP length | 6 digits |
| Expiry | 5 minutes |
| Rate limit | 3 requests / 15 min / phone (Redis, P1-T090) |

---

## 3. Validation test

Send test OTP to a **+84** team phone via provider dashboard or API:

```bash
# Example — follow ESMS API docs for exact endpoint
curl -s -X POST "https://rest.esms.vn/MainService.svc/json/SendMultipleMessage_V4_post_json/" \
  -H "Content-Type: application/json" \
  -d '{
    "ApiKey": "YOUR_API_KEY",
    "SecretKey": "YOUR_SECRET_KEY",
    "Phone": "84901234567",
    "Content": "Ma xac thuc Lexora AI cua ban la 123456. Co hieu luc trong 5 phut.",
    "Brandname": "LEXORA"
  }'
```

**Pass:** OTP SMS delivered to test VN number within 60 seconds.

---

## 4. Fallback

If brandname pending: use ESMS **CSKH** number route for staging only. Switch to brandname before public beta.

---

## 5. References

| Document | Link |
|---|---|
| Platform PRD PL OTP | [`../product/platform/prd-platform.md`](../product/platform/prd-platform.md) |
| Test plan TP-A05 | [`../qa/test-plan-platform.md`](../qa/test-plan-platform.md) |
| Staging env | [`staging-environment.md`](staging-environment.md) |
