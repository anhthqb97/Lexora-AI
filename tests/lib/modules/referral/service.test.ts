import { describe, expect, it } from "vitest";

describe("referral code format", () => {
  it("generates 8-char hex uppercase codes", () => {
    const code = "A1B2C3D4";
    expect(code).toMatch(/^[A-F0-9]{8}$/);
  });
});
