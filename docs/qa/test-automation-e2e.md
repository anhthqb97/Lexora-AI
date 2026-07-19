# E2E Test Automation — Specification (Plan Only)

**Version:** 1.0
**Status:** Plan — **not implemented**
**Owner:** QA Lead + Technical Lead
**Last Updated:** 2026-07-19
**Tool:** Playwright (recommended for Next.js)

> **Do not build ahead of sprint.** Implementation tasks: P1-T004, P1-T099–P1-T102.

---

## 1. Goals

| Goal | How |
|---|---|
| Catch regressions after every code change | CI runs tests on every PR |
| Developer runs tests before commit | Local commands documented |
| Map tests to PRD / test plans | Traceability IDs (TP-*, TS-*) |
| Gate releases | E2E smoke required for M1, M2, M5 |

---

## 2. Test Pyramid (MVP)

```
        ┌─────────────┐
        │  E2E (PW)   │  ← Playwright — smoke + critical paths
        ├─────────────┤
        │ Integration │  ← API route tests (Vitest + supertest)
        ├─────────────┤
        │    Unit     │  ← Module services (Vitest)
        └─────────────┘
```

| Layer | Tool | When runs | Task |
|---|---|---|---|
| Unit | Vitest | Every PR, local pre-commit | P1-T004 |
| Integration | Vitest | Every PR | P1-T004 |
| E2E | Playwright | Every PR (smoke), main (full) | P1-T099–P1-T102 |

---

## 3. Developer workflow — finish code, then test, then push

**Mandatory order for every code task:**

```
Implement code  →  Add/update automated test case  →  Run automation locally  →  Commit  →  Push
                              ↑                              ↑
                         same branch/PR              ALL PASS — or do not push
```

Every feature task must pass applicable tests **after code is finished and before push**:

```bash
# Step 1 — always (after code + tests written)
npm run lint && npm run typecheck && npm run test

# Step 2 — UI / user flows (after P1-T099)
npm run test:e2e:smoke

# Step 3 — push only if green
git push
```

| Task type | Required automation | When to run |
|---|---|---|
| `lib/modules/*` service | Unit tests for that module | Before push |
| `app/api/v1/*` route | Integration test for endpoint | Before push |
| UI page / user flow | E2E spec add/update + smoke | Before push |
| Bug fix | Regression test | Before push |
| Infra / config only | Lint + typecheck; E2E if affects health | Before push |

**Rules:**
- **No push** with failing local automation
- **No PR** without tests for the change (same task/branch)
- If you change auth → add/update `e2e/platform/auth.spec.ts` (same pattern for speaking, billing)
- CI re-runs on push — local run is the first gate

See also: [`development-rules.md`](../engineering/development-rules.md) §5.8

---

## 4. CI/CD — GitHub Actions (required checks)

Full spec: [`ci-cd.md`](../engineering/ci-cd.md)

### 4.1 Workflows

| Workflow | Jobs | Task |
|---|---|---|
| `ci.yml` | lint, format, typecheck, test, coverage, build | P1-T004 |
| `security.yml` | npm audit, dependency review | P1-T104 |
| `pr-gate.yml` | PR title task-id, commit format | P1-T104 |
| `e2e.yml` | Playwright smoke / full | P1-T100 |

### 4.2 Human code review (GitHub)

- **1 approving review** required (TL or CODEOWNER)
- All Actions green before merge
- PR template checklist ([`ci-cd.md`](../engineering/ci-cd.md) §4.6)

### 4.3 `ci.yml` — P1-T004

**Trigger:** `pull_request`, `push` to `main`

| Job | Steps | Blocks merge |
|---|---|---|
| `lint` | ESLint + Prettier check | ✅ Yes |
| `typecheck` | TypeScript | ✅ Yes |
| `test` | Vitest + coverage artifact | ✅ Yes |
| `build` | Next.js production build | ✅ Yes |
| `security/audit` | npm audit high+ | ✅ Yes |
| `pr-gate/validate` | Task-id in PR title + commit | ✅ Yes |
| `e2e/smoke` | Playwright | ✅ Yes |

### 4.4 Workflow: `e2e.yml` (P1-T100)

**Trigger:** `pull_request`, `push` to `main`

| Job | Steps | Blocks merge |
|---|---|---|
| `e2e-smoke` | Start Docker (MongoDB, Redis) → `npm run build` → `npm run test:e2e:smoke` | ✅ Yes |
| `e2e-full` | On `main` only — full Playwright suite against staging URL | ✅ Yes (main) |

**PR flow:**

```
Developer pushes branch
    → ci.yml (lint, format, typecheck, test, build)
    → security.yml (npm audit, dependency review)
    → pr-gate.yml (task-id validation)
    → e2e.yml (smoke)
    → Vercel preview deploy (P1-T004)
    → All green → merge allowed
```

### 4.3 Planned files (implement in tasks)

| File | Task |
|---|---|
| `.github/workflows/ci.yml` | P1-T004 |
| `.github/workflows/e2e.yml` | P1-T100 |
| `playwright.config.ts` | P1-T099 |
| `e2e/fixtures/` | P1-T099 |
| `e2e/smoke/` | P1-T099, P1-T101 |
| `e2e/platform/` | P1-T101 |
| `e2e/speaking/` | P1-T102 |
| `vitest.config.ts` | P1-T004 |

---

## 5. E2E test mapping

### 5.1 Platform (P1-T101) — Sprint 2

| Spec file | Test plan ID | Scenario |
|---|---|---|
| `e2e/platform/auth.spec.ts` | TP-A01, TP-A03 | Register + login |
| `e2e/platform/onboarding.spec.ts` | TP-O01 | Goal + level → dashboard |
| `e2e/platform/dashboard.spec.ts` | TP-D01, TP-D04 | Dashboard load + navigate Speaking |
| `e2e/smoke/health.spec.ts` | — | `/api/v1/health` returns 200 |

### 5.2 Billing (Sprint 3 — part of P1-T101 or follow-up)

| Spec file | Test plan ID | Scenario |
|---|---|---|
| `e2e/platform/billing.spec.ts` | TP-B01, TP-B06 | Free tier + paywall (MoMo mocked) |

### 5.3 Speaking (P1-T102) — Sprint 6

Automates [`test-plan-speaking.md`](test-plan-speaking.md) §7 E2E Smoke:

| Step | Spec |
|---|---|
| Register → onboard → dashboard | `e2e/speaking/session-smoke.spec.ts` |
| Start Speaking → consent → session | same |
| 3+ conversation turns | same (mock STT/LLM in CI) |
| End → summary with scores | same |
| Dashboard updated | same |
| Free limit → paywall | same |

**CI note:** Use `E2E_MOCK_AI=true` to stub Azure/OpenAI in E2E — real speech tests in staging manual QA + P0-T02 spike.

### 5.4 TOEIC (Sprint 8 — future)

| Spec file | Task | When |
|---|---|---|
| `e2e/toeic/diagnostic.spec.ts` | P1-T103 | Sprint 8 |
| `e2e/toeic/mock-exam.spec.ts` | P1-T103 | Sprint 8 |

---

## 6. npm scripts (planned)

| Script | Purpose | Task |
|---|---|---|
| `npm run test` | Vitest unit + integration | P1-T004 |
| `npm run test:e2e` | Full Playwright | P1-T099 |
| `npm run test:e2e:smoke` | Smoke subset for CI | P1-T100 |
| `npm run test:e2e:ui` | Playwright debug UI | P1-T099 |
| `npm run test:all` | lint + typecheck + unit + e2e:smoke | P1-T100 |

---

## 7. Task summary

| ID | Task | Sprint | Owner |
|---|---|---|---|
| P0-T21 | Approve E2E + CI strategy | Phase 0 | QA + TL |
| P1-T004 | CI: lint, format, typecheck, test, build, Vercel preview | 1 | Dev |
| P1-T104 | Security audit + PR gate + CODEOWNERS | 1 | DevOps |
| P1-T099 | Playwright scaffold + fixtures + smoke health | 2 | Dev + QA |
| P1-T100 | GitHub Actions E2E workflow (PR required check) | 2 | DevOps |
| P1-T101 | Platform E2E specs (auth, onboarding, dashboard) | 2 | QA + Dev |
| P1-T102 | Speaking E2E smoke automated | 6 | QA + Dev |
| P1-T103 | TOEIC E2E smoke | 8 | QA + Dev |
| P1-T059 | QA verify E2E green + mobile spot check | 6 | QA |

**Replaces manual-only gate:** P1-T059 confirms P1-T102 suite + manual iOS Safari / Android Chrome spot check before M2.

---

## 8. Acceptance (automation ready)

- [ ] Every PR runs `ci.yml` + `e2e.yml` smoke — merge blocked if red
- [ ] Developer docs: run `npm run test:all` before commit
- [ ] Platform smoke covers TP-A01, TP-A03, TP-O01, TP-D01
- [ ] Speaking smoke covers test-plan §7 (mocked AI in CI)
- [ ] Full E2E runs on `main` against staging
- [ ] Test reports uploaded as GitHub Actions artifacts

---

## 9. References

| Document | Link |
|---|---|
| Platform test plan | [`test-plan-platform.md`](test-plan-platform.md) |
| Speaking test plan | [`test-plan-speaking.md`](test-plan-speaking.md) |
| CI/CD spec | [`../engineering/ci-cd.md`](../engineering/ci-cd.md) |
| Dev rules §5.8 | [`../engineering/development-rules.md`](../engineering/development-rules.md) |
| Phase 1 tasks | [`../product/phases/phase-1-mvp-launch.md`](../product/phases/phase-1-mvp-launch.md) |
