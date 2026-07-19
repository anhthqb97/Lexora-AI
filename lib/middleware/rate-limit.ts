import { NextResponse } from "next/server";
import { redisGet, redisSet } from "@/lib/redis";

export type RateLimitConfig = {
  key: string;
  limit: number;
  windowSeconds: number;
};

export class RateLimitError extends Error {
  constructor(public retryAfter: number) {
    super("Rate limit exceeded");
  }
}

export async function checkRateLimit(config: RateLimitConfig): Promise<{
  allowed: boolean;
  remaining: number;
  retryAfter?: number;
}> {
  const redisKey = `ratelimit:${config.key}`;

  try {
    const current = await redisGet(redisKey);
    const count = current ? parseInt(current, 10) : 0;

    if (count >= config.limit) {
      return { allowed: false, remaining: 0, retryAfter: config.windowSeconds };
    }

    const next = count + 1;
    if (count === 0) {
      await redisSet(redisKey, String(next), config.windowSeconds);
    } else {
      await redisSet(redisKey, String(next));
    }

    return { allowed: true, remaining: config.limit - next };
  } catch {
    // If Redis unavailable, allow request (fail open for availability)
    return { allowed: true, remaining: config.limit };
  }
}

export async function withRateLimit(
  config: RateLimitConfig,
  handler: () => Promise<Response>,
): Promise<Response> {
  const result = await checkRateLimit(config);

  if (!result.allowed) {
    return NextResponse.json(
      {
        error: {
          code: "RATE_LIMITED",
          message: "Too many requests. Please try again later.",
        },
      },
      {
        status: 429,
        headers: { "Retry-After": String(result.retryAfter ?? config.windowSeconds) },
      },
    );
  }

  const response = await handler();
  return response;
}

/** Pre-configured limits per tdd-platform.md §8 */
export const RateLimits = {
  login: { limit: 5, windowSeconds: 900 },
  otp: { limit: 3, windowSeconds: 900 },
  api: { limit: 100, windowSeconds: 60 },
} as const;

export function rateLimitKey(prefix: string, identifier: string): string {
  return `${prefix}:${identifier}`;
}
