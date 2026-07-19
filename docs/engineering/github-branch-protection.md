# GitHub — Repository & Branch Protection

**Version:** 1.0  
**Status:** Repo live · Branch protection — **enable manually** (see §2)  
**Task:** P0-T22  
**Repository:** [github.com/anhthqb97/Lexora-AI](https://github.com/anhthqb97/Lexora-AI)

---

## 1. Repository (complete)

| Item | Value |
|---|---|
| Remote (SSH) | `git@github.com:anhthqb97/Lexora-AI.git` |
| Remote (HTTPS) | `https://github.com/anhthqb97/Lexora-AI.git` |
| Default branch | `main` |
| Clone | `git clone git@github.com:anhthqb97/Lexora-AI.git` |

**Phase 0 exception:** Direct push to `main` allowed for docs-only Phase 0 tasks per [`development-rules.md`](development-rules.md). Remove after **M0**.

---

## 2. Branch protection — enable on GitHub

**Settings → Branches → Add branch ruleset** (or classic protection) for `main`:

| Rule | Setting |
|---|---|
| Require pull request before merging | ✅ |
| Required approvals | **1** |
| Dismiss stale reviews | ✅ |
| Require status checks to pass | ✅ (add after P1-T004) |
| Required checks (post P1-T004) | `ci`, `security`, `e2e-smoke`, `pr-gate` |
| Allow force pushes | ❌ |
| Allow deletions | ❌ |
| Restrict who can push | Admins + TL only (optional) |

**Status checks:** Configure required checks **after** P1-T004 merges `ci.yml`. Until then, PR + approval only.

---

## 3. CODEOWNERS (optional, P1-T004)

```
* @anhthqb97
/docs/engineering/ @tech-lead
/docs/product/ @product-team
```

---

## 4. Verification checklist

- [x] Repository created and pushed
- [x] Team can clone from URL above
- [ ] Branch protection rules enabled on `main` (GitHub UI)
- [ ] Required CI checks linked (after P1-T004)

---

## 5. References

| Document | Link |
|---|---|
| CI/CD spec | [`ci-cd.md`](ci-cd.md) |
| Development rules | [`development-rules.md`](development-rules.md) |
| Phase 0 | [`../product/phases/phase-0-discovery.md`](../product/phases/phase-0-discovery.md) |
