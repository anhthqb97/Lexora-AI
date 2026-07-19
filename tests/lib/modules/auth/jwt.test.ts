import { describe, expect, it, beforeEach, vi } from "vitest";
import { signMobileToken, verifyMobileToken } from "@/lib/modules/auth/jwt";

describe("mobile jwt", () => {
  beforeEach(() => {
    vi.stubEnv("JWT_SECRET", "test-jwt-secret-for-mobile-auth");
  });

  it("signs and verifies a mobile token", async () => {
    const { accessToken } = await signMobileToken({ sub: "user123", email: "a@b.com" });
    const payload = await verifyMobileToken(accessToken);
    expect(payload?.sub).toBe("user123");
    expect(payload?.email).toBe("a@b.com");
  });

  it("rejects invalid tokens", async () => {
    const payload = await verifyMobileToken("not-a-token");
    expect(payload).toBeNull();
  });
});
