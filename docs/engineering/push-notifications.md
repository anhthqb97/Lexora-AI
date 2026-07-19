# Push Notifications — Expo Setup

**Task:** P1C-T09  
**Updated:** 2026-07-20

## Overview

Lexora mobile registers Expo push tokens with the Next.js monolith at `POST /api/v1/notifications/push-token`. Tokens are stored in MongoDB (`PushToken` collection) keyed by `userId`.

## Mobile client

1. Call `registerForPushNotifications()` from `apps/mobile/lib/push-notifications.ts` after login.
2. Requires physical device (not simulator) for token generation.
3. Uses `expo-notifications` + Bearer JWT auth.

## API

```http
POST /api/v1/notifications/push-token
Authorization: Bearer <mobile-jwt>
Content-Type: application/json

{ "token": "ExponentPushToken[...]", "platform": "ios" | "android" }
```

## Sending (future)

Use [Expo Push API](https://docs.expo.dev/push-notifications/sending-notifications/) with stored tokens. Batch by user for daily challenge reminders.

## Environment

| Variable | Purpose |
|---|---|
| `EXPO_PUBLIC_API_URL` | API base for token registration |

## EAS credentials

Configure push credentials in EAS (`eas credentials`) before production builds. See `docs/engineering/eas-build.md`.
