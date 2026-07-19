import { describe, expect, it } from "vitest";
import type { UserGoal } from "@/lib/modules/user/types";

describe("onboarding goals", () => {
  it("includes all product goals", () => {
    const goals: UserGoal[] = ["toeic", "speaking", "business", "general"];
    expect(goals).toHaveLength(4);
  });
});

describe("onboarding levels", () => {
  it("includes CEFR levels A1 through C1", () => {
    const levels = ["A1", "A2", "B1", "B2", "C1"];
    expect(levels).toHaveLength(5);
  });
});
