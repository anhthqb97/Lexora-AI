export type KidsGameModule = {
  id: string;
  title: string;
  titleVi: string;
  minAge: number;
  maxAge: number;
};

export const KIDS_GAME_MODULES: KidsGameModule[] = [
  { id: "K-01", title: "Word Match", titleVi: "Ghép từ", minAge: 6, maxAge: 10 },
  { id: "K-02", title: "Sound Quest", titleVi: "Săn âm thanh", minAge: 7, maxAge: 12 },
  { id: "K-03", title: "Story Builder", titleVi: "Xây câu chuyện", minAge: 8, maxAge: 14 },
];

export function listKidsModules(): KidsGameModule[] {
  return KIDS_GAME_MODULES;
}
