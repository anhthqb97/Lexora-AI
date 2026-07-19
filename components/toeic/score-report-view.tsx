import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ToeicReport } from "@/lib/modules/toeic/types";

type ScoreReportProps = {
  report: ToeicReport;
};

export function ScoreReportView({ report }: ScoreReportProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-lexora-blue">Báo cáo điểm TOEIC</h1>
        <p className="text-sm text-gray-600">
          {report.type === "diagnostic" ? "Chẩn đoán" : "Thi thử"} · {report.correctCount}/
          {report.totalQuestions} câu đúng
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl text-lexora-orange">{report.totalScore}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2 sm:grid-cols-2">
          <p className="text-sm">
            Nghe: <span className="font-semibold">{report.sectionScores.listening}</span>
          </p>
          <p className="text-sm">
            Đọc: <span className="font-semibold">{report.sectionScores.reading}</span>
          </p>
        </CardContent>
      </Card>

      {report.weakAreas.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Điểm yếu cần cải thiện</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-inside list-disc text-sm text-gray-700">
              {report.weakAreas.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {report.wrongAnswers.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-lexora-blue">Giải thích câu sai</h2>
          {report.wrongAnswers.slice(0, 10).map((item) => (
            <Card key={item.questionId}>
              <CardContent className="space-y-2 pt-6">
                <p className="text-sm font-medium">{item.questionText}</p>
                <p className="text-sm text-gray-600">{item.explainWhy}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Link href="/toeic" className="text-sm text-lexora-blue hover:underline">
        ← Quay lại TOEIC
      </Link>
    </div>
  );
}
