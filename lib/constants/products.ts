export type Product = {
  title: string;
  description: string;
  href: string;
  badge?: string;
  accent?: "teal" | "orange" | "blue";
};

export const PRODUCTS: Product[] = [
  {
    title: "Lexora Speaking",
    description: "Luyện nói với AI coach — phát âm, hội thoại, phản hồi tức thì",
    href: "/speaking",
    badge: "MVP",
    accent: "teal",
  },
  {
    title: "TOEIC Prep",
    description: "Luyện thi TOEIC với bài học thích ứng và thi thử",
    href: "/toeic",
    badge: "MVP",
    accent: "orange",
  },
  {
    title: "Business English",
    description: "Tiếng Anh công việc — email, họp, thuyết trình",
    href: "/business",
    badge: "Sắp ra mắt",
    accent: "blue",
  },
  {
    title: "Interview Prep",
    description: "Luyện phỏng vấn song ngữ với AI phản hồi chi tiết",
    href: "/interview",
    badge: "Sắp ra mắt",
    accent: "blue",
  },
];
