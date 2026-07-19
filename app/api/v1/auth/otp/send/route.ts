import { NextResponse } from "next/server";
import { ok } from "@/lib/api/response";
import { OtpError, sendOtp } from "@/lib/modules/auth/otp";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await sendOtp(body.phone ?? "");
    return ok({ expiresIn: result.expiresIn });
  } catch (error) {
    if (error instanceof OtpError) {
      const status =
        error.code === "RATE_LIMITED" ? 429 : error.code === "VALIDATION_ERROR" ? 422 : 400;
      return NextResponse.json({ error: { code: error.code, message: error.message } }, { status });
    }
    throw error;
  }
}
