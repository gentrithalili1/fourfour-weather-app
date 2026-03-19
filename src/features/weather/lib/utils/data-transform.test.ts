import { describe, expect, it } from "vitest";
import type { CityWeather, ForecastItem } from "@/core/types/weather";
import {
	transformCityWeatherToCityGeocoding,
	transformForecastToDailyForecast,
} from "./data-transform";

describe("transformCityWeatherToCityGeocoding", () => {
	it("extracts geocoding from city weather", () => {
		const cityWeather: CityWeather = {
			coord: { lat: 41.39, lon: 2.17 },
			weather: [],
			base: "stations",
			main: {} as CityWeather["main"],
			visibility: 10000,
			wind: {} as CityWeather["wind"],
			clouds: {} as CityWeather["clouds"],
			dt: 0,
			sys: { type: 0, id: 0, country: "ES", sunrise: 0, sunset: 0 },
			timezone: 3600,
			id: 0,
			name: "Barcelona",
			cod: 200,
		};
		expect(transformCityWeatherToCityGeocoding(cityWeather)).toEqual({
			lat: 41.39,
			lon: 2.17,
			name: "Barcelona",
			country: "ES",
		});
	});
});

describe("transformForecastToDailyForecast", () => {
	it("deduplicates by date and returns max 5 days", () => {
		const list: ForecastItem[] = [
			{ dt: 1, main: {} as ForecastItem["main"], weather: [], dt_txt: "2025-03-19 00:00:00" },
			{ dt: 2, main: {} as ForecastItem["main"], weather: [], dt_txt: "2025-03-19 12:00:00" },
			{ dt: 3, main: {} as ForecastItem["main"], weather: [], dt_txt: "2025-03-20 00:00:00" },
			{ dt: 4, main: {} as ForecastItem["main"], weather: [], dt_txt: "2025-03-21 00:00:00" },
			{ dt: 5, main: {} as ForecastItem["main"], weather: [], dt_txt: "2025-03-22 00:00:00" },
			{ dt: 6, main: {} as ForecastItem["main"], weather: [], dt_txt: "2025-03-23 00:00:00" },
		];
		const result = transformForecastToDailyForecast(list);
		expect(result).toHaveLength(5);
		expect(result.map((r) => r.dt_txt.slice(0, 10))).toEqual([
			"2025-03-19",
			"2025-03-20",
			"2025-03-21",
			"2025-03-22",
			"2025-03-23",
		]);
	});
});
