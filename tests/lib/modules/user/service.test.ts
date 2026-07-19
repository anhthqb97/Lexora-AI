import { describe, expect, it } from "vitest";
import type { UserGoal, UserLevel } from "@/lib/modules/user/types";

const GOALS: UserGoal[] = ["toeic", "speaking", "business", "general"];
const LEVELS: UserLevel[] = ["A1", "A2", "B1", "B2", "C1"];

describe("user profile types", () => {
  it("defines valid goals and levels", () => {
    expect(GOALS).toHaveLength(4);
    expect(LEVELS).toContain("B1");
  });
});
