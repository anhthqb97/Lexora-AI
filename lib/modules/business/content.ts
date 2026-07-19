import type { BusinessScenario } from "./types";

export const BUSINESS_SCENARIOS: BusinessScenario[] = [
  {
    id: "BS-01",
    title: "Weekly stand-up",
    titleVi: "Họp stand-up hàng tuần",
    type: "meeting",
    level: "B1",
    opener: "Good morning team. Let me share my updates from yesterday.",
    description: "Practice giving concise status updates in a stand-up meeting.",
  },
  {
    id: "BS-02",
    title: "Client status update",
    titleVi: "Cập nhật tiến độ khách hàng",
    type: "meeting",
    level: "B1–B2",
    opener: "Thank you for joining. I'd like to walk you through our progress.",
    description: "Update a client on project milestones professionally.",
  },
  {
    id: "BS-03",
    title: "Negotiate deadline",
    titleVi: "Thương lượng deadline",
    type: "meeting",
    level: "B2",
    opener: "I understand the urgency. Let's discuss a realistic timeline.",
    description: "Negotiate project deadlines while maintaining relationships.",
  },
  {
    id: "BS-04",
    title: "Request information",
    titleVi: "Email yêu cầu thông tin",
    type: "email",
    level: "B1",
    opener: "Dear Mr. Nguyen, I hope this email finds you well.",
    description: "Write a formal email requesting information from a colleague.",
  },
  {
    id: "BS-05",
    title: "Follow up proposal",
    titleVi: "Email theo dõi đề xuất",
    type: "email",
    level: "B1–B2",
    opener: "I am writing to follow up on the proposal I sent last week.",
    description: "Politely follow up on a business proposal.",
  },
  {
    id: "BS-06",
    title: "Apologize for delay",
    titleVi: "Email xin lỗi trễ hạn",
    type: "email",
    level: "B1",
    opener: "Please accept my apologies for the delay in delivering the report.",
    description: "Apologize professionally for a missed deadline.",
  },
  {
    id: "BS-07",
    title: "Product pitch intro",
    titleVi: "Giới thiệu sản phẩm",
    type: "presentation",
    level: "B2",
    opener: "Good afternoon. Today I'd like to introduce our new solution.",
    description: "Open a product presentation with confidence.",
  },
  {
    id: "BS-08",
    title: "Handle tough Q&A",
    titleVi: "Trả lời câu hỏi khó",
    type: "presentation",
    level: "B2",
    opener: "That's an excellent question. Let me address that directly.",
    description: "Handle challenging questions during a presentation.",
  },
];

export function listBusinessScenarios(): BusinessScenario[] {
  return BUSINESS_SCENARIOS;
}

export function getBusinessScenario(id: string): BusinessScenario | undefined {
  return BUSINESS_SCENARIOS.find((s) => s.id === id);
}
