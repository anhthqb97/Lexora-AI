/**
 * PostHog analytics event schema — P1-T016
 * @see docs/product/platform/acceptance-platform.md PL-33
 */

export const AnalyticsEvents = {
  USER_SIGNED_UP: "user_signed_up",
  USER_LOGGED_IN: "user_logged_in",
  ONBOARDING_COMPLETED: "onboarding_completed",
  SESSION_STARTED: "session_started",
  SESSION_ENDED: "session_ended",
  PAYMENT_STARTED: "payment_started",
  PAYMENT_COMPLETED: "payment_completed",
  PAYWALL_SHOWN: "paywall_shown",
} as const;

export type AnalyticsEvent = (typeof AnalyticsEvents)[keyof typeof AnalyticsEvents];

export type AnalyticsProperties = Record<string, string | number | boolean | undefined>;

const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://app.posthog.com";
const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;

/** Server-side event capture — no-ops when PostHog is not configured. */
export async function captureEvent(
  event: AnalyticsEvent,
  distinctId: string,
  properties?: AnalyticsProperties,
): Promise<void> {
  if (!POSTHOG_KEY) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[analytics] ${event}`, { distinctId, ...properties });
    }
    return;
  }

  try {
    await fetch(`${POSTHOG_HOST}/capture/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: POSTHOG_KEY,
        event,
        distinct_id: distinctId,
        properties: { ...properties, $lib: "lexora-server" },
      }),
    });
  } catch {
    // Analytics must not break user flows
  }
}

/** Client-side helper — call from browser components. */
export function trackClientEvent(event: AnalyticsEvent, properties?: AnalyticsProperties): void {
  if (typeof window === "undefined") return;

  if (!POSTHOG_KEY) {
    console.info(`[analytics] ${event}`, properties);
    return;
  }

  void fetch(`${POSTHOG_HOST}/capture/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: POSTHOG_KEY,
      event,
      properties: { ...properties, $lib: "lexora-client" },
    }),
  });
}
