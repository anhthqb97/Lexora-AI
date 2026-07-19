import { NextResponse } from "next/server";
import { ok } from "@/lib/api/response";
import { AuthError } from "@/lib/modules/auth/service";
import { issueMobileToken } from "@/lib/modules/auth/mobile-token";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const tokens = await issueMobileToken(body.email ?? "", body.password ?? "");
    return ok({ data: tokens });
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
