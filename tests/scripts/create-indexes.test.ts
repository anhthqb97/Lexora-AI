import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";

describe("create-indexes script", () => {
  it("syncs indexes from mongoose models", () => {
    const content = readFileSync(join(process.cwd(), "scripts/create-indexes.ts"), "utf-8");
    expect(content).toContain("syncIndexes");
    expect(content).toContain("UserProfile");
  });
});
