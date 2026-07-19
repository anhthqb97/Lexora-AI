import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ToeicHomeProps = {
  diagnosticCompleted: boolean;
  mocksUsed: number;
  mockLimit: number;
  isPaid: boolean;
  recentScore?: number;
  recentType?: string;
};

export function ToeicHome({
  diagnosticCompleted,
  mocksUsed,
  mockLimit,
  isPaid,
  recentScore,
  recentType,
}: ToeicHomeProps) {
  const mockLabel = isPaid ? `${mocksUsed} (Pro)` : `${mocksUsed}/${mockLimit} tháng này`;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-lexora-blue sm:text-3xl">Lexora TOEIC</h1>
        <p className="mt-1 text-gray-600">Luyện thi TOEIC với chẩn đoán và thi thử</p>
      </div>

      <Card>
        <CardContent className="space-y-2 pt-6">
          <p className="text-sm text-gray-700">
            Thi thử tháng này: <span className="font-semibold">{mockLabel}</span>
          </p>
          <p className="text-sm text-gray-700">
            Chẩn đoán:{" "}
            <span className="font-semibold">
              {diagnosticCompleted ? "Đã hoàn thành" : "Chưa làm"}
            </span>
          </p>
          {recentScore !== undefined && (
            <p className="text-sm text-gray-700">
              Điểm gần nhất ({recentType}):{" "}
              <span className="font-semibold text-lexora-orange">{recentScore}</span>
            </p>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Bài chẩn đoán</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-gray-600">40 câu · ~30 phút · Nghe + Đọc</p>
            <Link href="/toeic/diagnostic">
              <Button className="w-full bg-lexora-orange hover:opacity-90">
                {diagnosticCompleted ? "Làm lại (Pro)" : "Bắt đầu chẩn đoán"}
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Thi thử TOEIC</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-gray-600">200 câu · 120 phút · Báo cáo chi tiết</p>
            <Link href="/toeic/mock">
              <Button variant="outline" className="w-full border-lexora-blue text-lexora-blue">
                Bắt đầu thi thử
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
