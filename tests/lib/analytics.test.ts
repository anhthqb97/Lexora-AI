import { describe, expect, it } from "vitest";
import { AnalyticsEvents } from "@/lib/analytics";

describe("analytics events schema", () => {
  it("defines core platform events", () => {
    expect(AnalyticsEvents.USER_SIGNED_UP).toBe("user_signed_up");
    expect(AnalyticsEvents.ONBOARDING_COMPLETED).toBe("onboarding_completed");
    expect(AnalyticsEvents.PAYWALL_SHOWN).toBe("paywall_shown");
  });
});
