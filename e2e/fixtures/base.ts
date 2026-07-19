import { test as base, expect } from "@playwright/test";

export const test = base.extend({
  page: async ({ page }, use) => {
    await use(page);
  },
});

export { expect };

/** Generate unique test email for registration flows. */
export function testEmail(prefix = "e2e"): string {
  return `${prefix}-${Date.now()}@lexora-test.local`;
}
