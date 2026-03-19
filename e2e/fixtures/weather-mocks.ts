import type { CityGeocoding, CityWeather, ForecastResponse } from "../../src/core/types/weather";

export const mockSearchResults: CityGeocoding[] = [
	{ name: "Oslo", country: "NO", lat: 59.9139, lon: 10.7522 },
	{ name: "London", country: "CA", lat: 42.9849, lon: -81.2453 },
];

export const mockCityWeather: CityWeather = {
	coord: { lat: 51.5074, lon: -0.1278 },
	weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
	base: "stations",
	main: { temp: 18, feels_like: 17, temp_min: 16, temp_max: 20, pressure: 1015, humidity: 65 },
	visibility: 10000,
	wind: { speed: 4.5, deg: 180 },
	clouds: { all: 0 },
	dt: 1710864000,
	sys: { type: 1, id: 1414, country: "NO", sunrise: 1710820800, sunset: 1710867600 },
	timezone: 0,
	id: 2643743,
	name: "Oslo",
	cod: 200,
};

export const mockForecast: ForecastResponse = {
	cod: "200",
	cnt: 40,
	message: "",
	list: [],
	city: {
		id: 2643743,
		name: "Oslo",
		country: "NO",
		lat: 59.9139,
		lon: 10.7522,
		population: 0,
		timezone: 0,
		sunrise: 0,
		sunset: 0,
	},
};
