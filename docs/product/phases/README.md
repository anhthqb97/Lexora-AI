# Phase Plans Index

**Version:** 1.0  

Start with [Master Plan](../master-plan.md) · [Doc hub](../../README.md) · [Review sign-off](../../REVIEW-SIGNOFF.md).

## Workflow

1. Read [`development-rules.md`](../../engineering/development-rules.md)
2. Pick **one task** from the **current phase** plan below
3. Branch: `p1/P1-T001-short-desc` (task ID drives branch prefix)
4. Finish task DoD → **one commit**: `P1-T001: description`
5. Mark task ✅ in the phase file

## Phase files (0 → 6)

| Phase | Name | Document | Tasks | Gate |
|---|---|---|---|---|
| **0** | Discovery & Sign-off | [`phase-0-discovery.md`](phase-0-discovery.md) | P0-T01–P0-T22 | M0 |
| **1** | Platform Foundation | [`phase-1-platform.md`](phase-1-platform.md) | P1-T001–P1-T028 (+ CI/infra) | M1 |
| **2** | Speaking MVP | [`phase-2-speaking.md`](phase-2-speaking.md) | P1-T029–P1-T060 | M2 |
| **3** | TOEIC, Beta & Launch | [`phase-3-toeic-launch.md`](phase-3-toeic-launch.md) | P1-T061–P1-T087 | M3–M5 |
| **4** | Native App & Scale | [`phase-4-native-scale.md`](phase-4-native-scale.md) | P1C-T01–P1C-T22 | M6 |
| **5** | Growth | [`phase-5-growth.md`](phase-5-growth.md) | P2-T01–P2-T32 | M8–M9 |
| **6** | Scale & SEA | [`phase-6-scale-sea.md`](phase-6-scale-sea.md) | P3-T01–P3-T28 | M10 |

**MVP overview (Phases 1–3):** [`phase-1-mvp-launch.md`](phase-1-mvp-launch.md) — sprint calendar + shared tracks

### Task ID vs phase number

| Phase | Task prefix | Notes |
|---|---|---|
| 0 | `P0-T*` | Discovery |
| 1–3 | `P1-T*` | MVP build — prefix stays `P1` (no renumber) |
| 4 | `P1C-T*` | Native (legacy prefix) |
| 5 | `P2-T*` | Growth (legacy prefix) |
| 6 | `P3-T*` | Scale (legacy prefix) |

## Templates & rules

| Document | Purpose |
|---|---|
| [`TASK-TEMPLATE.md`](TASK-TEMPLATE.md) | Task detail format |
| [`development-rules.md`](../../engineering/development-rules.md) | Git, commit, code rules |
| [`.cursor/rules/lexora-development.mdc`](../../../.cursor/rules/lexora-development.mdc) | Cursor AI rules |

## Commit format

```
{task-id}: {content}
```

**Strict rules:** See [`development-rules.md`](../../engineering/development-rules.md) §3 — regex enforced by `pr-gate.yml` (P1-T104).

Example: `P1-T036: implement speak transcribe AI respond loop`

## Status

| Symbol | Meaning |
|---|---|
| ⬜ | Not started |
| 🔄 | In progress |
| ✅ | Done + committed |
| ❌ | Cancelled |

## Phase dependency

```
0 → 1 → 2 → 3 → 4 → 5 → 6
         └─ MVP web launch (M5) at end of Phase 3
```
