# OpenAI — Provisioning & Billing Alerts

**Version:** 1.0  
**Status:** Runbook  
**Task:** P0-T17  
**Last Updated:** 2026-07-19

---

## 1. Organization setup

1. [platform.openai.com](https://platform.openai.com) → create or use org **Lexora AI**  
2. Settings → **Organization** → add team members (TL, AI Engineer, PM read-only)  
3. Settings → **Billing** → add payment method  

---

## 2. API keys

| Key | Purpose | Storage |
|---|---|---|
| **Staging** | Preview + Development on Vercel | Vercel env `OPENAI_API_KEY` |
| **Production** | Production env only (P1-T095) | Vercel Production env — separate key |

Create at: API Keys → **Create new secret key** → name `lexora-staging`.

**Never** commit keys. Rotate if exposed.

---

## 3. Spend controls

| Control | Setting |
|---|---|
| Monthly budget | **$500** (adjust with PM) |
| Alert threshold | **80%** of budget → email TL + PM |
| Hard limit | Enable usage cap when available |

Settings → **Billing** → **Usage limits** / **Notifications**.

---

## 4. Validation test

```bash
export OPENAI_API_KEY="sk-..."

curl -s https://api.openai.com/v1/chat/completions \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o",
    "messages": [{"role": "user", "content": "Say hello in one word."}],
    "max_tokens": 10
  }'
```

**Pass:** HTTP 200 with `choices[0].message.content`.

Add key to Vercel → **lexora-ai** → Environment Variables → Preview + Development.

---

## 5. Cost reference

Per-session estimate: [`unit-economics-speaking.md`](../product/unit-economics-speaking.md) (~$0.05 LLM / 10-min session).

---

## 6. References

| Document | Link |
|---|---|
| Secrets policy | [`secrets-policy.md`](secrets-policy.md) |
| Staging env | [`staging-environment.md`](staging-environment.md) |
| TDD Speaking | [`tdd-speaking.md`](tdd-speaking.md) |
