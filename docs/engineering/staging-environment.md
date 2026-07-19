# Staging Environment — Lexora AI

**Version:** 1.0  
**Status:** Vercel provisioned · Atlas + Upstash — follow §2–3  
**Task:** P0-T14  
**Last Updated:** 2026-07-19

---

## 1. Overview

| Service | Status | Region |
|---|---|---|
| **Vercel** | ✅ Project `lexora-ai` created | Edge (Singapore nearest) |
| **MongoDB Atlas** | ⏳ Create per §2 | `ap-southeast-1` (Singapore) |
| **Upstash Redis** | ⏳ Create per §3 | Singapore |

**Secrets:** Store all connection strings in **Vercel → Project → Settings → Environment Variables** (Preview + Development). Never commit to git.

---

## 2. Vercel (provisioned)

| Field | Value |
|---|---|
| Project name | `lexora-ai` |
| Project ID | `prj_egkriGWyFNC3g5dJ9xU4rj4FHDR2` |
| Team | `anhthqb97s-projects` |
| Dashboard | [vercel.com/anhthqb97s-projects/lexora-ai](https://vercel.com/anhthqb97s-projects/lexora-ai) |
| Production URL | `https://lexora-ai.vercel.app` (live after P1-T001 first deploy) |
| Preview URL | `https://lexora-ai-<hash>-anhthqb97s-projects.vercel.app` |

### Connect GitHub (manual)

1. Vercel Dashboard → **lexora-ai** → Settings → Git  
2. Connect repository: `anhthqb97/Lexora-AI`  
3. Production branch: `main`  
4. Enable preview deployments on PRs  

---

## 3. MongoDB Atlas staging

### Create cluster

1. [cloud.mongodb.com](https://cloud.mongodb.com) → New Project **`Lexora`**  
2. Build Database → **M0 Free** or **M10** (staging)  
3. Provider: **AWS** · Region: **Singapore (ap-southeast-1)**  
4. Cluster name: **`lexora-staging`**  

### Access

1. Database Access → user `lexora-staging-app` (readWrite on `lexora`)  
2. Network Access → allow **0.0.0.0/0** for Vercel (or Vercel IP list)  
3. Connect → Drivers → copy `MONGODB_URI`  

### Vercel env var

| Variable | Environments |
|---|---|
| `MONGODB_URI` | Preview, Development |

---

## 4. Upstash Redis staging

### Create database

1. [console.upstash.com](https://console.upstash.com) → Create database  
2. Name: **`lexora-staging`**  
3. Region: **Singapore (ap-southeast-1)**  
4. Type: Regional · REST API **enabled**  

### Vercel env vars

| Variable | Environments |
|---|---|
| `UPSTASH_REDIS_REST_URL` | Preview, Development |
| `UPSTASH_REDIS_REST_TOKEN` | Preview, Development |

---

## 5. Staging env vars checklist (Vercel)

Set after P0-T15–P0-T19 as each provider is ready:

| Variable | Source task | Required for Sprint 1 |
|---|---|---|
| `MONGODB_URI` | P0-T14 §3 | ✅ P1-T002 |
| `UPSTASH_REDIS_REST_URL` | P0-T14 §4 | ✅ P1-T088 |
| `UPSTASH_REDIS_REST_TOKEN` | P0-T14 §4 | ✅ P1-T088 |
| `AUTH_SECRET` | Generate locally | ✅ P1-T006 |
| `OPENAI_API_KEY` | P0-T17 | Sprint 3 |
| `SPEECH_PROVIDER` | `mock` until P0-T16 | Sprint 1–2 |
| `NEXT_PUBLIC_APP_URL` | Preview URL | ✅ P1-T001 |

Full catalog: [`.env.example`](../../.env.example) · [`secrets-policy.md`](secrets-policy.md)

---

## 6. Verification

```bash
# After P1-T001 deploy
curl -s https://lexora-ai.vercel.app/api/v1/health
# Expected: { "status": "ok" } (P1-T089)
```

---

## 7. References

| Document | Link |
|---|---|
| Infra environments | [`infra-environments.md`](infra-environments.md) |
| Local development | [`local-development.md`](local-development.md) |
| Secrets policy | [`secrets-policy.md`](secrets-policy.md) |
