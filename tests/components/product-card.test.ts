import { describe, expect, it } from "vitest";
import { PRODUCTS } from "@/lib/constants/products";

describe("product cards", () => {
  it("lists core Lexora products", () => {
    expect(PRODUCTS.length).toBeGreaterThanOrEqual(3);
    expect(PRODUCTS.some((p) => p.title.includes("Speaking"))).toBe(true);
    expect(PRODUCTS.some((p) => p.title.includes("TOEIC"))).toBe(true);
  });
});
