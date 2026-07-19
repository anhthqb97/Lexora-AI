import Link from "next/link";
import { MockFormSelector } from "@/components/toeic/mock-form-selector";
import { Button } from "@/components/ui/button";
import { getAuthUserId } from "@/lib/api/auth";
import { listMockForms } from "@/lib/modules/toeic";
import { redirect } from "next/navigation";

export default async function ToeicMockPage() {
  const userId = await getAuthUserId();
  if (!userId) redirect("/login");
  const forms = listMockForms();

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <Button variant="ghost" asChild>
        <Link href="/toeic">← TOEIC</Link>
      </Button>
      <MockFormSelector forms={forms} />
    </div>
  );
}
