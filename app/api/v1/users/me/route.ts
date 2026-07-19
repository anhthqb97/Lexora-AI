import { NextResponse } from "next/server";
import { getAuthUserId, unauthorized } from "@/lib/api/auth";
import { ok } from "@/lib/api/response";
import { deleteAccount, getProfile, updateProfile, UserError } from "@/lib/modules/user/service";

export async function GET() {
  const userId = await getAuthUserId();
  if (!userId) return unauthorized();

  try {
    const profile = await getProfile(userId);
    return ok({ data: profile });
  } catch (error) {
    if (error instanceof UserError) {
      return NextResponse.json({ error: { code: error.code, message: error.message } }, { status: 404 });
    }
    throw error;
  }
}

export async function PATCH(req: Request) {
  const userId = await getAuthUserId();
  if (!userId) return unauthorized();

  try {
    const body = await req.json();
    const profile = await updateProfile(userId, {
      name: body.name,
      avatarUrl: body.avatarUrl,
      locale: body.locale,
    });
    return ok({ data: profile });
  } catch (error) {
    if (error instanceof UserError) {
      return NextResponse.json({ error: { code: error.code, message: error.message } }, { status: 404 });
    }
    throw error;
  }
}

export async function DELETE() {
  const userId = await getAuthUserId();
  if (!userId) return unauthorized();

  try {
    await deleteAccount(userId);
    return ok({ deleted: true });
  } catch (error) {
    if (error instanceof UserError) {
      return NextResponse.json({ error: { code: error.code, message: error.message } }, { status: 404 });
    }
    throw error;
  }
}
