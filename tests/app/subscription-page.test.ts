import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";

describe("subscription page", () => {
  it("includes payment provider options", () => {
    const content = readFileSync(
      join(process.cwd(), "app/(dashboard)/settings/subscription/page.tsx"),
      "utf-8",
    );
    expect(content).toContain("MoMo");
    expect(content).toContain("VNPay");
  });
});
