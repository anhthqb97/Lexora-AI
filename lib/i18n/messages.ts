export type Locale = "vi" | "en" | "th";

const MESSAGES: Record<Locale, Record<string, string>> = {
  vi: {
    "nav.home": "Trang chủ",
    "nav.speaking": "Speaking",
    "nav.settings": "Cài đặt",
  },
  en: {
    "nav.home": "Home",
    "nav.speaking": "Speaking",
    "nav.settings": "Settings",
  },
  th: {
    "nav.home": "หน้าแรก",
    "nav.speaking": "Speaking",
    "nav.settings": "การตั้งค่า",
  },
};

export function t(locale: Locale, key: string): string {
  return MESSAGES[locale]?.[key] ?? MESSAGES.en[key] ?? key;
}

export const DEFAULT_LOCALE: Locale = "vi";
export const SUPPORTED_LOCALES: Locale[] = ["vi", "en", "th"];
