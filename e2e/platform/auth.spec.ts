import { test, expect, testEmail } from "../fixtures/base";

test.describe("auth @TP-A01 @TP-A03", () => {
  test("login page renders Vietnamese UI", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByRole("heading", { name: "Đăng nhập" })).toBeVisible();
    await expect(page.getByPlaceholder("Email")).toBeVisible();
    await expect(page.getByPlaceholder("Mật khẩu")).toBeVisible();
  });

  test("register API creates user", async ({ request }) => {
    const email = testEmail("register");
    const res = await request.post("/api/v1/auth/register", {
      data: { email, password: "testpass123" },
    });
    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body.userId).toBeDefined();
  });

  test("login page shows error on bad credentials", async ({ page }) => {
    await page.goto("/login");
    await page.getByPlaceholder("Email").fill("bad@example.com");
    await page.getByPlaceholder("Mật khẩu").fill("wrongpassword");
    await page.getByRole("button", { name: "Đăng nhập" }).click();
    await expect(page.getByText("Email hoặc mật khẩu không đúng")).toBeVisible();
  });
});
