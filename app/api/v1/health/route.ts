import { ok } from "@/lib/api/response";
import { connectDatabase, getDatabaseStatus } from "@/lib/db/mongoose";
import { pingRedis } from "@/lib/redis";

export async function GET() {
  try {
    await connectDatabase();
  } catch {
    // reported in checks
  }

  const mongodb = getDatabaseStatus();
  const redisUp = await pingRedis();
  const healthy = mongodb === "connected";

  return ok(
    {
      status: healthy ? "ok" : "degraded",
      service: "lexora-ai",
      version: "0.1.0",
      checks: {
        mongodb,
        redis: redisUp ? "connected" : "disconnected",
      },
    },
    healthy ? 200 : 503,
  );
}
