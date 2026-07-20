import { cookies } from "next/headers";
import { DEFAULT_LOCALE, type Locale, SUPPORTED_LOCALES } from "./messages";

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const raw = cookieStore.get("lexora_locale")?.value;
  if (raw && SUPPORTED_LOCALES.includes(raw as Locale)) return raw as Locale;
  return DEFAULT_LOCALE;
}

export { t, DEFAULT_LOCALE, SUPPORTED_LOCALES } from "./messages";
export type { Locale } from "./messages";
