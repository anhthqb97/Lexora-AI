import { test, expect } from "../fixtures/base";

test.describe("dashboard @TP-D01 @TP-D04", () => {
  test("dashboard shows product cards", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page.getByRole("heading", { name: "Trang chủ" })).toBeVisible();
    await expect(page.getByText("Lexora Speaking")).toBeVisible();
    await expect(page.getByText("TOEIC Prep")).toBeVisible();
  });

  test("can navigate to speaking from dashboard card", async ({ page }) => {
    await page.goto("/dashboard");
    await page.getByText("Lexora Speaking").click();
    await expect(page).toHaveURL(/\/speaking/);
  });
});
