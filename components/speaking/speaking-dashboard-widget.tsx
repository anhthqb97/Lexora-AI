import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type SpeakingDashboardWidgetProps = {
  sessionCount: number;
  totalMinutes: number;
  averageConfidence?: number;
};

export function SpeakingDashboardWidget({
  sessionCount,
  totalMinutes,
  averageConfidence,
}: SpeakingDashboardWidgetProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg text-lexora-blue">Tiến độ Speaking</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-gray-700">
        <p>
          Buổi luyện: <span className="font-semibold">{sessionCount}</span>
        </p>
        <p>
          Tổng thời gian: <span className="font-semibold">{totalMinutes} phút</span>
        </p>
        {averageConfidence != null && (
          <p>
            Điểm TB: <span className="font-semibold">{(averageConfidence / 10).toFixed(1)}/10</span>
          </p>
        )}
        <Link href="/speaking/progress" className="text-lexora-teal hover:underline">
          Xem chi tiết →
        </Link>
      </CardContent>
    </Card>
  );
}
