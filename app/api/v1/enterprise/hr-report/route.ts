import { getAuthUserId, unauthorized } from "@/lib/api/auth";
import { buildHrReport, hrReportToCsv } from "@/lib/modules/enterprise";

export async function GET(req: Request) {
  const userId = await getAuthUserId(req);
  if (!userId) return unauthorized();
  const url = new URL(req.url);
  const companyId = url.searchParams.get("companyId") ?? "default";
  const rows = await buildHrReport(companyId);
  const format = url.searchParams.get("format");
  if (format === "csv") {
    return new Response(hrReportToCsv(rows), {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=hr-report.csv",
      },
    });
  }
  return Response.json({ data: rows });
}
