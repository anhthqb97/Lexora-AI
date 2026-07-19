import { NextResponse } from "next/server";
import { ok } from "@/lib/api/response";
import { AuthError, loginWithEmail } from "@/lib/modules/auth/service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const tokens = await loginWithEmail(body.email ?? "", body.password ?? "");
    return ok({ ...tokens, message: "Use NextAuth session from P1-T007 for cookie auth" });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json(
        { error: { code: error.code, message: error.message } },
        { status: 401 },
      );
    }
    throw error;
  }
}
