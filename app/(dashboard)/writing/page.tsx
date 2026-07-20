import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthUserId } from "@/lib/api/auth";
import { listSubmissions } from "@/lib/modules/writing";

export default async function WritingPage() {
  const userId = await getAuthUserId();
  const submissions = userId ? await listSubmissions(userId).catch(() => []) : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-lexora-blue">Lexora Writing</h1>
          <p className="text-gray-600">Luyện viết tiếng Anh với phản hồi AI</p>
        </div>
        <Link
          href="/writing/new"
          className="inline-flex h-10 items-center justify-center rounded-md bg-lexora-orange px-4 text-sm font-medium text-white hover:opacity-90"
        >
          Viết bài mới
        </Link>
      </div>

      <div className="space-y-3">
        {submissions.length === 0 ? (
          <p className="text-gray-500">Chưa có bài viết nào. Bắt đầu ngay!</p>
        ) : (
          submissions.map((s) => (
            <Card key={s.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  {s.promptId} · {s.wordCount} từ · Điểm {s.scores.overall}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-2 text-sm text-gray-600">{s.content}</p>
                <Link
                  href={`/writing/${s.id}`}
                  className="mt-2 inline-block text-sm text-lexora-teal"
                >
                  Xem chi tiết →
                </Link>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
