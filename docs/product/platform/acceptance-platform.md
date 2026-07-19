# Acceptance Checklist — Lexora Platform

**Feature:** Platform
**Version:** 1.0
**Gate:** Stage 1 exit — before Speaking MVP build

---

## Authentication

- [ ] **PL-01** User can register with email + password
- [ ] **PL-01** User can log in with email + password
- [ ] **PL-02** User can log in with phone OTP (+84)
- [ ] **PL-03** User can log in with Google
- [ ] **PL-04** User can log in with Facebook
- [ ] **PL-05** User can reset password
- [ ] **PL-06** Session persists across page refresh; logout clears session

## Onboarding

- [ ] **PL-08** User selects learning goal (TOEIC / Speaking / Business / General)
- [ ] **PL-09** User selects English level (A1–C1)
- [ ] **PL-11** OAuth users can skip or complete onboarding
- [ ] Onboarding completion rate ≥80% in internal test

## Billing

- [ ] **PL-12** Free tier limits enforced (3 speaking sessions/week)
- [ ] **PL-13** Paid tier unlocks unlimited access
- [ ] **PL-14** MoMo payment completes in sandbox
- [ ] **PL-15** VNPay payment completes in sandbox
- [ ] **PL-16** Card payment completes in sandbox
- [ ] **PL-17** User can view subscription status and cancel
- [ ] **PL-18** Paywall appears when free limit reached

## Dashboard

- [ ] **PL-20** Dashboard loads in ≤3s on 4G (mobile)
- [ ] **PL-21** All product cards visible (TOEIC, Speaking, Writing, Business, Interview)
- [ ] **PL-23** Vietnamese UI default; English toggle works
- [ ] **PL-24** Navigation between products without re-login

## Settings

- [ ] **PL-25** User can edit name, level, goal
- [ ] **PL-27** Language preference persists
- [ ] **PL-28** Billing history visible for paid users
- [ ] **PL-29** Voice consent status visible and manageable

## AI Infrastructure

- [ ] **PL-30** LLM gateway accepts product-specific prompts
- [ ] **PL-31** Inappropriate input/output blocked or flagged
- [ ] **PL-32** Multi-turn conversation context maintained
- [ ] **PL-33** Analytics events: signup, login, payment, session_start

## Non-Functional

- [ ] **NFR-P02** Non-AI API ≤500ms p95
- [ ] **NFR-P03** Staging uptime ≥99.5% during test week
- [ ] **NFR-P04** Privacy policy and consent flows in place
- [ ] **NFR-P06** All traffic HTTPS

---

## Sign-off

| Role | Name | Date | Approved |
|---|---|---|---|
| Product Manager | | | [ ] |
| System Architect | | | [ ] |
| QA Lead | | | [ ] |
