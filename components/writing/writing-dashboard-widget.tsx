import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  submissionCount: number;
  latestScore?: number;
};

export function WritingDashboardWidget({ submissionCount, latestScore }: Props) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Lexora Writing</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between text-sm">
        <div>
          <p className="text-gray-600">{submissionCount} bài đã nộp</p>
          {latestScore !== undefined && (
            <p className="font-medium text-lexora-blue">Điểm gần nhất: {latestScore}</p>
          )}
        </div>
        <Link href="/writing" className="text-lexora-teal hover:underline">
          Xem lịch sử →
        </Link>
      </CardContent>
    </Card>
  );
}
