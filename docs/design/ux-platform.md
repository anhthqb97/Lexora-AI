# UX Spec — Lexora Platform

**Feature:** Platform (auth, onboarding, dashboard, billing, settings)
**Version:** 1.0
**Last Updated:** 2026-07-19

---

## 1. Screen Inventory

| # | Screen | Priority | Route |
|---|---|---|---|
| 1 | Landing / Login | P0 | `/` |
| 2 | Register | P0 | `/register` |
| 3 | Phone OTP | P0 | `/login/phone` |
| 4 | Onboarding — Goal | P0 | `/onboarding/goal` |
| 5 | Onboarding — Level | P0 | `/onboarding/level` |
| 6 | Dashboard Home | P0 | `/dashboard` |
| 7 | Paywall | P0 | modal |
| 8 | Checkout | P0 | `/checkout` |
| 9 | Settings | P0 | `/settings` |
| 10 | Billing History | P1 | `/settings/billing` |

---

## 2. Core Flows

### 2.1 Registration → Dashboard

```
Landing → Register (email OR phone OR Google/Facebook)
→ Onboarding Goal → Onboarding Level → Dashboard
```

**Target:** ≤2 minutes, ≤4 taps after OAuth.

### 2.2 Login (returning user)

```
Landing → Login → Dashboard
```

### 2.3 Upgrade flow

```
Feature limit hit → Paywall modal → Checkout → Payment → Success → Dashboard (unlocked)
```

---

## 3. Screen Specs

### 3.1 Landing / Login

**Elements:**
- Lexora logo + tagline: "Learn Smarter. Speak Better."
- Email/password fields
- Buttons: Login, Register, Google, Facebook, Phone OTP
- Language toggle (VI | EN) top-right

**Mobile:** Full-width, large tap targets (min 44px).

### 3.2 Onboarding — Goal

**Copy (VI):** "Mục tiêu học tiếng Anh của bạn là gì?"

**Options (cards):**
- 🎯 Luyện thi TOEIC
- 🗣️ Luyện nói / Speaking
- 💼 Tiếng Anh công việc
- 📚 Tiếng Anh tổng quát

**Behavior:** Single select, Continue button.

### 3.3 Onboarding — Level

**Copy (VI):** "Trình độ tiếng Anh hiện tại của bạn?"

**Options:** A1 · A2 · B1 · B2 · C1 (with short Vietnamese descriptions)

**Optional:** "Tôi không chắc" → link to quick placement stub (Phase 2).

### 3.4 Dashboard Home

**Layout (mobile-first):**

```
┌─────────────────────────────┐
│ Xin chào, {name}! 👋        │
│ Streak: 🔥 3 ngày           │
├─────────────────────────────┤
│ [Lexora TOEIC    ] →        │
│ [Lexora Speaking ] →  ★     │
│ [Lexora Writing  ] →        │
│ [Lexora Business ] →        │
│ [Lexora Interview] →        │
├─────────────────────────────┤
│ Tiến độ tuần này            │
│ Speaking: 2/3 buổi          │
│ TOEIC: —                    │
└─────────────────────────────┘
```

**Speaking card:** Primary CTA — most prominent for MVP launch.

### 3.5 Paywall Modal

**Trigger:** Free session limit reached.

**Copy (VI):**
- Headline: "Bạn đã dùng hết 3 buổi luyện nói tuần này"
- Sub: "Nâng cấp để luyện tập không giới hạn với AI coach 24/7"
- CTA: "Nâng cấp ngay" → Checkout
- Secondary: "Để sau"

### 3.6 Checkout

**Elements:**
- Plan: Monthly / Annual (VND pricing)
- Payment: MoMo | VNPay | Thẻ
- Terms checkbox
- Pay button

### 3.7 Settings

**Sections:**
- Hồ sơ (name, avatar, level, goal)
- Ngôn ngữ (Tiếng Việt / English)
- Gói đăng ký (plan, renew date, cancel)
- Quyền riêng tư (voice consent)
- Đăng xuất · Xóa tài khoản

---

## 4. Error States

| State | Message (VI) | Action |
|---|---|---|
| Invalid login | "Email hoặc mật khẩu không đúng" | Retry |
| OTP expired | "Mã OTP đã hết hạn. Gửi lại?" | Resend |
| Payment failed | "Thanh toán thất bại. Thử lại?" | Retry |
| Network error | "Không có kết nối. Kiểm tra mạng." | Retry |

---

## 5. UX Principles

- Mobile-first (375px baseline)
- Vietnamese primary; English secondary
- One primary CTA per screen
- Progress indicator on onboarding (step 1/2)
- Deep Blue header, Teal accents, Orange for CTAs (see design-system.md)

---

## References

| Document | Link |
|---|---|
| Workflow (overview + detail) | [`workflow-overview-detail.md`](workflow-overview-detail.md) |
| Design System | [`design-system.md`](design-system.md) |
| PRD Platform | [`../product/platform/prd-platform.md`](../product/platform/prd-platform.md) |
