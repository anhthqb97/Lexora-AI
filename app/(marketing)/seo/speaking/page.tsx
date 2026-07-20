import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SpeakingLandingPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold text-lexora-blue">Luyện nói tiếng Anh với AI Coach</h1>
      <p className="mt-4 text-lg text-gray-600">
        Lexora Speaking — luyện phát âm, hội thoại và nhận phản hồi tức thì 24/7.
      </p>
      <ul className="mt-6 list-inside list-disc space-y-2 text-gray-700">
        <li>Đánh giá phát âm, ngữ pháp, độ trôi chảy</li>
        <li>Giải thích lỗi bằng tiếng Việt</li>
        <li>Chủ đề TOEIC, công việc, phỏng vấn</li>
      </ul>
      <Link href="/register">
        <Button className="mt-8 bg-lexora-teal">Dùng thử miễn phí</Button>
      </Link>
    </main>
  );
}
