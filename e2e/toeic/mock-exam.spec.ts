import { test, expect } from "../fixtures/base";

test.describe("toeic mock exam smoke @TOEIC-E2E", () => {
  test("toeic mock route redirects or loads when unauthenticated", async ({ page }) => {
    const response = await page.goto("/toeic/mock");
    expect(response?.status()).toBeLessThan(500);
  });

  test("toeic report page returns client or server response", async ({ page }) => {
    const response = await page.goto("/toeic/report/test-id");
    expect(response?.status()).toBeLessThan(500);
  });
});
