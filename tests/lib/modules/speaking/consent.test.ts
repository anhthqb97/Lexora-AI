import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";

describe("voice consent modal", () => {
  it("includes Vietnamese consent copy", () => {
    const content = readFileSync(
      join(process.cwd(), "components/speaking/voice-consent-modal.tsx"),
      "utf-8",
    );
    expect(content).toContain("quyền truy cập micro");
    expect(content).toContain("Tôi đồng ý");
    expect(content).toContain("Cho phép micro");
  });
});

describe("speaking consent module", () => {
  it("exports consent functions", async () => {
    const mod = await import("@/lib/modules/speaking/consent");
    expect(mod.hasVoiceConsent).toBeDefined();
    expect(mod.grantVoiceConsent).toBeDefined();
  });
});
