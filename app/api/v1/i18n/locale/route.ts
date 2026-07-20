import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SUPPORTED_LOCALES, type Locale } from "@/lib/i18n";

export async function POST(req: Request) {
  const body = await req.json();
  const locale = body.locale as Locale;
  if (!SUPPORTED_LOCALES.includes(locale)) {
    return NextResponse.json({ error: { code: "INVALID_LOCALE" } }, { status: 400 });
  }
  const cookieStore = await cookies();
  cookieStore.set("lexora_locale", locale, { path: "/", maxAge: 60 * 60 * 24 * 365 });
  return NextResponse.json({ ok: true, locale });
}
