# App Store & Google Play Submission Checklist

**Task:** P1C-T11  
**Owner:** PM  
**Updated:** 2026-07-20

## Pre-submission

- [ ] EAS production build passes on iOS + Android
- [ ] `EXPO_PUBLIC_API_URL` points to production API
- [ ] Privacy policy URL live (Vietnamese + English)
- [ ] Terms of service URL live
- [ ] App icons (1024×1024 iOS, adaptive Android)
- [ ] Screenshots: 6.7" iPhone, iPad (optional), phone + tablet Android
- [ ] App description (vi primary, en secondary)
- [ ] Keywords / category: Education
- [ ] Age rating questionnaire completed
- [ ] Export compliance (encryption) — standard HTTPS only

## Apple App Store

- [ ] Apple Developer Program membership active
- [ ] App Store Connect app record created (`com.lexora.ai`)
- [ ] TestFlight internal testing ≥1 week, no P0 crashes
- [ ] App Review notes: demo account credentials provided
- [ ] Microphone usage description (speaking feature)
- [ ] Push notification entitlement configured
- [ ] `eas submit --platform ios`

## Google Play

- [ ] Google Play Console developer account
- [ ] Service account JSON for EAS submit (gitignored)
- [ ] Data safety form: email, audio (speaking), analytics
- [ ] Content rating (IARC)
- [ ] Internal testing track → closed → production
- [ ] `eas submit --platform android`

## Post-launch

- [ ] Monitor crash-free sessions (Sentry)
- [ ] Respond to store reviews within 48h
- [ ] Version bump process documented in release runbook

## References

- [`docs/engineering/eas-build.md`](../engineering/eas-build.md)
- [`docs/qa/native-app-test-plan.md`](../qa/native-app-test-plan.md)
