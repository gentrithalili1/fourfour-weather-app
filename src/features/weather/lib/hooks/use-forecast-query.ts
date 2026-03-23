import type { Coord, ForecastResponse } from "@core/types/weather";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { weatherApi } from "@/features/weather/lib/api/weather";

const forecastQueryKeys = {
	all: ["forecast"] as const,
	coords: (coords: Coord) => [...forecastQueryKeys.all, coords.lat, coords.lon] as const,
};

type UseForecastQueryParams = {
	lat?: number;
	lon?: number;
};

export const useForecastQuery = (params: UseForecastQueryParams) => {
	return useQuery<ForecastResponse, Error>({
		queryKey: forecastQueryKeys.coords({ lat: params.lat!, lon: params.lon! }),
		queryFn: async () =>
			weatherApi.fetchForecast({
				lat: params.lat!,
				lon: params.lon!,
			}),
		placeholderData: keepPreviousData,
		enabled: params.lat != null && params.lon != null,
	});
};
