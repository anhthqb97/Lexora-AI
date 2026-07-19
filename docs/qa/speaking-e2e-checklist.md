# Speaking E2E Verification Checklist

**Task:** P1-T059  
**Last Updated:** 2026-07-19

## Pre-requisites

- [ ] Local dev running (`npm run dev`) or staging URL
- [ ] Test user account with completed onboarding
- [ ] MongoDB connected

## Automated E2E (CI)

- [ ] `e2e/speaking/smoke.spec.ts` passes in CI
- [ ] `npm run test:e2e:smoke` green locally

## Manual — Session Flow

- [ ] Speaking Home shows weekly limit and CTA
- [ ] Session setup: type, topic/scenario, duration selection
- [ ] Voice consent modal on first session
- [ ] Live session: timer, waveform, mock turn
- [ ] Session summary: 5 dimension scores + improvements
- [ ] Retry phrases flow (max 5)
- [ ] Paywall when free tier limit reached (3/week)

## Manual — Mobile Spot Check

- [ ] iOS Safari: mic permission, push-to-talk
- [ ] Android Chrome: session completes without crash
- [ ] Bottom nav accessible on mobile

## API Smoke

- [ ] `POST /api/v1/speaking/sessions` creates session
- [ ] `POST /api/v1/speaking/sessions/{id}/turns` returns transcript + AI reply
- [ ] `POST /api/v1/speaking/sessions/{id}/end` triggers summary
- [ ] `GET /api/v1/speaking/progress` returns stats

## Sign-off

| Role | Name | Date | Status |
|---|---|---|---|
| QA | | | ⬜ |
| Dev | | | ⬜ |
