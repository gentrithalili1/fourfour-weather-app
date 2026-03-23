import type { CityWeather, Coord } from "@core/types/weather";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { weatherApi } from "@/features/weather/lib/api/weather";

export const cityWeatherQueryKeys = {
	all: ["city-weather"] as const,
	coords: (coords: Coord) => [...cityWeatherQueryKeys.all, coords.lat, coords.lon] as const,
};

type UseCityWeatherQueryParams = {
	lat?: number;
	lon?: number;
};

export const useCityWeatherQuery = (params: UseCityWeatherQueryParams) => {
	return useQuery<CityWeather, Error>({
		queryKey: [...cityWeatherQueryKeys.all, params.lat, params.lon],
		queryFn: () => weatherApi.fetchCityWeather({ lat: params.lat!, lon: params.lon! }),
		placeholderData: keepPreviousData,
		enabled: params.lat != null && params.lon != null,
	});
};
