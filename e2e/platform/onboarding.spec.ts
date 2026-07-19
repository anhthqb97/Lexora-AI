import { test, expect } from "../fixtures/base";

test.describe("onboarding @TP-O01", () => {
  test("goal selection page renders options", async ({ page }) => {
    await page.goto("/onboarding/goal");
    await expect(page.getByRole("heading", { name: "Mục tiêu học tập" })).toBeVisible();
    await expect(page.getByText("TOEIC")).toBeVisible();
    await expect(page.getByText("Speaking")).toBeVisible();
    await expect(page.getByRole("button", { name: "Tiếp tục" })).toBeDisabled();
  });

  test("level selection page renders CEFR levels", async ({ page }) => {
    await page.goto("/onboarding/level");
    await expect(page.getByRole("heading", { name: "Trình độ hiện tại" })).toBeVisible();
    await expect(page.getByText("A1 — Beginner")).toBeVisible();
    await expect(page.getByText("C1 — Advanced")).toBeVisible();
  });
});
