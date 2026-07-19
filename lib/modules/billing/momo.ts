import crypto from "crypto";
import type { PaymentProvider } from "./constants";

export type CheckoutResult = {
  paymentUrl: string;
  orderId: string;
  provider: PaymentProvider;
};

export class BillingError extends Error {
  constructor(
    public code: string,
    message: string,
  ) {
    super(message);
  }
}

function generateOrderId(): string {
  return `LX-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;
}

/** MoMo sandbox payment — returns redirect URL for test environment. */
export function createMoMoCheckout(userId: string, amountVnd: number): CheckoutResult {
  const orderId = generateOrderId();
  const partnerCode = process.env.MOMO_PARTNER_CODE ?? "MOMO_SANDBOX";
  const accessKey = process.env.MOMO_ACCESS_KEY ?? "sandbox-key";
  const redirectUrl =
    process.env.MOMO_REDIRECT_URL ?? "http://localhost:3000/settings/subscription";
  const ipnUrl = process.env.MOMO_IPN_URL ?? "http://localhost:3000/api/v1/billing/webhook/momo";

  const requestId = orderId;
  const orderInfo = `Lexora Pro subscription for ${userId}`;
  const extraData = Buffer.from(JSON.stringify({ userId })).toString("base64");

  const rawSignature = `accessKey=${accessKey}&amount=${amountVnd}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=captureWallet`;
  const signature = crypto
    .createHmac("sha256", process.env.MOMO_SECRET_KEY ?? "sandbox-secret")
    .update(rawSignature)
    .digest("hex");

  const sandboxUrl =
    process.env.MOMO_SANDBOX_URL ?? "https://test-payment.momo.vn/v2/gateway/api/create";
  const params = new URLSearchParams({
    partnerCode,
    accessKey,
    requestId,
    amount: String(amountVnd),
    orderId,
    orderInfo,
    redirectUrl,
    ipnUrl,
    extraData,
    requestType: "captureWallet",
    signature,
  });

  return {
    paymentUrl: `${sandboxUrl}?${params.toString()}`,
    orderId,
    provider: "momo",
  };
}

export function verifyMoMoSignature(params: Record<string, string>, signature: string): boolean {
  const accessKey = process.env.MOMO_ACCESS_KEY ?? "sandbox-key";
  const rawSignature = `accessKey=${accessKey}&amount=${params.amount}&extraData=${params.extraData ?? ""}&message=${params.message ?? ""}&orderId=${params.orderId}&orderInfo=${params.orderInfo ?? ""}&orderType=${params.orderType ?? ""}&partnerCode=${params.partnerCode}&payType=${params.payType ?? ""}&requestId=${params.requestId}&responseTime=${params.responseTime ?? ""}&resultCode=${params.resultCode}&transId=${params.transId ?? ""}`;
  const expected = crypto
    .createHmac("sha256", process.env.MOMO_SECRET_KEY ?? "sandbox-secret")
    .update(rawSignature)
    .digest("hex");
  return expected === signature;
}
