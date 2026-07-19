# Test Plan — Lexora Platform

**Feature:** Platform
**Version:** 1.0
**Last Updated:** 2026-07-19

---

## 1. Auth

| ID | Test case | Steps | Expected |
|---|---|---|---|
| TP-A01 | Email registration | Register with valid email/password | Account created, redirected to onboarding |
| TP-A02 | Duplicate email | Register with existing email | Error: email already used |
| TP-A03 | Email login | Login with valid credentials | JWT returned, dashboard loads |
| TP-A04 | Invalid password | Login with wrong password | Error message, no token |
| TP-A05 | Phone OTP | Request OTP → enter code | Login success |
| TP-A06 | Expired OTP | Enter OTP after 5 min | Error, resend option |
| TP-A07 | Google OAuth | Click Google login | Account created/logged in |
| TP-A08 | Password reset | Request reset → new password | Login with new password works |
| TP-A09 | Logout | Click logout | Token invalidated, redirect to login |
| TP-A10 | Session refresh | Access token expires | Refresh token renews access |

---

## 2. Onboarding

| ID | Test case | Expected |
|---|---|---|
| TP-O01 | Complete goal + level | Saved to profile, dashboard shown |
| TP-O02 | Skip onboarding (OAuth) | Defaults applied, can complete later |
| TP-O03 | Back navigation | Can change goal before submit |

---

## 3. Billing

| ID | Test case | Expected |
|---|---|---|
| TP-B01 | Free tier default | New user tier = free |
| TP-B02 | MoMo checkout | Sandbox payment succeeds, tier = paid |
| TP-B03 | VNPay checkout | Payment succeeds |
| TP-B04 | Failed payment | Error shown, tier unchanged |
| TP-B05 | Cancel subscription | Tier reverts at period end |
| TP-B06 | Paywall trigger | Shown when speaking limit reached |

---

## 4. Dashboard

| ID | Test case | Expected |
|---|---|---|
| TP-D01 | Load dashboard | ≤3s on 4G, all product cards visible |
| TP-D02 | Vietnamese UI | Default language Vietnamese |
| TP-D03 | English toggle | UI switches to English |
| TP-D04 | Navigate to Speaking | No re-login required |

**Automation:** P1-T101 — see [`test-automation-e2e.md`](test-automation-e2e.md) §5.1

---

## 5. Settings

| ID | Test case | Expected |
|---|---|---|
| TP-S01 | Edit profile | Name/level/goal saved |
| TP-S02 | View billing | Plan and history visible for paid user |
| TP-S03 | Voice consent | Consent status shown and editable |
| TP-S04 | Delete account | Account and data purged |

---

## 6. Non-Functional

| ID | Test case | Expected |
|---|---|---|
| TP-N01 | API latency | Non-AI endpoints ≤500ms p95 |
| TP-N02 | Rate limiting | Blocked after 5 failed logins |
| TP-N03 | HTTPS | All requests over TLS |

---

## References

| Document | Link |
|---|---|
| PRD | [`../product/platform/prd-platform.md`](../product/platform/prd-platform.md) |
| Acceptance | [`../product/platform/acceptance-platform.md`](../product/platform/acceptance-platform.md) |
