import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white px-6 py-4">
        <nav className="mx-auto flex max-w-5xl items-center gap-6">
          <Link href="/dashboard" className="font-semibold text-lexora-blue">
            Lexora
          </Link>
          <Link href="/speaking" className="text-sm text-gray-600 hover:text-lexora-teal">
            Speaking
          </Link>
        </nav>
      </header>
      <main className="mx-auto max-w-5xl p-6">{children}</main>
    </div>
  );
}
