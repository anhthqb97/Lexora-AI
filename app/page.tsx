import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <section className="flex flex-1 flex-col items-center justify-center gap-6 bg-gradient-to-b from-white to-orange-50 p-8 text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-lexora-orange">
          Learn Smarter. Speak Better.
        </p>
        <h1 className="max-w-2xl text-3xl font-bold text-lexora-blue sm:text-4xl">
          Luyện tiếng Anh thông minh với AI — Speaking &amp; TOEIC
        </h1>
        <p className="max-w-xl text-lg text-gray-600">
          Lexora giúp bạn nói tự tin hơn và đạt điểm TOEIC cao hơn với phản hồi cá nhân hóa.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/login"
            className="rounded-lg bg-lexora-orange px-6 py-3 font-medium text-white hover:opacity-90"
          >
            Bắt đầu miễn phí
          </Link>
          <Link
            href="/settings/subscription"
            className="rounded-lg border border-lexora-blue px-6 py-3 font-medium text-lexora-blue hover:bg-blue-50"
          >
            Xem bảng giá
          </Link>
        </div>
      </section>

      <section className="grid gap-6 bg-white p-8 sm:grid-cols-3">
        <div className="rounded-lg border p-6 text-center">
          <p className="text-2xl">🎤</p>
          <h2 className="mt-2 font-semibold text-lexora-blue">Luyện nói AI</h2>
          <p className="mt-1 text-sm text-gray-600">
            Hội thoại 5–15 phút, chấm 5 tiêu chí, sửa lỗi tức thì
          </p>
        </div>
        <div className="rounded-lg border p-6 text-center">
          <p className="text-2xl">📊</p>
          <h2 className="mt-2 font-semibold text-lexora-blue">TOEIC thông minh</h2>
          <p className="mt-1 text-sm text-gray-600">
            Chẩn đoán trình độ, thi thử 200 câu, giải thích câu sai
          </p>
        </div>
        <div className="rounded-lg border p-6 text-center">
          <p className="text-2xl">💳</p>
          <h2 className="mt-2 font-semibold text-lexora-blue">Giá Việt Nam</h2>
          <p className="mt-1 text-sm text-gray-600">
            Miễn phí 3 buổi/tuần · Pro 299.000đ/tháng · MoMo, VNPay
          </p>
        </div>
      </section>
    </main>
  );
}
