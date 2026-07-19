import { describe, expect, it } from "vitest";
import { getLesson, listLessons } from "@/lib/modules/toeic/lessons";

describe("toeic lessons", () => {
  it("lists 100+ lessons", () => {
    expect(listLessons().length).toBeGreaterThanOrEqual(100);
  });

  it("finds lesson by id", () => {
    const first = listLessons()[0];
    expect(getLesson(first.id)?.title).toBe(first.title);
  });
});
