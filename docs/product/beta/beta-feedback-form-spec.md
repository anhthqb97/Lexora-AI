# Beta Feedback Form Specification

**Task:** P1-T062  
**Version:** 1.0  
**Last Updated:** 2026-07-19  
**Owner:** PM

---

## 1. Purpose

Collect structured feedback after each speaking session and at beta exit to measure usefulness, NPS, and qualitative issues.

---

## 2. Delivery Options

| Option | MVP | Notes |
|---|---|---|
| Google Form (post-session link) | ✅ Primary | Fast to ship; no dev dependency |
| In-app modal after summary | P1 stretch | Trigger on `/speaking/session/[id]/summary` |

Closed beta uses **Google Form** linked from session summary email and Zalo group pin.

---

## 3. Post-Session Form (after each session)

### Section A — Session rating

| Field | Type | Required |
|---|---|---|
| Session ID | Short text (prefilled via URL param) | Yes |
| Email | Email | Yes |
| Overall usefulness | 1–5 stars | Yes |
| AI response quality | 1–5 stars | Yes |
| Pronunciation feedback helpful? | Yes / Somewhat / No | Yes |
| Would practice again this week? | Yes / No | Yes |

### Section B — Open feedback

| Field | Type | Required |
|---|---|---|
| What worked well? | Paragraph | No |
| What frustrated you? | Paragraph | No |
| Bugs or errors encountered | Paragraph | No |

**URL template:** `https://forms.gle/XXXXX?entry.session_id={sessionId}&entry.email={email}`

---

## 4. Beta Exit Survey (Day 14)

| Field | Type | Required |
|---|---|---|
| NPS | 0–10 scale | Yes |
| Overall beta experience | 1–5 stars | Yes |
| Sessions completed | Number | Yes |
| Primary goal met? | Yes / Partially / No | Yes |
| Feature requests | Paragraph | No |
| Permission to quote testimonial | Checkbox | No |

**NPS question (Vietnamese):**  
"Bạn có giới thiệu Lexora cho bạn bè không? (0 = không bao giờ, 10 = chắc chắn)"

---

## 5. Analytics & Storage

| Metric | Source | Dashboard |
|---|---|---|
| Avg usefulness rating | Google Sheets → Looker | Daily PM review |
| NPS | Exit survey | Beta report |
| Verbatim comments | Sheets export | Weekly triage |

**Target:** ≥70% session survey response; 100% exit survey from active cohort.

---

## 6. Privacy

- No PII in public dashboards
- Comments anonymized in go/no-go report
- Align with privacy policy (voice + feedback retention)

---

## References

| Document | Link |
|---|---|
| Recruitment plan | [`beta-recruitment-plan.md`](beta-recruitment-plan.md) |
| Completion monitoring | [`beta-completion-monitoring.md`](beta-completion-monitoring.md) |
