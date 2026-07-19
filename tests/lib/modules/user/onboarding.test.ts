import { describe, expect, it } from "vitest";
import type { UserGoal } from "@/lib/modules/user/types";

describe("onboarding goals", () => {
  it("includes all product goals", () => {
    const goals: UserGoal[] = ["toeic", "speaking", "business", "general"];
    expect(goals).toHaveLength(4);
  });
});
