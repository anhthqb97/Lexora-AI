import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function EnterpriseAdminPage() {
  return (
    <div className="space-y-6 p-8">
      <h1 className="text-2xl font-bold">Lexora Enterprise Admin</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Nhân viên</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <Link href="/enterprise/admin/employees" className="text-lexora-teal">
              Xem tiến độ →
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Báo cáo HR</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <Link href="/api/v1/enterprise/hr-report" className="text-lexora-teal">
              Xuất CSV →
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Giấy phép</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-600">Quản lý bulk seats</CardContent>
        </Card>
      </div>
    </div>
  );
}
