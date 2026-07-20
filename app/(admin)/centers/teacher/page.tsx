import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TeacherDashboardPage() {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Teacher Progress Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Tổng quan lớp</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-gray-600">
          Xem tiến độ bài tập Speaking, TOEIC và Writing của học viên. Kết nối API{" "}
          <code>/api/v1/centers/progress</code> để lấy dữ liệu thực.
        </CardContent>
      </Card>
    </div>
  );
}
