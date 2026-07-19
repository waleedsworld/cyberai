import { test, expect } from "@playwright/test";

test.describe("PointBlank marketing + tools smoke", () => {
  test("landing page loads with branded title and header", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/PointBlank/i);
    // Header brand mark / nav is present.
    await expect(page.locator("header").first()).toBeVisible();
    // Body rendered real content, not an empty root.
    await expect(page.locator("#root")).not.toBeEmpty();
  });

  test("service page renders a known service", async ({ page }) => {
    await page.goto("/services/penetration-testing");
    await expect(
      page.getByRole("heading", { name: /penetration testing/i }).first(),
    ).toBeVisible();
  });

  test("unknown service slug shows the not-found state", async ({ page }) => {
    await page.goto("/services/this-does-not-exist");
    await expect(
      page.getByRole("heading", { name: /service not found/i }),
    ).toBeVisible();
  });

  test("unknown route renders the 404 page", async ({ page }) => {
    await page.goto("/this/route/is/missing");
    await expect(page.getByRole("heading", { name: "404" })).toBeVisible();
    await expect(
      page.getByRole("link", { name: /return to home/i }),
    ).toBeVisible();
  });

  test("compliance-check tool page renders its intake step", async ({
    page,
  }) => {
    await page.goto("/compliance-check");
    await expect(
      page.getByRole("heading", { name: /check your website's compliance/i }),
    ).toBeVisible();
    // The URL intake input is present and interactive.
    await expect(page.getByPlaceholder(/example\.com/i)).toBeVisible();
    await expect(
      page.getByRole("button", { name: /start check/i }),
    ).toBeVisible();
  });

  test("api-test tool page renders", async ({ page }) => {
    await page.goto("/api-test");
    await expect(
      page.getByRole("heading", { name: /compliance api test/i }),
    ).toBeVisible();
  });

  test("compliance-check intake advances to region selection", async ({
    page,
  }) => {
    await page.goto("/compliance-check");
    await page.getByPlaceholder(/example\.com/i).fill("example.com");
    // The primary button normalizes the URL and moves to region selection.
    await page.getByRole("button", { name: /start check/i }).click();
    await expect(
      page.getByRole("heading", { name: /select your region/i }),
    ).toBeVisible({ timeout: 10_000 });
  });
});
