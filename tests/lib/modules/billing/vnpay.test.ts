import { describe, expect, it } from "vitest";
import { createVNPayCheckout, createCardCheckout } from "@/lib/modules/billing/vnpay";

describe("VNPay checkout", () => {
  it("creates VNPay sandbox URL", () => {
    const result = createVNPayCheckout("user-1", 299000);
    expect(result.provider).toBe("vnpay");
    expect(result.paymentUrl).toContain("vnpayment.vn");
  });

  it("creates card checkout via VNPay gateway", () => {
    const result = createCardCheckout("user-1", 299000);
    expect(result.provider).toBe("card");
  });
});
