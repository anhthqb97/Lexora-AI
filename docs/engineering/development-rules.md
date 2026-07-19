# Development Rules — Lexora AI

**Version:** 1.0
**Status:** Approved
**Owner:** Technical Lead
**Last Updated:** 2026-07-19

Common rules for all contributors — git, commits, code, and task workflow.

> Adjust with Technical Lead approval. Changes to this doc require TL sign-off.

---

## 1. Workflow Overview

```
Pick task → Branch → Implement code → Add/update test automation → Run automation locally → Commit (auto) → Push → PR
```

| Step | Rule |
|---|---|
| 1 | Work **one task at a time** from [`phases/`](../product/phases/) |
| 2 | Task ID must match phase plan (e.g. `P1-T001`) |
| 3 | **Finish code first**, then add or update **automated test cases** for that change |
| 4 | **Run automation locally** — all applicable tests must pass **before commit/push** |
| 5 | **Auto-commit when finish** — as soon as DoD is met, **commit in the same session** (see §3.6) |
| 6 | **One task = one commit** (when task DoD is met) |
| 7 | Do not mix unrelated changes in one commit |
| 8 | **Push immediately after commit** (Phase 0 docs → `main`; Sprint 1+ → task branch + PR) |

---

## 2. Git Rules

### 2.1 Branches

| Type | Pattern | Example |
|---|---|---|
| Feature (task) | `{phase}/{task-id}-{short-desc}` | `p1/P1-T001-monolith-scaffold` |
| Bugfix | `fix/{task-id}-{short-desc}` | `fix/P1-T064-beta-speech-accuracy` |
| Docs only | `docs/{task-id}-{short-desc}` | `docs/P0-T09-tdd-finalize` |

**Base branch:** `main` · **Remote:** [github.com/anhthqb97/Lexora-AI](https://github.com/anhthqb97/Lexora-AI)

**Push to `main` — allowed:**
- **Phase 0 (until M0):** commit **and push directly to `main`** — no feature branch, no PR required
- **Sprint 1+ (P1-T001+):** use task branch + PR; **no direct push to `main`** unless TL hotfix waiver

**Phase 0 flow (direct to `main`):**
```bash
git checkout main
git pull origin main
# ... implement task ...
git add <task-files>
git commit -m "P0-T11: break phase 1 into estimated sprint backlog"
git push origin main
```

**Sprint 1+ flow (task branch + PR):**
```bash
git checkout main
git pull origin main
git checkout -b p1/P1-T001-monolith-scaffold
# ... work ...
git commit -m "P1-T001: scaffold Next.js modular monolith"
git push -u origin p1/P1-T001-monolith-scaffold
# open PR → review → merge
```

### 2.2 Pull Requests

- One PR per task (preferred) or per small epic with TL approval
- PR title: `{task-id}: {short description}` — same as commit
- Link task ID in PR description
- Require 1 approval (TL or delegate) before merge
- **All GitHub Actions must pass** — lint, format, typecheck, test, build, security, e2e smoke (see [`ci-cd.md`](ci-cd.md))
- PR title must match `{task-id}: {description}`
- CI must pass (lint, format, typecheck, unit tests, build, security audit, E2E smoke)
- Squash merge optional — **keep commit message as task-id format**

### 2.3 Protected Rules

- No force push to `main` unless rewriting forbidden trailers (TL approval; use `--force-with-lease`)
- **Phase 0:** direct commit **and push to `main` allowed** until M0
- **Sprint 1+:** no direct commits/pushes to `main` (use PR)
- No `--no-verify` unless TL explicitly approves
- No secrets in git (`.env`, keys, credentials)

---

## 3. Commit Rules (strict)

> **Enforced by:** local discipline + `pr-gate.yml` (P1-T104) on every PR. Violations **block merge**.

### 3.1 Format (required — exact)

```
{task-id}: {content}
```

**Single-line subject only.** No body, no footer, no multi-paragraph commits.

| Part | Rule | Valid | Invalid |
|---|---|---|---|
| `task-id` | From phase plan; regex `^(P0-T\d+\|P1-T\d+\|P1C-T\d+\|P2-T\d+\|P3-T\d+)$` | `P1-T001` | `p1-t001`, `T001`, `fix stuff` |
| `content` | Lowercase imperative; 3–72 chars; `[a-z0-9 /-]` only | `add mongodb connection` | `Add MongoDB.`, `WIP`, `fix` |
| Separator | Exactly one colon + one space after task-id | `P1-T001: scaffold app` | `P1-T001 - scaffold`, `P1-T001:scaffold` |

**Regex (full message):**

```
^(P0-T\d+|P1-T\d+|P1C-T\d+|P2-T\d+|P3-T\d+): [a-z0-9][a-z0-9 /-]{2,71}$
```

**Examples (valid):**

```
P0-T02: complete Azure speech engine spike
P1-T001: scaffold Next.js modular monolith
P1-T006: add email password register and login
P1-T036: implement speak transcribe AI respond loop
```

### 3.2 Forbidden in commit messages (never)

| Forbidden | Why |
|---|---|
| `WIP`, `temp`, `fixup`, `squash`, `test`, `debug` alone | Not descriptive; use proper task scope |
| Multiple task IDs in one commit | One task = one commit |
| `Co-authored-by:` (any bot, AI tool, or agent) | Commits are human-authored project records |
| `Generated-by`, `Created-with`, `AI-assisted` | No AI tool attribution in git history |
| `model`, `fine-tune`, `training`, `trainer`, `llm train` | No ML training references in commits — app work only |
| `As an AI language model` or similar | Never in repo history |
| Emojis, Vietnamese diacritics in subject | ASCII lowercase only for `content` |
| Trailing period | Imperative style, no `.` at end |
| Empty or generic content (`update`, `changes`, `misc`) | Must describe the task outcome |

**Commits describe application/documentation work for the task ID — not AI model work, not tool attribution.**

### 3.3 One task = one commit (strict)

| Rule | Detail |
|---|---|
| Scope | Exactly **one** task ID per commit |
| Branch | Branch name must include same task ID: `p1/P1-T001-monolith-scaffold` |
| PR title | Must **equal** commit message (single-commit PRs) |
| Files | Only files required for that task — no drive-by refactors |
| Amend | **Forbidden** after push; fix forward with new commit on new task if needed |
| Merge commits | **Forbidden** on feature branches — rebase on `main` before PR |
| `--no-verify` | **Forbidden** unless TL written approval |

### 3.4 When to commit

Commit when **all** DoD items are met:

- [ ] Code implements **this task only**
- [ ] Automated tests added/updated and passing locally
- [ ] `npm run lint && npm run typecheck && npm run test` pass
- [ ] Commit message matches regex §3.1 exactly
- [ ] Task ID on branch matches commit task ID
- [ ] No forbidden patterns §3.2

**Do not commit:** half-finished work · multiple tasks · WIP · fixups without TL approval

### 3.5 Multi-file tasks

One task may touch many files — still **exactly one commit** when the whole task is done.

### 3.6 Auto-commit when finish (mandatory)

When a task reaches DoD (§6), **commit immediately** — same session, same task branch (or `main` for Phase 0 docs).

| Rule | Detail |
|---|---|
| **When** | Right after code/docs complete **and** local checks pass (tests for code tasks) |
| **Who** | Developer **or** coding assistant — **must run `git commit`**, not defer to user |
| **Message** | Exact `{task-id}: {content}` per §3.1 — use canonical message from phase plan when listed |
| **Scope** | Task files only + mark task ✅ in phase plan (same commit if same task) |
| **Push** | **Required** after commit — do not leave commits unpushed at end of task |
| **Never** | Finish work and stop with dirty tree · ask user to commit finished task · batch multiple tasks |

**Phase 0 (docs on `main`):**

```bash
git add <task-files>
git commit -m "P0-T11: break phase 1 into estimated sprint backlog"
git push origin main
```

**Sprint 1+ (code on task branch):**

```bash
git add <task-files>
git commit -m "P1-T001: scaffold Next.js modular monolith"
git push -u origin p1/P1-T001-monolith-scaffold
# open PR — title equals commit message
```

**Coding assistants (Cursor, etc.):** finishing a user-assigned task = **commit + push** are part of DoD unless push is blocked (no network, no auth). Report blocker; do not skip commit step.

### 3.7 Docs-only tasks

Same strict format:

```
P0-T09: finalize platform and speaking TDD docs
```

---

## 4. Task ID Reference

| Phase | ID pattern | Plan file |
|---|---|---|
| Phase 0 | `P0-T01` … `P0-T22` | [`phase-0-discovery.md`](../product/phases/phase-0-discovery.md) |
| Phase 1 (Platform) | `P1-T001` … `P1-T028` | [`phase-1-platform.md`](../product/phases/phase-1-platform.md) |
| Phase 2 (Speaking) | `P1-T029` … `P1-T060` | [`phase-2-speaking.md`](../product/phases/phase-2-speaking.md) |
| Phase 3 (Launch) | `P1-T061` … `P1-T104` | [`phase-3-toeic-launch.md`](../product/phases/phase-3-toeic-launch.md) |
| MVP overview | — | [`phase-1-mvp-launch.md`](../product/phases/phase-1-mvp-launch.md) |
| Phase 4 | `P1C-T01` … `P1C-T22` | [`phase-4-native-scale.md`](../product/phases/phase-4-native-scale.md) |
| Phase 5 | `P2-T01` … `P2-T32` | [`phase-5-growth.md`](../product/phases/phase-5-growth.md) |
| Phase 6 | `P3-T01` … `P3-T28` | [`phase-6-scale-sea.md`](../product/phases/phase-6-scale-sea.md) |

Update task status in phase plan: ⬜ → 🔄 → ✅

---

## 5. Code Rules

### 5.1 Stack (MVP)

Follow [`tech-stack.md`](tech-stack.md) and [`architecture-decision-record.md`](architecture-decision-record.md):

- Next.js 15 App Router + TypeScript
- MongoDB + Mongoose
- Module boundaries: `lib/modules/*`
- Route handlers thin; logic in modules

### 5.2 Structure

```
app/           → pages + api/v1 route handlers (thin)
lib/modules/   → business logic (one module per domain)
lib/ai/        → LLM client, prompts
lib/speech/    → Azure Speech client
components/    → UI
```

**Do not** put business logic in `app/api/` route files.

### 5.3 Naming

| Item | Convention |
|---|---|
| Files | kebab-case `session-service.ts` |
| Components | PascalCase `SpeakingHome.tsx` |
| Functions | camelCase `createSession()` |
| Types | PascalCase `SpeakingSession` |
| MongoDB collections | snake_case `speaking_sessions` |
| Env vars | SCREAMING_SNAKE `MONGODB_URI` |

### 5.4 TypeScript

- Strict mode enabled
- No `any` without TL comment
- Shared types in module `types.ts`

### 5.5 API

- Base path: `/api/v1/`
- Follow [`api-contracts.md`](api-contracts.md)
- Errors: `{ error: { code, message } }`

### 5.6 AI / Speech

- API keys server-side only — never in client
- Load prompts from `docs/AI/` — do not hardcode tutor persona in random files
- Apply [`guardrails.md`](../AI/guardrails.md)
- **Commit messages** describe app/doc task work only — never ML training, model fine-tuning, or AI tool attribution (see §3.2)

### 5.7 UI

- Mobile-first (375px)
- Vietnamese primary copy
- Follow [`design-system.md`](../design/design-system.md)

### 5.8 Tests & automation (required)

| Layer | Tool | When | Command |
|---|---|---|---|
| Unit | Vitest | Every code task | `npm run test` |
| Integration | Vitest | API routes | `npm run test` |
| E2E | Playwright | UI / user flows | `npm run test:e2e:smoke` |

#### Rule: test automation before push

**Every code task** must follow this order:

```
1. Finish implementation
2. Add or update automated test(s) in the same task/branch
3. Run automation locally — fix until green
4. Commit immediately (auto-commit — §3.6)
5. Push (only if local automation passed)
6. Mark task ✅ in phase plan (same commit if not already included)
```

**Do not push** if unit, integration, or applicable E2E tests fail locally. CI is a second gate — not a substitute for local runs.

| Change type | Required automation |
|---|---|
| `lib/modules/*` service | Unit test(s) for new/changed behavior |
| `app/api/v1/*` route | Integration test for endpoint |
| UI page or user flow | E2E spec add/update + `npm run test:e2e:smoke` |
| Bug fix | Regression test that would have caught the bug |

Map test cases to test plan IDs where possible (`TP-*`, `TS-*`). See [`test-automation-e2e.md`](../qa/test-automation-e2e.md).

#### Commands (run after code finish, before push)

```bash
# Always
npm run lint && npm run typecheck && npm run test

# UI / flow changes (after P1-T099)
npm run test:e2e:smoke

# Full local gate (recommended before push)
npm run test:all    # planned in P1-T100 — lint + typecheck + unit + e2e smoke
```

**CI (required on PR):** `ci.yml` + `e2e.yml` — see [`ci-cd.md`](ci-cd.md).

**No merge** with red CI. **No push** with red local automation.

---

## 6. Definition of Done (Global)

Every task is done when:

1. Scope in phase plan is complete
2. Acceptance criteria met (if listed on task)
3. **Automated tests written/updated and run locally — all pass** (code tasks)
4. Lint, typecheck pass (code tasks)
5. No P0/P1 bugs introduced
6. One commit with correct `{task-id}: {content}` format — **committed in same session**
7. **Pushed** — only after local automation green; **never leave finished task unpushed**
8. Task marked ✅ in phase plan
9. PR merged (Sprint 1+ code) or direct to `main` (Phase 0 docs until M0)

---

## 7. Technical Lead Adjustments

Technical Lead may adjust:

- Commit format exceptions (document in PR)
- One PR for multiple small tasks (same sprint, TL approval)
- Branch naming for hotfixes
- Stack choices within ADR bounds
- Task order within a sprint

Document adjustments in PR description or team channel. Update this file when policy changes.

---

## 8. Quick Reference

```bash
# Start task P1-T001
git checkout main && git pull
git checkout -b p1/P1-T001-monolith-scaffold

# Finish task — ORDER MATTERS (auto-commit when finish)
# 1. Finish code
# 2. Add/update automated tests for this task
# 3. Run automation (must pass before commit)
npm run lint && npm run typecheck && npm run test
npm run test:e2e:smoke   # if UI/flow changed (after P1-T099)

# 4. Commit immediately — do not defer
git add -A
git commit -m "P1-T001: scaffold Next.js modular monolith"

# 5. Push — required after commit
git push -u origin p1/P1-T001-monolith-scaffold

# 6. Mark task ✅ in docs/product/phases/
```

---

## 9. References

| Document | Link |
|---|---|
| Master plan | [`../product/master-plan.md`](../product/master-plan.md) |
| Phase plans | [`../product/phases/README.md`](../product/phases/README.md) |
| Tech stack | [`tech-stack.md`](tech-stack.md) |
| ADR | [`architecture-decision-record.md`](architecture-decision-record.md) |
| Test automation | [`../qa/test-automation-e2e.md`](../qa/test-automation-e2e.md) |
