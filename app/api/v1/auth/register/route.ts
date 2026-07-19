import { NextResponse } from "next/server";
import { ok } from "@/lib/api/response";
import { AuthError, registerWithEmail } from "@/lib/modules/auth/service";
import { recordReferralSignup } from "@/lib/modules/referral";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await registerWithEmail({
      email: body.email ?? "",
      password: body.password ?? "",
    });
    if (body.ref) {
      await recordReferralSignup(result.userId, body.ref);
    }
    return ok({ userId: result.userId }, 201);
  } catch (error) {
    if (error instanceof AuthError) {
      const status = error.code === "EMAIL_EXISTS" ? 409 : 400;
      return NextResponse.json({ error: { code: error.code, message: error.message } }, { status });
    }
    throw error;
  }
}
