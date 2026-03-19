import { describe, expect, it } from "vitest";
import type { CityWeather } from "@/core/types/weather";
import { getWeatherGradient } from "./get-weather-gradient";

const baseWeather: CityWeather = {
	coord: { lat: 0, lon: 0 },
	weather: [{ id: 0, main: "Clear", description: "", icon: "01d" }],
	base: "",
	main: { temp: 20, feels_like: 20, temp_min: 15, temp_max: 25, pressure: 0, humidity: 0 },
	visibility: 0,
	wind: { speed: 0, deg: 0 },
	clouds: { all: 0 },
	dt: 0,
	sys: { type: 0, id: 0, country: "", sunrise: 0, sunset: 0 },
	timezone: 0,
	id: 0,
	name: "",
	cod: 200,
};

describe("getWeatherGradient", () => {
	it("returns hot gradient for Clear day when temp > 25", () => {
		const w = { ...baseWeather, main: { ...baseWeather.main, temp: 30 } };
		expect(getWeatherGradient(w)).toBe("from-amber-400 via-orange-500 to-rose-500");
	});

	it("returns cool gradient for Clear day when temp <= 25", () => {
		expect(getWeatherGradient(baseWeather)).toBe("from-sky-400 via-blue-500 to-indigo-600");
	});

	it("returns night gradient for Clear night", () => {
		const w = {
			...baseWeather,
			weather: [{ id: 0, main: "Clear", description: "", icon: "01n" }],
		};
		expect(getWeatherGradient(w)).toBe("from-indigo-900 via-slate-900 to-slate-950");
	});

	it("returns fog gradient for Mist", () => {
		const w = {
			...baseWeather,
			weather: [{ id: 0, main: "Mist", description: "", icon: "50d" }],
		};
		expect(getWeatherGradient(w)).toBe("from-slate-400 via-slate-500 to-slate-600");
	});

	it("returns rain gradient for Rain", () => {
		const w = {
			...baseWeather,
			weather: [{ id: 0, main: "Rain", description: "", icon: "10d" }],
		};
		expect(getWeatherGradient(w)).toBe("from-slate-600 via-slate-700 to-slate-900");
	});

	it("returns default gradient for unknown weather", () => {
		const w = {
			...baseWeather,
			weather: [{ id: 0, main: "Unknown", description: "", icon: "01d" }],
		};
		expect(getWeatherGradient(w)).toBe("from-slate-500 via-sky-600 to-indigo-700");
	});
});
