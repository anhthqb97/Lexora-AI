import { test, expect } from "../fixtures/base";

test.describe("health smoke", () => {
  test("GET /api/v1/health returns ok or degraded", async ({ request }) => {
    const res = await request.get("/api/v1/health");
    expect(res.status()).toBeLessThanOrEqual(503);
    const body = await res.json();
    expect(body.service).toBe("lexora-ai");
    expect(body.checks).toBeDefined();
  });
});
