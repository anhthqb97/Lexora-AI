import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function getAuthUserId(): Promise<string | null> {
  const session = await auth();
  return session?.user?.id ?? null;
}

export function unauthorized() {
  return NextResponse.json(
    { error: { code: "AUTH_INVALID", message: "Authentication required" } },
    { status: 401 },
  );
}
