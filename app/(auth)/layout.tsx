"use client";

import { SessionProvider } from "next-auth/react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="flex min-h-screen items-center justify-center bg-gray-50">{children}</div>
    </SessionProvider>
  );
}
