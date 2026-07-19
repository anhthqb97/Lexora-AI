import { describe, expect, it, vi, beforeEach } from "vitest";
import { appendMessage, getContext } from "@/lib/ai/context";

vi.mock("@/lib/redis", () => ({
  redisGet: vi.fn(),
  redisSet: vi.fn(),
}));

import { redisGet, redisSet } from "@/lib/redis";

describe("conversation context manager", () => {
  beforeEach(() => {
    vi.mocked(redisGet).mockReset();
    vi.mocked(redisSet).mockReset();
  });

  it("returns empty context for new session", async () => {
    vi.mocked(redisGet).mockResolvedValue(null);
    const ctx = await getContext("session-1");
    expect(ctx.messages).toHaveLength(0);
  });

  it("appends messages and persists to Redis", async () => {
    vi.mocked(redisGet).mockResolvedValue(null);
    const ctx = await appendMessage("session-1", { role: "user", content: "Hello" });
    expect(ctx.messages).toHaveLength(1);
    expect(redisSet).toHaveBeenCalled();
  });
});
