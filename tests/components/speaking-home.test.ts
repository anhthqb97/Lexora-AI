import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";

describe("speaking home component", () => {
  it("includes Vietnamese speaking home copy", () => {
    const content = readFileSync(
      join(process.cwd(), "components/speaking/speaking-home.tsx"),
      "utf-8",
    );
    expect(content).toContain("Lexora Speaking");
    expect(content).toContain("Luyện nói với AI coach");
    expect(content).toContain("Bắt đầu luyện nói");
  });
});
