import { describe, expect, it } from "vitest";
import { isApiError, SESSION_TYPES } from "../src";

describe("@lexora/shared", () => {
  it("exports session types", () => {
    expect(SESSION_TYPES).toContain("free_talk");
    expect(SESSION_TYPES).toHaveLength(4);
  });

  it("detects api errors", () => {
    expect(isApiError({ error: { code: "AUTH", message: "fail" } })).toBe(true);
    expect(isApiError({ data: {} })).toBe(false);
  });
});
