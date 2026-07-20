import { ok } from "@/lib/api/response";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, t, type Locale } from "@/lib/i18n/messages";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const locale = (url.searchParams.get("locale") ?? DEFAULT_LOCALE) as Locale;
  const keys = ["nav.home", "nav.speaking", "nav.settings"];
  const messages = Object.fromEntries(keys.map((k) => [k, t(locale, k)]));
  return ok({ locale, supportedLocales: SUPPORTED_LOCALES, messages });
}
