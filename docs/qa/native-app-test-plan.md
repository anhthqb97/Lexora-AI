# Native App QA Test Plan

**Task:** P1C-T12  
**Owner:** QA  
**Version:** 1.0  
**Updated:** 2026-07-20

## Scope

End-to-end validation of Lexora Expo app (`apps/mobile`) against staging API.

## Test environments

| Env | API URL | Build profile |
|---|---|---|
| Local | `http://localhost:3000` | development |
| Staging | `https://staging.lexora.ai` | preview |
| Production | `https://app.lexora.ai` | production |

## Test accounts

- Free tier user (email/password)
- Paid tier user (if available)

## P0 — Must pass before store submit

### Auth (P1C-T03)

- [ ] Login with valid credentials stores JWT in SecureStore
- [ ] Invalid credentials show error
- [ ] Bearer token accepted by `/api/v1/users/me`
- [ ] Logout clears token

### Dashboard (P1C-T04)

- [ ] Profile name/email displayed
- [ ] Speaking progress card shows session count
- [ ] TOEIC limits card shows mocks remaining

### Speaking flow (P1C-T05–T07)

- [ ] Topics and scenarios load from API
- [ ] Session creation succeeds (free_talk, topic, scenario)
- [ ] Live session: mic permission prompt
- [ ] Record + send turn returns AI response
- [ ] End session navigates to summary
- [ ] Summary shows confidence score and improvements

### TOEIC (P1C-T08)

- [ ] Attempt list loads
- [ ] Start mock creates attempt
- [ ] Answer questions updates attempt
- [ ] Finish mock returns to home with updated list

### Push (P1C-T09)

- [ ] Permission prompt on physical device
- [ ] Token registered via API (verify MongoDB)

## P1 — Should pass

- [ ] Tab navigation (Home, Speaking, TOEIC)
- [ ] Network error retry on dashboard
- [ ] Session timer / end early
- [ ] Vietnamese help toggle in setup

## P2 — Nice to have

- [ ] Offline graceful degradation
- [ ] Deep link `lexora://` routes

## Device matrix

| Device | OS | Pass |
|---|---|---|
| iPhone 14+ | iOS 17+ | ⬜ |
| Pixel 7 | Android 14 | ⬜ |
| Samsung A-series | Android 13 | ⬜ |

## Regression

Run after each EAS preview build:

1. Auth → Dashboard → Speaking session → Summary
2. Auth → TOEIC mock start → 3 questions → Finish

## Defect severity

| Level | Definition |
|---|---|
| P0 | Crash, auth broken, cannot complete speaking/TOEIC |
| P1 | Wrong data, UI blocker |
| P2 | Cosmetic, non-blocking |

## Sign-off

| Role | Name | Date | Status |
|---|---|---|---|
| QA | | | ⬜ |
| PM | | | ⬜ |
| Dev | | | ⬜ |
