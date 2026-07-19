import { ok } from "@/lib/api/response";
import { connectDatabase, getDatabaseStatus } from "@/lib/db/mongoose";
import { pingRedis } from "@/lib/redis";

export async function GET() {
  const start = Date.now();

  try {
    await connectDatabase();
  } catch {
    // reported in checks
  }

  const mongodb = getDatabaseStatus();
  const redisUp = await pingRedis();
  const healthy = mongodb === "connected";
  const latencyMs = Date.now() - start;

  return ok(
    {
      status: healthy ? "ok" : "degraded",
      service: "lexora-ai",
      version: "0.1.0",
      checks: {
        mongodb,
        redis: redisUp ? "connected" : "disconnected",
      },
      metrics: {
        uptimeSeconds: Math.floor(process.uptime()),
        latencyMs,
      },
    },
    healthy ? 200 : 503,
  );
}
