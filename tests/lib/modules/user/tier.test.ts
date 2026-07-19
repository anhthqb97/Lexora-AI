import { describe, expect, it } from "vitest";
import { canAccessFeature } from "@/lib/modules/user/tier";

describe("tier enforcement", () => {
  it("blocks business feature for free tier", () => {
    expect(canAccessFeature("free", "business")).toBe(false);
    expect(canAccessFeature("paid", "business")).toBe(true);
  });

  it("allows speaking for both tiers with quota elsewhere", () => {
    expect(canAccessFeature("free", "speaking")).toBe(true);
    expect(canAccessFeature("paid", "speaking")).toBe(true);
  });
});
