import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { verifyMobileToken } from "@/lib/modules/auth/jwt";

function extractBearerToken(req: Request): string | null {
  const header = req.headers.get("authorization");
  if (!header?.startsWith("Bearer ")) return null;
  return header.slice(7).trim() || null;
}

export async function getAuthUserId(req?: Request): Promise<string | null> {
  if (req) {
    const bearer = extractBearerToken(req);
    if (bearer) {
      const payload = await verifyMobileToken(bearer);
      if (payload?.sub) return payload.sub;
    }
  }

  const session = await auth();
  return session?.user?.id ?? null;
}

export function unauthorized() {
  return NextResponse.json(
    { error: { code: "AUTH_INVALID", message: "Authentication required" } },
    { status: 401 },
  );
}
