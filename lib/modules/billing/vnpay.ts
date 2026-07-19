import crypto from "crypto";
import type { CheckoutResult } from "./momo";
import type { PaymentProvider } from "./constants";

export function createVNPayCheckout(userId: string, amountVnd: number): CheckoutResult {
  const orderId = `LX${Date.now()}`;
  const tmnCode = process.env.VNPAY_TMN_CODE ?? "VNPAY_SANDBOX";
  const hashSecret = process.env.VNPAY_HASH_SECRET ?? "sandbox-secret";
  const returnUrl = process.env.VNPAY_RETURN_URL ?? "http://localhost:3000/settings/subscription";

  const createDate = new Date()
    .toISOString()
    .replace(/[-:TZ.]/g, "")
    .slice(0, 14);

  const params: Record<string, string> = {
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_TmnCode: tmnCode,
    vnp_Amount: String(amountVnd * 100),
    vnp_CurrCode: "VND",
    vnp_TxnRef: orderId,
    vnp_OrderInfo: `Lexora Pro ${userId}`,
    vnp_OrderType: "other",
    vnp_Locale: "vn",
    vnp_ReturnUrl: returnUrl,
    vnp_IpAddr: "127.0.0.1",
    vnp_CreateDate: createDate,
  };

  const sorted = Object.keys(params)
    .sort()
    .map((k) => `${k}=${encodeURIComponent(params[k]).replace(/%20/g, "+")}`)
    .join("&");

  const secureHash = crypto.createHmac("sha512", hashSecret).update(sorted).digest("hex");
  const paymentUrl = `https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?${sorted}&vnp_SecureHash=${secureHash}`;

  return { paymentUrl, orderId, provider: "vnpay" };
}

/** Card payments routed through VNPay gateway in sandbox. */
export function createCardCheckout(userId: string, amountVnd: number): CheckoutResult {
  const result = createVNPayCheckout(userId, amountVnd);
  return { ...result, provider: "card" as PaymentProvider };
}

export function verifyVNPaySignature(params: Record<string, string>, secureHash: string): boolean {
  const hashSecret = process.env.VNPAY_HASH_SECRET ?? "sandbox-secret";
  const filtered = { ...params };
  delete filtered.vnp_SecureHash;
  delete filtered.vnp_SecureHashType;

  const sorted = Object.keys(filtered)
    .sort()
    .map((k) => `${k}=${encodeURIComponent(filtered[k]).replace(/%20/g, "+")}`)
    .join("&");

  const expected = crypto.createHmac("sha512", hashSecret).update(sorted).digest("hex");
  return expected === secureHash;
}
