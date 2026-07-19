import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";

describe("paywall component", () => {
  it("includes Vietnamese upgrade messaging", () => {
    const content = readFileSync(
      join(process.cwd(), "components/billing/paywall.tsx"),
      "utf-8",
    );
    expect(content).toContain("Nâng cấp Lexora Pro");
    expect(content).toContain("299.000");
  });
});
