# Lexora AI — Documentation Hub

**Version:** 1.0
**Last reviewed:** 2026-07-19
**Reviewers:** PO, PM, Technical Lead

> **Learn Smarter. Speak Better.**

**For clients:** [`CLIENT-PROPOSAL.md`](CLIENT-PROPOSAL.md) · **Technical review:** [`REVIEW-SIGNOFF.md`](REVIEW-SIGNOFF.md)  
**Repository:** [github.com/anhthqb97/Lexora-AI](https://github.com/anhthqb97/Lexora-AI)

---

## Start here

| Role | Read first |
|---|---|
| **Client / Sponsor** | [`CLIENT-PROPOSAL.md`](CLIENT-PROPOSAL.md) → [`REVIEW-SIGNOFF.md`](REVIEW-SIGNOFF.md) |
| **Everyone** | [`product/brand.md`](product/brand.md) |
| **PO / PM** | [`product/master-plan.md`](product/master-plan.md) → [`product/phases/README.md`](product/phases/README.md) |
| **Tech Lead** | [`engineering/architecture-decision-record.md`](engineering/architecture-decision-record.md) → [`engineering/build-setup-plan.md`](engineering/build-setup-plan.md) |
| **Developers** | [`engineering/build-setup-plan.md`](engineering/build-setup-plan.md) → [`engineering/development-rules.md`](engineering/development-rules.md) |
| **AI Engineer** | [`AI/guardrails.md`](AI/guardrails.md) → [`AI/tutor-speaking-prompt.md`](AI/tutor-speaking-prompt.md) |
| **QA** | [`qa/beta-checklist.md`](qa/beta-checklist.md) |

**Final review:** [`REVIEW-SIGNOFF.md`](REVIEW-SIGNOFF.md) (Round 1 + 2 — approved for client proposal)

---

## Document map

### Requirements & product

| Doc | Purpose | Status |
|---|---|---|
| [`product/brand.md`](product/brand.md) | Brand, requirements, metrics, roadmap | Approved v1.0 |
| [`product/master-plan.md`](product/master-plan.md) | 24-month master plan | Approved v1.0 |
| [`product/phases/`](product/phases/) | Phase plans + task IDs + commits | Active v1.0 |
| [`product/platform/prd-platform.md`](product/platform/prd-platform.md) | Platform PRD | Approved v1.0 |
| [`product/speaking/prd-speaking.md`](product/speaking/prd-speaking.md) | Speaking PRD | Approved v1.0 |
| [`product/toeic/prd-toeic.md`](product/toeic/prd-toeic.md) | TOEIC PRD | Approved baseline (expand Sprint 8) |
| [`product/plan-by-feature.md`](product/plan-by-feature.md) | Doc file inventory | Active |
| [`product/feature-catalog.md`](product/feature-catalog.md) | **Full feature list** — scoped to Ph0–Ph6 | Active v1.0 |
| [`product/phases/README.md`](product/phases/README.md) | **Phase index** (0–6) | Active |
| [`CLIENT-PROPOSAL.md`](CLIENT-PROPOSAL.md) | Client / stakeholder proposal | Ready |
| [`REVIEW-SIGNOFF.md`](REVIEW-SIGNOFF.md) | Final review (Round 1 + 2) | Ready |

### Architecture & engineering

| Doc | Purpose | Status |
|---|---|---|
| [`engineering/architecture-decision-record.md`](engineering/architecture-decision-record.md) | ADRs — binding decisions | **Approved** |
| [`engineering/tech-stack.md`](engineering/tech-stack.md) | MVP + target stack | Approved v1.0 |
| [`engineering/build-setup-plan.md`](engineering/build-setup-plan.md) | **Build/setup order** — stack + automation + tasks | Plan |
| [`engineering/tdd-platform.md`](engineering/tdd-platform.md) | Platform system design | Approved baseline |
| [`engineering/tdd-speaking.md`](engineering/tdd-speaking.md) | Speaking system design | Approved baseline |
| [`engineering/data-model.md`](engineering/data-model.md) | MongoDB schemas | Approved v1.0 |
| [`engineering/api-contracts.md`](engineering/api-contracts.md) | REST API | Approved v1.0 |
| [`engineering/local-development.md`](engineering/local-development.md) | Local Docker spec (P1-T003) | Plan — not implemented |
| [`engineering/ci-cd.md`](engineering/ci-cd.md) | GitHub Actions CI + E2E | Plan — P1-T004, P1-T100 |
| [`engineering/infra-environments.md`](engineering/infra-environments.md) | Staging/prod env spec | Approved baseline |
| [`engineering/feasibility-speech.md`](engineering/feasibility-speech.md) | Speech spike plan | Pending spike (P0-T02) |
| [`engineering/development-rules.md`](engineering/development-rules.md) | Git, **strict** commit, test rules | **Approved v1.0** |

### Design & UX

| Doc | Purpose | Status |
|---|---|---|
| [`design/workflow-overview-detail.md`](design/workflow-overview-detail.md) | Flowcharts overview + detail | Approved |
| [`design/design-system.md`](design/design-system.md) | Colors, typography, UI | Approved |
| [`design/ux-platform.md`](design/ux-platform.md) | Platform UX spec | Approved baseline |
| [`design/ux-speaking.md`](design/ux-speaking.md) | Speaking UX spec | Approved baseline |

### AI

| Doc | Purpose | Status |
|---|---|---|
| [`AI/system-prompts.md`](AI/system-prompts.md) | Team + brand context for AI agents | Active |
| [`AI/tutor-speaking-prompt.md`](AI/tutor-speaking-prompt.md) | Speaking tutor prompt | Approved |
| [`AI/guardrails.md`](AI/guardrails.md) | Shared AI safety rules | Approved |

### QA

| Doc | Purpose | Status |
|---|---|---|
| [`qa/test-automation-e2e.md`](qa/test-automation-e2e.md) | E2E + CI test strategy | Plan — P1-T099+ |
| [`qa/test-plan-platform.md`](qa/test-plan-platform.md) | Platform tests | Approved baseline |
| [`qa/test-plan-speaking.md`](qa/test-plan-speaking.md) | Speaking tests | Approved baseline |
| [`qa/beta-checklist.md`](qa/beta-checklist.md) | Launch gates | Approved |

---

## Canonical vs supporting docs

| Canonical (use these) | Supporting (reference only) |
|---|---|
| `master-plan.md` + `phases/*` | `plan-phase1-breakdown.md` (sprint detail archive) |
| `speaking/prd-speaking.md` | `prd-lexora-speaking.md` (redirect stub) |
| `phases/phase-1-mvp-launch.md` | `platform/plan-platform.md`, `speaking/plan-speaking.md` (feature epics) |
| `architecture-decision-record.md` | Historical stack discussions |

---

## Documentation governance

1. **ADRs are binding** — code must follow [`architecture-decision-record.md`](engineering/architecture-decision-record.md)
2. **One task = one commit** — see [`development-rules.md`](engineering/development-rules.md)
3. **PRD changes** require PM sign-off; **ADR changes** require Tech Lead sign-off
4. **Status labels:** Draft → Approved baseline → Approved (post-M0/M5)
5. Update this README when adding new doc categories

---

## Architecture summary (approved)

**MVP (Phases 1–3):** Next.js modular monolith · MongoDB · OpenAI GPT-4o · Azure Speech · Vercel

**Target (Phase 2+):** Microservices · self-hosted LLM · Expo · Kubernetes

See ADR-001 through ADR-008.
