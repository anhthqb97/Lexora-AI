import { notImplemented } from "@/lib/api/response";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, _ctx: Params) {
  return notImplemented("speaking/sessions/{id}");
}
