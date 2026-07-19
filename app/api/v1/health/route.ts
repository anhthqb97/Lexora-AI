import { ok } from "@/lib/api/response";

export async function GET() {
  return ok({ status: "ok", service: "lexora-ai", version: "0.1.0" });
}
