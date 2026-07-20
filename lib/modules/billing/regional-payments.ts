import type { PaymentProvider } from "./constants";

export type RegionalProvider = PaymentProvider | "promptpay" | "line_pay";

export const REGIONAL_PAYMENTS: Record<string, RegionalProvider[]> = {
  VN: ["vnpay", "momo", "card"],
  TH: ["promptpay", "line_pay", "card"],
  ID: ["card"],
  PH: ["card"],
};

export function getRegionalProviders(countryCode: string): RegionalProvider[] {
  return REGIONAL_PAYMENTS[countryCode.toUpperCase()] ?? ["card"];
}

export async function createRegionalCheckout(
  _userId: string,
  countryCode: string,
  provider: RegionalProvider,
): Promise<{ checkoutUrl: string; stub: boolean }> {
  return {
    checkoutUrl: `https://pay.lexora.ai/stub/${countryCode}/${provider}`,
    stub: true,
  };
}
