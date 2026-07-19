import { describe, expect, it } from "vitest";
import {
  FREE_TIER_SESSIONS_PER_WEEK,
  SESSION_DURATIONS,
  SESSION_STATUSES,
  SESSION_TYPES,
} from "@/lib/modules/speaking/constants";

describe("speaking module scaffold", () => {
  it("exports session types", () => {
    expect(SESSION_TYPES).toContain("free_talk");
    expect(SESSION_TYPES).toContain("topic");
  });

  it("exports lifecycle statuses", () => {
    expect(SESSION_STATUSES).toEqual([
      "created",
      "active",
      "ending",
      "evaluating",
      "completed",
      "abandoned",
    ]);
  });

  it("exports duration options", () => {
    expect(SESSION_DURATIONS).toEqual([5, 10, 15, 20]);
  });

  it("matches free tier limit from pricing spec", () => {
    expect(FREE_TIER_SESSIONS_PER_WEEK).toBe(3);
  });
});
