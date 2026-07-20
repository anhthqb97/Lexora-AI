import { ok } from "@/lib/api/response";

const TEMPLATES: Record<string, { title: string; body: string }> = {
  "streak-at-risk": {
    title: "Giữ streak của bạn! 🔥",
    body: "Bạn sắp mất streak {streak} ngày. Luyện 5 phút ngay!",
  },
  "assignment-due": {
    title: "Bài tập sắp đến hạn",
    body: "{title} — hạn nộp {dueDate}",
  },
  "weekly-digest": {
    title: "Tuần học của bạn",
    body: "Bạn đã luyện {minutes} phút tuần này. Tiếp tục nhé!",
  },
};

export async function GET() {
  return ok({ templates: Object.keys(TEMPLATES) });
}

export async function POST(req: Request) {
  const body = await req.json();
  const template = TEMPLATES[body.templateId ?? ""];
  if (!template) {
    return ok({ error: "Template not found" }, 404);
  }
  let title = template.title;
  let message = template.body;
  const vars = body.variables ?? {};
  for (const [key, value] of Object.entries(vars)) {
    title = title.replace(`{${key}}`, String(value));
    message = message.replace(`{${key}}`, String(value));
  }
  return ok({ title, body: message, channel: "push" });
}
