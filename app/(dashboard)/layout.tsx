import Link from "next/link";
import { AppLogo } from "@/components/app-logo";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Trang chủ" },
  { href: "/speaking", label: "Speaking" },
  { href: "/settings", label: "Cài đặt" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/dashboard">
            <AppLogo className="text-xl" />
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-600 transition-colors hover:text-lexora-teal"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl gap-6 px-4 py-6 sm:px-6">
        <aside className="hidden w-48 shrink-0 md:block">
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-white hover:text-lexora-teal"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1 pb-20 md:pb-6">{children}</main>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 border-t bg-white md:hidden">
        <div className="mx-auto flex max-w-6xl justify-around px-2 py-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-1 flex-col items-center px-2 py-1 text-xs font-medium text-gray-600"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
