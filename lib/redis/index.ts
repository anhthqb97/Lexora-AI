import { Redis } from "@upstash/redis";

let client: Redis | null = null;

export function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  if (!client) {
    client = new Redis({ url, token });
  }

  return client;
}

export async function pingRedis(): Promise<boolean> {
  const redis = getRedis();
  if (!redis) return false;

  try {
    const result = await redis.ping();
    return result === "PONG";
  } catch {
    return false;
  }
}

export async function redisSet(key: string, value: string, ttlSeconds?: number): Promise<void> {
  const redis = getRedis();
  if (!redis) throw new Error("Redis not configured");

  if (ttlSeconds) {
    await redis.set(key, value, { ex: ttlSeconds });
  } else {
    await redis.set(key, value);
  }
}

export async function redisGet(key: string): Promise<string | null> {
  const redis = getRedis();
  if (!redis) throw new Error("Redis not configured");
  const value = await redis.get<string>(key);
  return value ?? null;
}
