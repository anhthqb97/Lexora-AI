import { connectDatabase } from "@/lib/db/mongoose";
import { setUserTier } from "@/lib/modules/user/tier";
import { PLANS, PRO_PRICE_VND_MONTHLY, type PaymentProvider } from "./constants";
import { Subscription } from "./models";
import { createMoMoCheckout, type CheckoutResult } from "./momo";
import { createCardCheckout, createVNPayCheckout } from "./vnpay";
import type { SubscriptionPlan } from "./types";

export class BillingError extends Error {
  constructor(
    public code: string,
    message: string,
  ) {
    super(message);
  }
}

export async function getPlans() {
  return PLANS;
}

export async function getSubscription(userId: string): Promise<{
  plan: SubscriptionPlan;
  status: string;
  endsAt?: Date;
}> {
  await connectDatabase();
  let sub = await Subscription.findOne({ userId });
  if (!sub) {
    sub = await Subscription.create({ userId, plan: "free", status: "active" });
  }

  return {
    plan: sub.plan === "pro-monthly" ? "pro" : "free",
    status: sub.status,
    endsAt: sub.endsAt,
  };
}

export async function createCheckout(
  userId: string,
  provider: PaymentProvider,
): Promise<CheckoutResult> {
  switch (provider) {
    case "momo":
      return createMoMoCheckout(userId, PRO_PRICE_VND_MONTHLY);
    case "vnpay":
      return createVNPayCheckout(userId, PRO_PRICE_VND_MONTHLY);
    case "card":
      return createCardCheckout(userId, PRO_PRICE_VND_MONTHLY);
    default:
      throw new BillingError("VALIDATION_ERROR", "Invalid payment provider");
  }
}

export async function activateSubscription(
  userId: string,
  provider: PaymentProvider,
  externalId: string,
): Promise<void> {
  await connectDatabase();
  const endsAt = new Date();
  endsAt.setMonth(endsAt.getMonth() + 1);

  await Subscription.findOneAndUpdate(
    { userId },
    {
      plan: "pro-monthly",
      status: "active",
      paymentProvider: provider,
      externalId,
      startsAt: new Date(),
      endsAt,
    },
    { upsert: true },
  );

  await setUserTier(userId, "paid");
}
