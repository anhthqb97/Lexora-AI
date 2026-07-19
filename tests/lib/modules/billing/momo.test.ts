import { describe, expect, it } from "vitest";
import { createMoMoCheckout } from "@/lib/modules/billing/momo";

describe("MoMo checkout", () => {
  it("creates sandbox payment URL", () => {
    const result = createMoMoCheckout("user-123", 299000);
    expect(result.provider).toBe("momo");
    expect(result.paymentUrl).toContain("momo");
    expect(result.orderId).toMatch(/^LX-/);
  });
});
