# EAS Build Pipeline

**Task:** P1C-T10  
**Updated:** 2026-07-20

## Prerequisites

- [Expo account](https://expo.dev) with EAS enabled
- `EXPO_TOKEN` secret in GitHub Actions
- `EAS_PROJECT_ID` in `apps/mobile/app.config.ts` extra.eas

## Local build

```bash
cd apps/mobile
npm install
npx eas-cli login
npx eas build --platform android --profile preview
npx eas build --platform ios --profile preview
```

## Profiles (`eas.json`)

| Profile | Use |
|---|---|
| `development` | Dev client + simulator |
| `preview` | Internal APK/TestFlight staging |
| `production` | App Store + Play Store release |

## CI

`.github/workflows/eas-build.yml` triggers on `apps/mobile/**` changes or manual dispatch.

Set `EXPO_TOKEN` in repository secrets.

## Environment per profile

- **preview:** `EXPO_PUBLIC_API_URL=https://staging.lexora.ai`
- **production:** `EXPO_PUBLIC_API_URL=https://app.lexora.ai`

## Submit

```bash
eas submit --platform ios --profile production
eas submit --platform android --profile production
```

Update placeholder Apple/Google IDs in `eas.json` before first submit.
