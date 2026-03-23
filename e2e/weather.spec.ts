import { mockCityWeather } from "./fixtures/weather-mocks";
import { setupWeatherApiMocks } from "./helpers/mock-api";
import { expect, test } from "@playwright/test";

test("search and select city shows weather details", async ({ page }) => {
	setupWeatherApiMocks(page);
	await page.goto("/");

	await page.getByPlaceholder("Search City...").fill("Oslo");

	await expect(page.getByRole("option", { name: /Oslo, NO/i })).toBeVisible({
		timeout: 5000,
	});
	await page.getByRole("option", { name: /Oslo, NO/i }).click();

	const weatherSection = page.locator('[aria-label="Weather in Oslo, NO"]');
	await expect(weatherSection).toBeVisible({ timeout: 5000 });
	await expect(weatherSection.getByText("Oslo, NO")).toBeVisible();
	await expect(weatherSection.getByText(/clear sky/i)).toBeVisible();
});

test("click recent search shows weather details", async ({ page }) => {
	setupWeatherApiMocks(page, [mockCityWeather]);
	await page.goto("/");

	await page.getByRole("button", { name: /Select Oslo, NO/i }).click();

	const weatherSection = page.locator('[aria-label="Weather in Oslo, NO"]');
	await expect(weatherSection).toBeVisible({ timeout: 5000 });
	await expect(weatherSection.getByText("Oslo, NO")).toBeVisible();
	await expect(weatherSection.getByText(/clear sky/i)).toBeVisible();
});

test("clear recent search removes cities", async ({ page }) => {
	setupWeatherApiMocks(page, [mockCityWeather]);
	await page.goto("/");

	await expect(page.getByRole("button", { name: /Clear recent searches/i })).toBeVisible();
	await expect(page.getByRole("button", { name: /Select Oslo, NO/i })).toBeVisible();

	await page.getByRole("button", { name: /Clear recent searches/i }).click();

	await expect(page.getByText("Search for cities to see them here")).toBeVisible();
	await expect(page.getByRole("button", { name: /Clear recent searches/i })).not.toBeVisible();
});
