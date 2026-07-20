import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ToeicLandingPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold text-lexora-blue">Luyện thi TOEIC online với AI</h1>
      <p className="mt-4 text-lg text-gray-600">
        Chẩn đoán nhanh, thi thử 200 câu, giải thích chi tiết — Lexora TOEIC giúp bạn đạt mục tiêu
        điểm số.
      </p>
      <ul className="mt-6 list-inside list-disc space-y-2 text-gray-700">
        <li>Bài chẩn đoán 40 câu miễn phí</li>
        <li>3 đề thi thử A/B/C</li>
        <li>Phân tích điểm yếu Listening & Reading</li>
      </ul>
      <Link href="/register">
        <Button className="mt-8 bg-lexora-orange">Bắt đầu miễn phí</Button>
      </Link>
    </main>
  );
}
