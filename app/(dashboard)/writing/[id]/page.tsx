import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthUserId } from "@/lib/api/auth";
import { getPrompt, getSubmission } from "@/lib/modules/writing";

type PageProps = { params: Promise<{ id: string }> };

export default async function WritingDetailPage({ params }: PageProps) {
  const userId = await getAuthUserId();
  if (!userId) notFound();
  const { id } = await params;
  let submission;
  try {
    submission = await getSubmission(userId, id);
  } catch {
    notFound();
  }
  const prompt = getPrompt(submission.promptId);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-lexora-blue">
        {prompt?.titleVi ?? submission.promptId}
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Điểm số</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
          <div>Grammar: {submission.scores.grammar}</div>
          <div>Clarity: {submission.scores.clarity}</div>
          <div>Vocabulary: {submission.scores.vocabulary}</div>
          <div>Overall: {submission.scores.overall}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Bài viết</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap text-sm">{submission.content}</p>
        </CardContent>
      </Card>
      {submission.corrections.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Sửa lỗi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {submission.corrections.map((c, i) => (
              <div key={i} className="rounded border p-3 text-sm">
                <p>
                  <span className="line-through text-red-600">{c.original}</span> →{" "}
                  <span className="text-green-700">{c.corrected}</span>
                </p>
                <p className="mt-1 text-gray-600">{c.reason}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
      <Card>
        <CardHeader>
          <CardTitle>Giải thích</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700">{submission.explainWhy}</p>
        </CardContent>
      </Card>
    </div>
  );
}
