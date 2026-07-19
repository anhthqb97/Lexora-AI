import { NextResponse } from "next/server";
import { ok } from "@/lib/api/response";
import { activateSubscription } from "@/lib/modules/billing/service";
import { verifyMoMoSignature } from "@/lib/modules/billing/momo";

export async function POST(req: Request) {
  const body = await req.json();
  const signature = body.signature as string;

  if (!verifyMoMoSignature(body, signature)) {
    return NextResponse.json(
      { error: { code: "FORBIDDEN", message: "Invalid signature" } },
      { status: 403 },
    );
  }

  if (body.resultCode === 0 || body.resultCode === "0") {
    let userId = body.userId as string | undefined;
    if (!userId && body.extraData) {
      try {
        const decoded = JSON.parse(Buffer.from(body.extraData, "base64").toString());
        userId = decoded.userId;
      } catch {
        // ignore
      }
    }

    if (userId) {
      await activateSubscription(userId, "momo", String(body.transId ?? body.orderId));
    }
  }

  return ok({ received: true });
}
