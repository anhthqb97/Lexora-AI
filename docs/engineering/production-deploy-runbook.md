# Production Deploy Runbook

**Task:** P1-T095  
**Version:** 1.0  
**Last Updated:** 2026-07-19  
**Owner:** DevOps

---

## 1. Prerequisites

- [ ] All CI checks green on `main`
- [ ] Staging smoke passed (platform + speaking + toeic E2E)
- [ ] Production env vars set in Vercel
- [ ] MongoDB Atlas M10 cluster provisioned
- [ ] On-call rotation confirmed

---

## 2. Deploy Steps

```bash
# 1. Verify local gate
npm run lint && npm run typecheck && npm run test && npm run build

# 2. Merge PR to main (if not direct)
# 3. Vercel auto-deploys main → production

# 4. Post-deploy smoke
curl -f https://lexora.ai/api/v1/health
npm run test:e2e:smoke  # against production URL if configured

# 5. Seed TOEIC questions (first deploy only)
npm run db:seed-toeic  # with MONGODB_URI=production (manual, guarded)

# 6. Create indexes
npm run db:create-indexes
```

---

## 3. Rollback

| Step | Action |
|---|---|
| 1 | Vercel Dashboard → Deployments → Promote previous |
| 2 | Verify `/api/v1/health` |
| 3 | Notify #incidents |
| 4 | Root cause within 24h |

**Do not** force-push `main`. Roll forward preferred for schema changes.

---

## 4. Post-Deploy Verification

- [ ] Login (email OTP + Google)
- [ ] Speaking session end-to-end
- [ ] TOEIC diagnostic completes
- [ ] MoMo sandbox → production checkout (small amount)
- [ ] Sentry receiving events
- [ ] Uptime monitor green

---

## 5. Environment Variables (Production)

See [`infra-environments.md`](infra-environments.md) and [`secrets-policy.md`](secrets-policy.md).

Required: `MONGODB_URI`, `NEXTAUTH_SECRET`, `OPENAI_API_KEY`, `AZURE_SPEECH_*`, payment keys, `SENTRY_DSN`.

---

## References

| Document | Link |
|---|---|
| CI/CD | [`ci-cd.md`](ci-cd.md) |
| Staging | [`staging-environment.md`](staging-environment.md) |
