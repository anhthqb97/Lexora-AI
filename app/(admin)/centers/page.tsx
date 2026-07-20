import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { listCenters } from "@/lib/modules/centers";

export default async function AdminCentersPage() {
  const centers = await listCenters().catch(() => []);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">Lexora Centers — Admin</h1>
        <p className="text-gray-600">Quản lý trung tâm Anh ngữ (lite portal)</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {centers.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-sm text-gray-500">
              Chưa có trung tâm. Thêm pilot qua onboarding playbook.
            </CardContent>
          </Card>
        ) : (
          centers.map((c) => (
            <Card key={String(c._id)}>
              <CardHeader>
                <CardTitle className="text-base">{c.name as string}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <p>{c.studentCount ?? 0} học viên</p>
                <Link href={`/centers/${c.slug}`} className="text-lexora-teal">
                  Quản lý →
                </Link>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Link href="/centers/teacher" className="text-sm text-lexora-blue">
        Teacher progress dashboard →
      </Link>
    </div>
  );
}
