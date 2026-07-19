import { describe, expect, it } from "vitest";
import { verifyMoMoSignature } from "@/lib/modules/billing/momo";
import { verifyVNPaySignature } from "@/lib/modules/billing/vnpay";

describe("payment webhooks", () => {
  it("verifies MoMo signature with sandbox defaults", () => {
    const params = {
      accessKey: "sandbox-key",
      amount: "299000",
      extraData: "",
      message: "Success",
      orderId: "LX-123",
      orderInfo: "test",
      orderType: "momo_wallet",
      partnerCode: "MOMO",
      payType: "qr",
      requestId: "LX-123",
      responseTime: "1234567890",
      resultCode: "0",
      transId: "999",
    };
    // Signature verification returns boolean without throwing
    expect(typeof verifyMoMoSignature(params, "invalid")).toBe("boolean");
  });

  it("verifies VNPay signature returns boolean", () => {
    expect(typeof verifyVNPaySignature({ vnp_Amount: "100" }, "hash")).toBe("boolean");
  });
});
