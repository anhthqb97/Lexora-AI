import { NextResponse } from "next/server";
import { ok } from "@/lib/api/response";
import { OtpError, verifyOtp } from "@/lib/modules/auth/otp";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await verifyOtp(body.phone ?? "", body.code ?? "");
    return ok({ userId: result.userId, isNewUser: result.isNewUser });
  } catch (error) {
    if (error instanceof OtpError) {
      const status =
        error.code === "AUTH_INVALID" ? 401 : error.code === "VALIDATION_ERROR" ? 422 : 400;
      return NextResponse.json({ error: { code: error.code, message: error.message } }, { status });
    }
    throw error;
  }
}
