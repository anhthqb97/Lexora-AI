# UX Spec — Lexora Speaking

**Feature:** Lexora Speaking
**Version:** 1.0
**Last Updated:** 2026-07-19

---

## 1. Screen Inventory

| # | Screen | Priority | Route |
|---|---|---|---|
| 1 | Speaking Home | P0 | `/speaking` |
| 2 | Session Setup | P0 | `/speaking/new` |
| 3 | Voice Consent | P0 | modal (first time) |
| 4 | Live Session | P0 | `/speaking/session/{id}` |
| 5 | Session Summary | P0 | `/speaking/session/{id}/summary` |
| 6 | Retry Phrases | P0 | `/speaking/session/{id}/retry` |
| 7 | Speaking Progress | P0 | `/speaking/progress` |

---

## 2. Core Flow

```
Dashboard → Speaking Home → Session Setup (type, duration, topic)
→ Voice Consent (if first time) → Live Session
→ Session Summary → Retry Phrases (optional) → Dashboard
```

---

## 3. Screen Specs

### 3.1 Speaking Home

```
┌─────────────────────────────┐
│ Lexora Speaking             │
│ Luyện nói với AI coach      │
├─────────────────────────────┤
│ Buổi tuần này: 2/3 (Free)   │
│ Tổng thời gian: 45 phút     │
├─────────────────────────────┤
│ [  🎤 Bắt đầu luyện nói  ]  │  ← Orange CTA
├─────────────────────────────┤
│ Buổi gần đây               │
│ • Free Talk — 8.2/10 — Hôm qua│
│ • Travel — 7.5/10 — 2 ngày trước│
└─────────────────────────────┘
```

### 3.2 Session Setup

**Step 1 — Type:**
- Free Talk | Chủ đề | Tình huống | TOEIC (P1)

**Step 2 — Topic/Scenario** (if applicable):
- Grid of topic cards from content-map

**Step 3 — Duration:**
- 5 · 10 · 15 · 20 phút (chips)

**CTA:** "Bắt đầu" → Live Session

### 3.3 Voice Consent (first time only)

**Copy (VI):**
- "Lexora cần quyền truy cập micro để đánh giá giọng nói của bạn"
- "Giọng nói được xử lý an toàn và không chia sẻ với bên thứ ba"
- Checkbox: "Tôi đồng ý"
- CTA: "Cho phép micro"

### 3.4 Live Session

```
┌─────────────────────────────┐
│ ● 03:24 / 05:00        [X]  │
├─────────────────────────────┤
│                             │
│     🤖 Lexora               │
│     "Tell me about your     │
│      favorite hobby."       │
│                             │
├─────────────────────────────┤
│  ∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿  │  ← waveform when listening
│  "I like reading books..."  │  ← live transcript
├─────────────────────────────┤
│ [ 🇻🇳 Trợ giúp ]  [ 🎤 Hold to speak ] │
└─────────────────────────────┘
```

**States:**
- **Listening:** Teal waveform, "Đang nghe..."
- **Processing:** Spinner, "Đang xử lý..."
- **AI speaking:** Text appears with typewriter effect (TTS optional P2)
- **Timer:** Countdown visible; gentle warning at 1 min left

**Interaction:** Push-to-talk OR tap-to-toggle (test both in beta).

### 3.5 Session Summary

```
┌─────────────────────────────┐
│ Buổi luyện hoàn thành! 🎉   │
├─────────────────────────────┤
│ Confidence    ████████░░ 8.2│
│ Pronunciation ███████░░░ 7.5│
│ Fluency       ████████░░ 8.0│
│ Grammar       ██████░░░░ 6.8│
│ Vocabulary    ███████░░░ 7.2│
├─────────────────────────────┤
│ Cần cải thiện               │
│ 1. "I go to school" →       │
│    "I went to school"       │
│    (past tense for finished actions) │
│ 2. ...                      │
├─────────────────────────────┤
│ [ Luyện lại cụm từ ]        │
│ [ Buổi mới ]  [ Về trang chủ ]│
└─────────────────────────────┘
```

**Tone:** Scores as growth bars, not red/green pass-fail.

### 3.6 Retry Phrases

- List flagged phrases from session
- Tap phrase → hear AI model → learner records retry → instant mini-feedback
- Max 5 phrases per session

---

## 4. Error States

| State | Message (VI) | Action |
|---|---|---|
| Mic denied | "Cần quyền micro để luyện nói. Hướng dẫn cài đặt?" | Instructions link |
| No speech detected | "Không nghe thấy giọng nói. Thử lại?" | Retry |
| AI timeout | "AI đang chậm. Thử lại?" | Retry / Text fallback |
| Session dropped | "Mất kết nối. Tiếp tục buổi luyện?" | Resume (30 min) |
| Limit reached | Paywall modal | Upgrade |

---

## 5. UX Principles

- **One tap to start** from Speaking Home
- **Non-intimidating** — celebrate effort in summary
- **Visual listening feedback** — learner knows AI hears them
- **English-first** with optional Vietnamese help toggle
- **Mobile browser optimized** — iOS Safari, Android Chrome

---

## References

| Document | Link |
|---|---|
| Workflow (overview + detail) | [`workflow-overview-detail.md`](workflow-overview-detail.md) |
| PRD | [`../product/speaking/prd-speaking.md`](../product/speaking/prd-speaking.md) |
| Content Map | [`../product/speaking/content-map-speaking.md`](../product/speaking/content-map-speaking.md) |
| Design System | [`design-system.md`](design-system.md) |
