# API Contracts — Lexora AI

**Version:** 1.0
**Status:** Approved baseline
**Base URL:** `https://lexora.ai/api/v1` (Next.js modular monolith — MVP)
**Last Updated:** 2026-07-19

---

## 1. Conventions

- **Auth:** Bearer JWT in `Authorization` header
- **Content-Type:** `application/json` unless multipart noted
- **Errors:** `{ "error": { "code": "...", "message": "..." } }`
- **Pagination:** `?page=1&limit=20` → `{ "data": [], "meta": { "total", "page", "limit" } }`
- **Locale:** `Accept-Language: vi` or `en`
- **Implementation (MVP):** Next.js Route Handlers → `lib/modules/*`
- **Implementation (target):** API Gateway → microservices (same contract)

---

## 2. Auth

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/auth/register` | — | Email signup |
| POST | `/auth/login` | — | Email login |
| POST | `/auth/otp/send` | — | Send OTP |
| POST | `/auth/otp/verify` | — | Verify OTP |
| POST | `/auth/oauth/{provider}` | — | google, facebook |
| POST | `/auth/refresh` | Refresh token | New access token |
| POST | `/auth/logout` | ✓ | Logout |

---

## 3. Users

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/users/me` | ✓ | Profile |
| PATCH | `/users/me` | ✓ | Update profile |
| POST | `/users/me/onboarding` | ✓ | Goal + level |
| DELETE | `/users/me` | ✓ | Delete account |

---

## 4. Billing

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/billing/plans` | ✓ | Plans + pricing VND |
| GET | `/billing/subscription` | ✓ | Current plan |
| POST | `/billing/checkout` | ✓ | Start payment |
| POST | `/billing/cancel` | ✓ | Cancel subscription |

---

## 5. Speaking

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/speaking/sessions` | ✓ | Create session |
| GET | `/speaking/sessions/{id}` | ✓ | Session detail |
| POST | `/speaking/sessions/{id}/turns` | ✓ | Submit audio turn (multipart) |
| POST | `/speaking/sessions/{id}/end` | ✓ | End session |
| GET | `/speaking/sessions/{id}/summary` | ✓ | Session summary |
| GET | `/speaking/sessions` | ✓ | List sessions |
| GET | `/speaking/progress` | ✓ | Progress stats |
| GET | `/speaking/topics` | ✓ | Topic library |
| GET | `/speaking/scenarios` | ✓ | Scenario library |

---

## 6. AI (Internal / Gateway)

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/ai/chat` | ✓ | Product-scoped LLM |

---

## 7. TOEIC (Future — Sprint 8)

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/toeic/diagnostic` | ✓ | Start diagnostic |
| GET | `/toeic/lessons` | ✓ | Adaptive lessons |
| POST | `/toeic/mock-exams` | ✓ | Start mock exam |
| GET | `/toeic/mock-exams/{id}/results` | ✓ | Exam results |
| GET | `/toeic/progress` | ✓ | Score history |

---

## 8. Error Codes

| Code | HTTP | Description |
|---|---|---|
| `AUTH_INVALID` | 401 | Invalid credentials |
| `AUTH_EXPIRED` | 401 | Token expired |
| `FORBIDDEN` | 403 | Insufficient tier |
| `LIMIT_REACHED` | 402 | Free tier limit — paywall |
| `NOT_FOUND` | 404 | Resource not found |
| `VALIDATION_ERROR` | 422 | Invalid input |
| `RATE_LIMITED` | 429 | Too many requests |
| `AI_UNAVAILABLE` | 503 | LLM/speech service down |

---

## 9. Webhooks (Billing)

| Path | Provider | Events |
|---|---|---|
| `/billing/webhook/momo` | MoMo | payment.success, payment.failed |
| `/billing/webhook/vnpay` | VNPay | payment.return |

---

## References

| Document | Link |
|---|---|
| TDD Platform | [`tdd-platform.md`](tdd-platform.md) |
| TDD Speaking | [`tdd-speaking.md`](tdd-speaking.md) |
| Data Model | [`data-model.md`](data-model.md) |
