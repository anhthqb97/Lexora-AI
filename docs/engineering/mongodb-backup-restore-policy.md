# MongoDB Atlas Backup & Restore Policy

**Task:** P1-T098  
**Version:** 1.0  
**Last Updated:** 2026-07-19  
**Owner:** DevOps

---

## 1. Scope

All production data in MongoDB Atlas cluster `lexora-prod`:

- Users, profiles, subscriptions
- Speaking sessions, turns, summaries
- TOEIC questions, attempts

---

## 2. Backup Schedule

| Type | Frequency | Retention | Atlas tier |
|---|---|---|---|
| Continuous cloud backup | Always (M10+) | 7 days PITR | Required |
| Daily snapshot | 02:00 UTC | 30 days | M10+ |
| Pre-deploy snapshot | Manual before major release | 90 days | On-demand |

---

## 3. Restore Procedures

### Point-in-time restore (PITR)

1. Atlas → Cluster → Backup → Restore
2. Select timestamp (before incident)
3. Restore to **new** cluster `lexora-prod-restore-YYYYMMDD`
4. Update `MONGODB_URI` in Vercel (maintenance window)
5. Verify health + sample user data
6. Delete old cluster after 7 days

### Single collection restore

Use `mongodump` / `mongorestore` for non-prod recovery only.

---

## 4. RTO / RPO

| Metric | Target |
|---|---|
| RPO (max data loss) | ≤1 hour |
| RTO (restore to service) | ≤4 hours |

---

## 5. Testing

- Quarterly restore drill to staging cluster
- Document drill date in ops log

---

## 6. Access Control

- Backup restore: DevOps + TL only
- Audit log in Atlas for restore events

---

## References

| Document | Link |
|---|---|
| Data model | [`data-model.md`](data-model.md) |
| Secrets policy | [`secrets-policy.md`](secrets-policy.md) |
