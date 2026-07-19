import { test, expect } from "../fixtures/base";

test.describe("toeic smoke @TOEIC-E2E", () => {
  test("toeic home page loads", async ({ page }) => {
    await page.goto("/toeic");
    await expect(page.getByRole("heading", { name: "Lexora TOEIC" })).toBeVisible({
      timeout: 10000,
    });
    await expect(page.getByText("Luyện thi TOEIC")).toBeVisible();
  });

  test("toeic home shows diagnostic and mock cards", async ({ page }) => {
    await page.goto("/toeic");
    await expect(page.getByText("Bài chẩn đoán")).toBeVisible({ timeout: 10000 });
    await expect(page.getByText("Thi thử TOEIC")).toBeVisible();
  });
});
