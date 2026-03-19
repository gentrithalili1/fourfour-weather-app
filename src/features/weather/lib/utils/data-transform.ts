import type { CityGeocoding, CityWeather } from "@/core/types/weather";

export const transformCityWeatherToCityGeocoding = (cityWeather: CityWeather): CityGeocoding => {
	return {
		lat: cityWeather.coord.lat,
		lon: cityWeather.coord.lon,
		name: cityWeather.name,
		country: cityWeather.sys.country,
	};
};
