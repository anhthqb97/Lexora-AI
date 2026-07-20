import { NextResponse } from "next/server";
import { getAuthUserId, unauthorized } from "@/lib/api/auth";
import { ok } from "@/lib/api/response";
import { createBulkLicense } from "@/lib/modules/enterprise";

export async function POST(req: Request) {
  const userId = await getAuthUserId(req);
  if (!userId) return unauthorized();
  const body = await req.json();
  const license = await createBulkLicense(
    body.companyId ?? "default",
    body.seats ?? 10,
    body.invoiceId,
  );
  return ok(license, 201);
}

export async function GET(req: Request) {
  const userId = await getAuthUserId(req);
  if (!userId) return unauthorized();
  return ok({ message: "Use POST to create bulk license" });
}
