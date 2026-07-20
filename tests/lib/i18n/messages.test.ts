import { describe, expect, it } from "vitest";
import { t, SUPPORTED_LOCALES } from "@/lib/i18n/messages";

describe("i18n", () => {
  it("supports vi en th", () => {
    expect(SUPPORTED_LOCALES).toContain("th");
  });

  it("translates th home", () => {
    expect(t("th", "nav.home")).toBe("หน้าแรก");
  });
});
