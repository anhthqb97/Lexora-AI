import { describe, expect, it } from "vitest";
import { listBusinessScenarios } from "@/lib/modules/business";

describe("business module", () => {
  it("lists 8 scenarios", () => {
    expect(listBusinessScenarios()).toHaveLength(8);
  });
});
