import { expect, test } from "@playwright/test";

test("app loads and shows header", async ({ page }) => {
	await page.goto("/");
	await expect(page.getByText(/44weather/i)).toBeVisible();
});

test("search input is present", async ({ page }) => {
	await page.goto("/");
	await expect(page.getByPlaceholder("Search City...")).toBeVisible();
});
