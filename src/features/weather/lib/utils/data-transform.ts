import type { CityGeocoding, CityWeather, ForecastItem } from "@/core/types/weather";

export const transformCityWeatherToCityGeocoding = (cityWeather: CityWeather): CityGeocoding => {
	return {
		lat: cityWeather.coord.lat,
		lon: cityWeather.coord.lon,
		name: cityWeather.name,
		country: cityWeather.sys.country,
	};
};

export const transformForecastToDailyForecast = (list: ForecastItem[]): ForecastItem[] => {
	const seen = new Set<string>();
	return list
		.filter((item) => {
			const key = item.dt_txt.slice(0, 10);
			if (seen.has(key)) return false;
			seen.add(key);
			return true;
		})
		.slice(0, 5);
};
