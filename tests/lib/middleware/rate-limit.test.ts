import { describe, expect, it, vi, beforeEach } from "vitest";
import { checkRateLimit, rateLimitKey } from "@/lib/middleware/rate-limit";

vi.mock("@/lib/redis", () => ({
  redisGet: vi.fn(),
  redisSet: vi.fn(),
}));

import { redisGet, redisSet } from "@/lib/redis";

describe("rate limit middleware", () => {
  beforeEach(() => {
    vi.mocked(redisGet).mockReset();
    vi.mocked(redisSet).mockReset();
  });

  it("allows requests under limit", async () => {
    vi.mocked(redisGet).mockResolvedValue("2");
    const result = await checkRateLimit({
      key: rateLimitKey("login", "1.2.3.4"),
      limit: 5,
      windowSeconds: 900,
    });
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(2);
  });

  it("blocks requests over limit", async () => {
    vi.mocked(redisGet).mockResolvedValue("5");
    const result = await checkRateLimit({
      key: rateLimitKey("login", "1.2.3.4"),
      limit: 5,
      windowSeconds: 900,
    });
    expect(result.allowed).toBe(false);
  });

  it("fails open when redis errors", async () => {
    vi.mocked(redisGet).mockRejectedValue(new Error("Redis down"));
    const result = await checkRateLimit({
      key: "test",
      limit: 5,
      windowSeconds: 60,
    });
    expect(result.allowed).toBe(true);
  });
});
