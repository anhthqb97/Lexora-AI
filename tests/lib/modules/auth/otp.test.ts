import { describe, expect, it, vi, beforeEach } from "vitest";
import { normalizePhone, OtpError } from "@/lib/modules/auth/otp";

vi.mock("@/lib/redis", () => ({
  redisGet: vi.fn(),
  redisSet: vi.fn(),
}));

vi.mock("@/lib/db/mongoose", () => ({
  connectDatabase: vi.fn(),
}));

vi.mock("@/lib/modules/auth/models", () => ({
  User: {
    findOne: vi.fn(),
    create: vi.fn(),
  },
}));

describe("normalizePhone", () => {
  it("accepts valid +84 numbers", () => {
    expect(normalizePhone("+84901234567")).toBe("+84901234567");
    expect(normalizePhone("+84 901 234 567")).toBe("+84901234567");
  });

  it("rejects non +84 numbers", () => {
    expect(() => normalizePhone("+1234567890")).toThrow(OtpError);
    expect(() => normalizePhone("0901234567")).toThrow(OtpError);
  });

  it("rejects invalid digit lengths", () => {
    expect(() => normalizePhone("+84123")).toThrow(OtpError);
  });
});
