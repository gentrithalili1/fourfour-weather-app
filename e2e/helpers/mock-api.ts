import type { CityWeather } from "../../src/core/types/weather";
import { mockCityWeather, mockForecast, mockSearchResults } from "../fixtures/weather-mocks";
import type { Page } from "@playwright/test";

export function setupWeatherApiMocks(page: Page, initialRecentCities: CityWeather[] = []) {
	page.route("**/api/weather/search*", (route) =>
		route.fulfill({ status: 200, body: JSON.stringify(mockSearchResults) })
	);

	page.route("**/api/weather/fetch*", (route) =>
		route.fulfill({ status: 200, body: JSON.stringify(mockCityWeather) })
	);

	page.route("**/api/weather/forecast*", (route) =>
		route.fulfill({ status: 200, body: JSON.stringify(mockForecast) })
	);

	page.route("**/api/weather/recent*", (route) => {
		const method = route.request().method();
		if (method === "POST") {
			route.fulfill({ status: 200, body: JSON.stringify({ ok: true }) });
		} else if (method === "DELETE") {
			route.fulfill({ status: 200, body: JSON.stringify({ ok: true }) });
		} else {
			route.fulfill({ status: 200, body: JSON.stringify(initialRecentCities) });
		}
	});
}
