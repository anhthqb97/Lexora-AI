# Task Template — Phase Plans

**Version:** 1.0  

Use this structure for every task in phase plan files.

---

## Task entry format

```markdown
### P1-T001 — Scaffold Next.js modular monolith

| Field | Value |
|---|---|
| **ID** | P1-T001 |
| **Owner** | Dev |
| **Sprint** | 1 |
| **Points** | 3 |
| **Status** | ⬜ |

**Scope:**
- Initialize Next.js 15 App Router + TypeScript + Tailwind
- Create `lib/modules/` folder structure (auth, user, speaking, toeic, billing)
- Create `app/api/v1/` route stub folders
- Add `docker-compose.yml` for local MongoDB + Redis

**Files (expected):**
- `package.json`, `app/layout.tsx`, `lib/modules/README.md`
- `docker-compose.yml`

**DoD:**
- [ ] `npm run dev` starts without error
- [ ] Folder structure matches `docs/engineering/tdd-platform.md`
- [ ] Lint + typecheck pass

**Commit:**
```
P1-T001: scaffold Next.js modular monolith
```

**Branch:**
```
p1/P1-T001-monolith-scaffold
```
```

---

## Status legend

| Symbol | Meaning |
|---|---|
| ⬜ | Not started |
| 🔄 | In progress |
| ✅ | Done + committed |
| ❌ | Cancelled |

---

## Rules

- **One task → one commit** when DoD complete
- Commit format: `{task-id}: {content}`
- See [`development-rules.md`](../../engineering/development-rules.md)
