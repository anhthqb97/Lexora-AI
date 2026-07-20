import Link from "next/link";
import { MockFormSelector } from "@/components/toeic/mock-form-selector";
import { getAuthUserId } from "@/lib/api/auth";
import { listMockForms } from "@/lib/modules/toeic";
import { redirect } from "next/navigation";

export default async function ToeicMockPage() {
  const userId = await getAuthUserId();
  if (!userId) redirect("/login");
  const forms = listMockForms();

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <Link href="/toeic" className="inline-flex text-sm text-gray-600 hover:text-lexora-blue">
        ← TOEIC
      </Link>
      <MockFormSelector forms={forms} />
    </div>
  );
}
