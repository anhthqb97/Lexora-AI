import { NextResponse } from "next/server";
import { ok } from "@/lib/api/response";
import { activateSubscription } from "@/lib/modules/billing/service";
import { verifyVNPaySignature } from "@/lib/modules/billing/vnpay";

export async function POST(req: Request) {
  const body = await req.json();
  const secureHash = body.vnp_SecureHash as string;

  if (!verifyVNPaySignature(body, secureHash)) {
    return NextResponse.json(
      { error: { code: "FORBIDDEN", message: "Invalid signature" } },
      { status: 403 },
    );
  }

  if (body.vnp_ResponseCode === "00") {
    const orderInfo = body.vnp_OrderInfo as string;
    const userIdMatch = orderInfo?.match(/Lexora Pro (\S+)/);
    const userId = userIdMatch?.[1];

    if (userId) {
      await activateSubscription(userId, "vnpay", String(body.vnp_TransactionNo));
    }
  }

  return ok({ received: true });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const params: Record<string, string> = {};
  url.searchParams.forEach((value, key) => {
    params[key] = value;
  });

  const secureHash = params.vnp_SecureHash;
  if (!verifyVNPaySignature(params, secureHash)) {
    return NextResponse.redirect(new URL("/settings/subscription?payment=failed", url.origin));
  }

  if (params.vnp_ResponseCode === "00") {
    const orderInfo = params.vnp_OrderInfo ?? "";
    const userIdMatch = orderInfo.match(/Lexora Pro (\S+)/);
    const userId = userIdMatch?.[1];
    if (userId) {
      await activateSubscription(userId, "vnpay", params.vnp_TransactionNo ?? params.vnp_TxnRef);
    }
    return NextResponse.redirect(new URL("/settings/subscription?payment=success", url.origin));
  }

  return NextResponse.redirect(new URL("/settings/subscription?payment=failed", url.origin));
}
