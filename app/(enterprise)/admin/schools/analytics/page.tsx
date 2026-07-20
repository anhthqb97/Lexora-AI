import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SchoolAnalyticsPage() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">School-wide Analytics</h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Tổng quan</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-gray-600">
          Dữ liệu từ{" "}
          <Link href="/api/v1/schools/classes?analytics=1" className="text-lexora-teal">
            API analytics
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
