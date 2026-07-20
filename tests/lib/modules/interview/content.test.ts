import { describe, expect, it } from "vitest";
import { getQuestions, listIndustries } from "@/lib/modules/interview/content";

describe("interview content", () => {
  it("lists industries", () => {
    expect(listIndustries()).toContain("it");
  });

  it("loads IT questions", () => {
    const bank = getQuestions("it", 5);
    expect(bank.length).toBeGreaterThanOrEqual(3);
  });
});
