import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";

describe("uptime monitoring", () => {
  it("documents health metrics fields", () => {
    const doc = readFileSync(
      join(process.cwd(), "docs/engineering/uptime-monitoring.md"),
      "utf-8",
    );
    expect(doc).toContain("latencyMs");
    expect(doc).toContain("uptimeSeconds");
  });
});
