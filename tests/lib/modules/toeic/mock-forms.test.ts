import { describe, expect, it } from "vitest";
import { listMockForms } from "@/lib/modules/toeic/mock-forms";

describe("toeic mock forms", () => {
  it("lists three mock exam forms", () => {
    expect(listMockForms()).toHaveLength(3);
  });
});
