import { describe, expect, it } from "vitest";
import { FREE_TOEIC_MOCKS_PER_MONTH } from "@/lib/modules/billing/constants";

describe("toeic constants", () => {
  it("free tier allows 1 mock per month", () => {
    expect(FREE_TOEIC_MOCKS_PER_MONTH).toBe(1);
  });
});
