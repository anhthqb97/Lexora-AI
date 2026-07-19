import { NextResponse } from "next/server";
import { getAuthUserId, unauthorized } from "@/lib/api/auth";
import { ok } from "@/lib/api/response";
import { PRO_PRICE_VND_MONTHLY } from "@/lib/modules/billing/constants";
import { BillingError, createMoMoCheckout } from "@/lib/modules/billing/momo";

export async function POST(req: Request) {
  const userId = await getAuthUserId();
  if (!userId) return unauthorized();

  try {
    const body = await req.json();
    if (body.provider !== "momo") {
      return NextResponse.json(
        { error: { code: "VALIDATION_ERROR", message: "Only momo supported in this endpoint" } },
        { status: 422 },
      );
    }

    const result = createMoMoCheckout(userId, PRO_PRICE_VND_MONTHLY);
    return ok({ data: result });
  } catch (error) {
    if (error instanceof BillingError) {
      return NextResponse.json({ error: { code: error.code, message: error.message } }, { status: 400 });
    }
    throw error;
  }
}
