# Secrets & Environment Variables Policy

**Version:** 1.0  
**Status:** Approved (P0-T15, 2026-07-19)  
**Owner:** Architect / Technical Lead  
**Task:** P0-T15

---

## 1. Rules

| Rule | Detail |
|---|---|
| **Never commit secrets** | No API keys, passwords, or connection strings in git |
| **Template only in repo** | Root [`.env.example`](../../.env.example) — placeholders only |
| **Local secrets** | Copy `.env.example` → `.env.local` (gitignored) |
| **Staging / prod secrets** | Vercel environment variables per project |
| **Rotation** | Quarterly or immediately on suspected leak |

---

## 2. Variable catalog

Canonical list: [`tech-stack.md`](tech-stack.md) §10.

| Variable | Required (local) | Required (staging) | Holder |
|---|---|---|---|
| `MONGODB_URI` | ✅ Docker | ✅ Atlas staging | TL + Vercel |
| `UPSTASH_REDIS_*` | ✅ Docker | ✅ Upstash | TL + Vercel |
| `AUTH_SECRET` | ✅ | ✅ | TL + Vercel |
| `OPENAI_API_KEY` | Optional (Ollama) | ✅ | PM + TL · Vercel |
| `SPEECH_PROVIDER` | `mock` | `azure` (post P0-T16) | Dev |
| `AZURE_SPEECH_*` | — | ✅ post P0-T16 | TL · Vercel |
| `MOMO_*` / `VNPAY_*` | Sandbox optional | ✅ sandbox | TL · Vercel |
| `RESEND_API_KEY` | — | ✅ post P0-T18 | TL · Vercel |
| `SMS_PROVIDER_*` | — | ✅ post P0-T19 | TL · Vercel |

---

## 3. Secret storage by environment

| Environment | Storage | Access |
|---|---|---|
| **Local** | `.env.local` on developer machine | All engineers |
| **Staging** | Vercel → Project → Environment Variables (Preview + Development) | TL, DevOps, CI |
| **Production** | Vercel → Production env vars | TL only (write); DevOps read for deploy |
| **Backup / audit** | 1Password vault `Lexora-Engineering` | TL, PM (billing keys) |

**No shared `.env` files in Slack, email, or Notion.**

---

## 4. Onboarding workflow

```bash
git clone git@github.com:anhthqb97/Lexora-AI.git
cp .env.example .env.local
# Fill local values; request staging keys from TL via 1Password
```

Docker local stack: [`local-development.md`](local-development.md) (P1-T003).

---

## 5. CI / GitHub Actions

- Secrets stored in **GitHub Repository Secrets** (not in workflow YAML values)
- Names: `VERCEL_TOKEN`, `MONGODB_URI_TEST`, etc. — added at P1-T004
- PR workflows use read-only test credentials only

---

## 6. References

| Document | Link |
|---|---|
| Tech stack §10 | [`tech-stack.md`](tech-stack.md) |
| Infra environments | [`infra-environments.md`](infra-environments.md) |
| Development rules | [`development-rules.md`](development-rules.md) |
