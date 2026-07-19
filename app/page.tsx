import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-3xl font-bold text-lexora-blue">Lexora AI</h1>
      <p className="text-lg text-gray-600">Learn Smarter. Speak Better.</p>
      <Link
        href="/dashboard"
        className="rounded-lg bg-lexora-orange px-6 py-3 font-medium text-white hover:opacity-90"
      >
        Dashboard
      </Link>
    </main>
  );
}
