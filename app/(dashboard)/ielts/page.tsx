import { redirect } from "next/navigation";
import Link from "next/link";
import { getAuthUserId } from "@/lib/api/auth";
import { getLatestDiagnostic } from "@/lib/modules/ielts";
import { IeltsDiagnosticClient, IeltsResults } from "@/components/ielts/ielts-diagnostic-client";

export default async function IeltsPage() {
  const userId = await getAuthUserId();
  if (!userId) redirect("/login");
  const latest = await getLatestDiagnostic(userId);

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-lexora-blue">IELTS Diagnostic</h1>
        <p className="text-gray-600">Đánh giá nhanh 4 kỹ năng IELTS (stub)</p>
      </div>

      <IeltsResults latest={latest} />

      {!latest && <p className="text-gray-500">Chưa có kết quả chẩn đoán.</p>}

      <IeltsDiagnosticClient />

      <Link href="/dashboard" className="text-sm text-lexora-teal">
        ← Về trang chủ
      </Link>
    </div>
  );
}
