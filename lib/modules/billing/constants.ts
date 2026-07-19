export const FREE_SPEAKING_SESSIONS_PER_WEEK = 3;
export const FREE_TOEIC_MOCKS_PER_MONTH = 1;
export const PRO_PRICE_VND_MONTHLY = 299_000;

export type PaymentProvider = "momo" | "vnpay" | "card";

export type BillingPlan = {
  id: string;
  name: string;
  priceVnd: number;
  interval: "monthly" | "annual";
};

export const PLANS: BillingPlan[] = [
  { id: "free", name: "Free", priceVnd: 0, interval: "monthly" },
  { id: "pro-monthly", name: "Pro", priceVnd: PRO_PRICE_VND_MONTHLY, interval: "monthly" },
];
