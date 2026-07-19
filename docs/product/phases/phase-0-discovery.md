# Phase 0 — Discovery & Sign-off

**Version:** 1.0  
**Duration:** 2 weeks (Sprint 0)
**Gate:** M0 — Discovery Complete
**Rules:** [`development-rules.md`](../../engineering/development-rules.md) · One task = one commit

> **No production code** until M0 passes. Phase 0 = docs, spikes, provisioning — not app implementation.

---

## Task Summary

| ID | Task | Commit message | Owner | Status |
|---|---|---|---|---|
| P0-T01 | Resolve Speaking PRD open questions | `P0-T01: resolve speaking PRD open questions` | PM | ✅ |
| P0-T02 | Local speech provider (no Azure) | `P0-T02: add local speech provider for dev testing` | AI + Architect | ✅ |
| P0-T03 | Latency test 4G Vietnam | `P0-T03: add latency test report for 4G Vietnam` | AI Engineer | ⬜ |
| P0-T04 | Cost model per session | `P0-T04: document unit economics per speaking session` | PM + Architect | ⬜ |
| P0-T05 | Audio storage + legal decision | `P0-T05: record audio storage privacy decision` | Architect + Legal | ⬜ |
| P0-T06 | Define free tier limits | `P0-T06: define free tier limits in pricing spec` | PM | ⬜ |
| P0-T07 | Approve UX wireframe specs | `P0-T07: approve UX wireframe specs` | PM + Designer | ⬜ |
| P0-T08 | Approve workflow diagrams | `P0-T08: approve workflow overview detail diagrams` | PM + Architect | ⬜ |
| P0-T09 | Finalize TDD platform and speaking | `P0-T09: finalize platform and speaking TDD` | Architect | ⬜ |
| P0-T10 | Create QA test plans | `P0-T10: create platform and speaking QA test plans` | QA Lead | ⬜ |
| P0-T11 | Break Phase 1 sprint backlog | `P0-T11: break phase 1 into estimated sprint backlog` | PM | ✅ `70c0f21` on `main` |
| P0-T12 | PRD walkthrough sign-off | `P0-T12: sign off speaking and platform PRDs` | PM | ⬜ |
| P0-T13 | Sprint 1 planning | `P0-T13: complete sprint 1 planning and commitment` | Full team | ⬜ |
| P0-T14 | Provision staging environments | `P0-T14: provision Vercel MongoDB and Redis staging` | Architect | ⬜ |
| P0-T15 | Env vars template + secrets policy | `P0-T15: document env vars and secrets policy` | Architect | ⬜ |
| P0-T16 | Provision Azure Speech resource | `P0-T16: provision Azure Speech Southeast Asia` | Architect | ⬜ |
| P0-T17 | Provision OpenAI org + billing alerts | `P0-T17: provision OpenAI API keys and billing alerts` | Architect + PM | ⬜ |
| P0-T18 | Provision email provider (auth) | `P0-T18: provision email provider for auth emails` | Architect | ⬜ |
| P0-T19 | Provision SMS OTP provider (+84) | `P0-T19: provision SMS OTP provider for Vietnam` | Architect | ⬜ |
| P0-T20 | Production environment specification | `P0-T20: document production environment specification` | Architect | ⬜ |
| P0-T21 | Approve E2E + CI/CD test strategy | `P0-T21: approve E2E and CI CD test strategy` | QA + TL | ⬜ |
| P0-T22 | GitHub repo + branch protection | `P0-T22: setup GitHub repo and branch protection` | Architect | 🔄 pushed — enable branch protection on GitHub |

---

## Task Details

### P0-T01 — Resolve Speaking PRD open questions

| Field | Value |
|---|---|
| **Owner** | PM |
| **Branch** | `docs/P0-T01-speaking-prd-questions` |

**Scope:** Close 5 open questions in `docs/product/speaking/prd-speaking.md` §10.

**Decisions to record:**
- Free tier: 3 sessions/week
- Vietnamese help: ON A1–A2, OFF B1+
- Speech: Azure Speech Services
- Audio: transcripts only, delete raw after 24h
- TOEIC speaking P1: picture + Q&A only

**DoD:** PRD updated to v1.0; no open questions remaining.

**Commit:** `P0-T01: resolve speaking PRD open questions`

---

### P0-T02 — Local speech provider (no Azure)

| Field | Value |
|---|---|
| **Owner** | AI Engineer + Architect |
| **Branch** | `main` (Phase 0) |

**Scope:** Document and approve local speech testing — [`speech-providers.md`](../../engineering/speech-providers.md). Default `SPEECH_PROVIDER=mock`. Optional `whisper-local`. **Azure deferred to P0-T16 / Sprint 3.**

**DoD:** Local dev path documented; no Azure keys required for Phase 0; feasibility memo updated.

**Commit:** `P0-T02: add local speech provider for dev testing`

---

### P0-T03 — Latency test 4G Vietnam

| Field | Value |
|---|---|
| **Owner** | AI Engineer |
| **Branch** | `docs/P0-T03-latency-report` |

**Scope:** Measure STT ≤2s, AI text ≤3s p95, eval ≤5s p95 from Vietnam network.

**DoD:** Latency report attached or linked in feasibility memo.

**Commit:** `P0-T03: add latency test report for 4G Vietnam`

---

### P0-T04 — Cost model per session

| Field | Value |
|---|---|
| **Owner** | PM + Architect |

**Scope:** Document OpenAI + Azure cost per 10-min speaking session; project at 10K MAL.

**DoD:** Unit economics sheet in `docs/product/` or feasibility memo appendix.

**Commit:** `P0-T04: document unit economics per speaking session`

---

### P0-T05 — Audio storage privacy decision

| Field | Value |
|---|---|
| **Owner** | Architect + Legal |

**Scope:** Decide raw audio policy; PDPD alignment; document in ADR or privacy log.

**DoD:** Decision logged; team sign-off.

**Commit:** `P0-T05: record audio storage privacy decision`

---

### P0-T06 — Define free tier limits

| Field | Value |
|---|---|
| **Owner** | PM |

**Scope:** Free vs paid limits for speaking + TOEIC mock; update platform PRD + brand.

**DoD:** 3 speaking sessions/week; 1 mock/month documented.

**Commit:** `P0-T06: define free tier limits in pricing spec`

---

### P0-T07 — Approve UX wireframe specs

**Scope:** Review `docs/design/ux-platform.md`, `ux-speaking.md`.

**DoD:** PM + Designer sign-off comment or approval note in doc.

**Commit:** `P0-T07: approve UX wireframe specs`

---

### P0-T08 — Approve workflow diagrams

**Scope:** Review `docs/design/workflow-overview-detail.md`.

**DoD:** Flows match PRD; Architect approves.

**Commit:** `P0-T08: approve workflow overview detail diagrams`

---

### P0-T09 — Finalize TDD

**Scope:** Review/update `tdd-platform.md`, `tdd-speaking.md` after spike results.

**DoD:** TDD v1.0 aligned with ADR and spike outcomes.

**Commit:** `P0-T09: finalize platform and speaking TDD`

---

### P0-T10 — QA test plans

**Scope:** Finalize `qa/test-plan-platform.md`, `qa/test-plan-speaking.md`.

**DoD:** Test cases mapped to PRD requirements.

**Commit:** `P0-T10: create platform and speaking QA test plans`

---

### P0-T11 — Sprint backlog

**Scope:** Estimate P1-T001–P1-T028; prioritize Sprint 1–3.

**DoD:** Backlog in phase-1-mvp-launch.md with points assigned.

**Commit:** `P0-T11: break phase 1 into estimated sprint backlog`

---

### P0-T12 — PRD sign-off

**Scope:** Walkthrough Speaking + Platform PRDs with team.

**DoD:** Signed approval (comment in doc or meeting notes).

**Commit:** `P0-T12: sign off speaking and platform PRDs`

---

### P0-T13 — Sprint 1 planning

**Scope:** Team commits to Sprint 1 tasks P1-T001–P1-T008 **+ infra tasks P1-T088–P1-T092**.

**DoD:** Sprint 1 board ready; owners assigned.

**Commit:** `P0-T13: complete sprint 1 planning and commitment`

---

### P0-T14 — Provision staging

**Scope:** Vercel project, MongoDB Atlas staging cluster, Upstash Redis.

**DoD:** Staging URL + env vars documented for team.

**Commit:** `P0-T14: provision Vercel MongoDB and Redis staging`

---

### P0-T15 — Env vars + secrets policy

**Scope:** Create `.env.example`; document all vars from `tech-stack.md` §10; define who holds prod secrets (1Password/Vercel env).

**DoD:** Team can copy `.env.example` → `.env.local`; no secrets in git.

**Commit:** `P0-T15: document env vars and secrets policy`

---

### P0-T16 — Azure Speech provisioning

**Scope:** Azure Speech resource in **Southeast Asia** — **before Sprint 3 staging** (not Phase 0). STT + pronunciation assessment; keys in staging vault. Run 100-sample VN spike **before closed beta**.

**DoD:** Test API call returns transcript from sample audio; VN spike scheduled.

**Commit:** `P0-T16: provision Azure Speech Southeast Asia`

---

### P0-T17 — OpenAI provisioning

**Scope:** Org account; project API key; monthly spend cap + alert at 80%.

**DoD:** Staging key works; billing alert configured.

**Commit:** `P0-T17: provision OpenAI API keys and billing alerts`

---

### P0-T18 — Email provider

**Scope:** Resend or SendGrid; verified sender domain; template for verification/reset emails.

**DoD:** Test email delivered to team inbox from staging.

**Commit:** `P0-T18: provision email provider for auth emails`

---

### P0-T19 — SMS OTP provider

**Scope:** Vietnam-capable SMS (e.g. Twilio, ESMS, Stringee); +84 delivery tested.

**DoD:** OTP delivered to test VN number in staging.

**Commit:** `P0-T19: provision SMS OTP provider for Vietnam`

---

### P0-T20 — Production environment spec

**Scope:** Vercel production project; Atlas **production** cluster (separate from staging); Upstash prod; deploy promotion flow (staging → prod).

**DoD:** Written spec in `docs/engineering/infra-environments.md`; prod URLs defined.

**Commit:** `P0-T20: document production environment specification`

---

### P0-T21 — Approve E2E + CI/CD strategy

**Scope:** Review and sign off [`test-automation-e2e.md`](../../qa/test-automation-e2e.md) + [`ci-cd.md`](../../engineering/ci-cd.md).

**DoD:** QA Lead + TL approve; required PR checks list agreed; Playwright chosen as E2E tool.

**Commit:** `P0-T21: approve E2E and CI CD test strategy`

---

### P0-T22 — GitHub repo + branch protection

**Repo (canonical):** [https://github.com/anhthqb97/Lexora-AI](https://github.com/anhthqb97/Lexora-AI)

**Status:** Repository created (empty). Remaining setup:

**Scope:**
- Confirm remote: `git@github.com:anhthqb97/Lexora-AI.git` (or HTTPS)
- Protect `main` — no direct push; require PR + 1 approval
- Enable required status checks after P1-T004 (`ci.yml`)
- Add repo URL to `docs/README.md` and root `README.md` (P1-T001)

**DoD:** Team can clone from URL above; `main` protected; CI checks configured when P1-T004 lands.

**Commit:** `P0-T22: setup GitHub repo and branch protection`

---

## Source & environment setup (Phase 0 → Sprint 1)

| Category | Phase 0 (accounts / docs) | Sprint 1 (code in repo) |
|---|---|---|
| **Git / source** | P0-T22 — repo + branch protection | P1-T001 — app scaffold + project config |
| **Env template** | P0-T15 — `.env.example` + secrets policy | P1-T003 — `.env.local` workflow in README |
| **Staging env** | P0-T14 — Vercel + Atlas + Upstash keys | P1-T002 — connect app to staging MongoDB |
| **Prod env spec** | P0-T20 — prod spec doc | P1-T095 — prod deploy (Sprint 9) |
| **Local runtime** | — | P1-T003 — Docker Compose |
| **Cloud API keys** | P0-T16–P0-T19 — Azure, OpenAI, email, SMS | P1-T018+ — wire into app |

---

## Exit Criteria (M0)

- [ ] All P0 tasks ✅ (P0-T01–P0-T22)
- [ ] Speech spike pass (≥85% accuracy)
- [ ] PRDs signed
- [ ] GitHub repo configured (P0-T22)
- [ ] Sprint 1 ready

→ Next: [`phase-1-mvp-launch.md`](phase-1-mvp-launch.md)
