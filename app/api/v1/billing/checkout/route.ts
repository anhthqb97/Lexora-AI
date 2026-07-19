import { NextResponse } from "next/server";
import { getAuthUserId, unauthorized } from "@/lib/api/auth";
import { ok } from "@/lib/api/response";
import { BillingError, createCheckout } from "@/lib/modules/billing/service";
import type { PaymentProvider } from "@/lib/modules/billing/constants";

export async function POST(req: Request) {
  const userId = await getAuthUserId();
  if (!userId) return unauthorized();

  try {
    const body = await req.json();
    const provider = (body.provider ?? "momo") as PaymentProvider;
    const result = await createCheckout(userId, provider);
    return ok({ data: result });
  } catch (error) {
    if (error instanceof BillingError) {
      return NextResponse.json({ error: { code: error.code, message: error.message } }, { status: 422 });
    }
    throw error;
  }
}
