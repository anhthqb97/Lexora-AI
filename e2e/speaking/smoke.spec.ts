import { test, expect } from "../fixtures/base";

test.describe("speaking smoke @SP-E2E", () => {
  test("speaking home page loads", async ({ page }) => {
    await page.goto("/speaking");
    await expect(page.getByRole("heading", { name: "Lexora Speaking" })).toBeVisible({
      timeout: 10000,
    });
    await expect(page.getByText("Luyện nói với AI coach")).toBeVisible();
  });

  test("speaking setup page has session type options", async ({ page }) => {
    await page.goto("/speaking/new");
    await expect(page.getByText("Thiết lập buổi luyện")).toBeVisible({ timeout: 10000 });
    await expect(page.getByText("Free Talk")).toBeVisible();
    await expect(page.getByText("Chủ đề")).toBeVisible();
  });

  test("speaking progress page loads", async ({ page }) => {
    await page.goto("/speaking/progress");
    await expect(page.getByRole("heading", { name: "Tiến độ Speaking" })).toBeVisible({
      timeout: 10000,
    });
  });
});
