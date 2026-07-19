import type { SubscriptionPlan } from "./types";

export async function getSubscription(_userId: string): Promise<{ plan: SubscriptionPlan }> {
  throw new Error("Not implemented — P1-T026");
}
