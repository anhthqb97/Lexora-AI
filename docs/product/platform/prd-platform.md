# PRD — Lexora Platform

**Product:** Lexora Platform (shared infrastructure)
**Version:** 1.0
**Status:** Signed off (P0-T12, 2026-07-19)
**Owner:** Product Team
**Last Updated:** 2026-07-19

> **Learn Smarter. Speak Better.**

---

## 1. Overview

### 1.1 Summary

Lexora Platform is the shared foundation for all Lexora AI products — authentication, onboarding, subscription billing, learner dashboard, settings, and AI infrastructure gateway.

### 1.2 Problem Statement

Without a unified platform, each product (Speaking, TOEIC, Writing) would duplicate auth, billing, and navigation — increasing cost, inconsistency, and time-to-market.

### 1.3 Solution

A single learner account with:

* Registration and login (email, phone OTP, OAuth)
* Goal-based onboarding
* Free and paid subscription tiers
* Unified dashboard across Lexora products
* Payment via Vietnam-local methods (MoMo, VNPay, cards)
* Shared AI and analytics infrastructure

### 1.4 Goals

| Goal | Metric | Target |
|---|---|---|
| Fast registration | Time to complete signup | ≤2 min |
| Onboarding completion | % users finishing onboarding | ≥80% |
| Payment success | Checkout completion rate | ≥85% |
| Dashboard load | Time to interactive | ≤3s on 4G |
| Auth reliability | Login success rate | ≥99.5% |

### 1.5 Non-Goals (Phase 1)

* Native iOS/Android apps
* B2B admin portal for English centers
* Multi-language UI beyond Vietnamese + English
* HR/enterprise SSO

---

## 2. Target Users

All Lexora learners — students, professionals, job seekers — share the same platform account.

| Persona | Platform needs |
|---|---|
| Lan (Student) | Quick phone OTP signup, free tier, mobile-friendly |
| Minh (Professional) | Google login, paid upgrade, progress dashboard |
| Hoa (Job Seeker) | Free trial, clear paywall, affordable pricing in VND |

---

## 3. Functional Requirements

### 3.1 Authentication

| ID | Requirement | Priority |
|---|---|---|
| PL-01 | Email + password registration and login | P0 |
| PL-02 | Phone OTP login (Vietnam +84) | P0 |
| PL-03 | Google OAuth login | P0 |
| PL-04 | Facebook OAuth login | P0 |
| PL-05 | Password reset via email/OTP | P0 |
| PL-06 | Session management (JWT, refresh tokens) | P0 |
| PL-07 | Account deletion with data purge | P1 |

### 3.2 Onboarding

| ID | Requirement | Priority |
|---|---|---|
| PL-08 | Goal selection: TOEIC / Speaking / Business / General | P0 |
| PL-09 | Self-assessed English level (A1–C1) | P0 |
| PL-10 | Optional target exam date | P1 |
| PL-11 | Skip onboarding for OAuth users (defaults applied) | P0 |

### 3.3 Subscription & Billing

| ID | Requirement | Priority |
|---|---|---|
| PL-12 | Free tier with configurable feature limits | P0 |
| PL-13 | Paid tier unlocks unlimited sessions | P0 |
| PL-14 | MoMo payment integration | P0 |
| PL-15 | VNPay payment integration | P0 |
| PL-16 | Credit/debit card payment | P0 |
| PL-17 | Subscription management (upgrade, cancel, renew) | P0 |
| PL-18 | Paywall when free limit reached | P0 |
| PL-19 | Invoice/receipt email in Vietnamese | P1 |

**Free tier (locked P0-T06):** See [`pricing-spec.md`](../pricing-spec.md) — 3 speaking sessions/week; 1 TOEIC mock/month; diagnostic once free.

### 3.4 Dashboard & Navigation

| ID | Requirement | Priority |
|---|---|---|
| PL-20 | Responsive dashboard (mobile-first) | P0 |
| PL-21 | Product cards: TOEIC, Speaking, Writing, Business, Interview | P0 |
| PL-22 | Progress summary per product | P0 |
| PL-23 | Vietnamese UI (primary), English UI toggle | P0 |
| PL-24 | Navigation between products without re-login | P0 |

### 3.5 Settings

| ID | Requirement | Priority |
|---|---|---|
| PL-25 | Edit profile (name, avatar, level, goal) | P0 |
| PL-26 | Notification preferences | P1 |
| PL-27 | Language preference (VI/EN) | P0 |
| PL-28 | Subscription status and billing history | P0 |
| PL-29 | Privacy: voice consent management | P0 |

### 3.6 AI Infrastructure (Shared)

| ID | Requirement | Priority |
|---|---|---|
| PL-30 | LLM gateway with prompt injection per product | P0 |
| PL-31 | Content moderation on input and output | P0 |
| PL-32 | Conversation context manager | P0 |
| PL-33 | Analytics event pipeline | P0 |

---

## 4. Non-Functional Requirements

| ID | Requirement | Target |
|---|---|---|
| NFR-P01 | Page load on 4G | ≤3s |
| NFR-P02 | API response time | ≤500ms p95 (non-AI) |
| NFR-P03 | Uptime | ≥99.5% |
| NFR-P04 | PDPD compliance (Vietnam data protection) | Required |
| NFR-P05 | Password storage | bcrypt/argon2 hashed |
| NFR-P06 | HTTPS everywhere | Required |

---

## 5. Dependencies

| Dependency | Required by |
|---|---|
| MoMo/VNPay sandbox accounts | Billing |
| Google/Facebook OAuth apps | Social login |
| Cloud hosting (AWS/GCP/Azure) | All |
| Email/SMS provider (OTP) | Auth |

---

## 6. References

| Document | Link |
|---|---|
| Brand & Requirements | [`../brand.md`](../brand.md) |
| Platform Plan | [`plan-platform.md`](plan-platform.md) |
| UX Platform | [`../../design/ux-platform.md`](../../design/ux-platform.md) |
| TDD Platform | [`../../engineering/tdd-platform.md`](../../engineering/tdd-platform.md) |

---

## 7. Team Sign-off (P0-T12)

| Role | Date | Status |
|---|---|---|
| PM | 2026-07-19 | ✅ Signed |
| Technical Lead | 2026-07-19 | ✅ Signed |
| QA Lead | 2026-07-19 | ✅ Signed |

**Walkthrough:** Phase 0 PRD review completed. Requirements PL-01–PL-24 locked for Sprint 1.
