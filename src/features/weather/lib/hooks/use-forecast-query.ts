import type { ForecastItem } from "@core/types/weather";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { weatherApi } from "@/features/weather/lib/api/weather";

const forecastQueryKeys = {
	all: ["forecast"] as const,
};

interface UseForecastQueryParams {
	lat?: number;
	lon?: number;
}

function onePerDay(list: ForecastItem[]): ForecastItem[] {
	const seen = new Set<string>();
	return list
		.filter((item) => {
			const key = item.dt_txt.slice(0, 10);
			if (seen.has(key)) return false;
			seen.add(key);
			return true;
		})
		.slice(0, 5);
}

export const useForecastQuery = (params: UseForecastQueryParams) => {
	return useQuery({
		queryKey: [...forecastQueryKeys.all, params.lat, params.lon],
		queryFn: async () => {
			const data = await weatherApi.fetchForecast({
				lat: params.lat!,
				lon: params.lon!,
			});
			return {
				...data,
				daily: onePerDay(data.list),
			};
		},
		placeholderData: keepPreviousData,
		enabled: params.lat != null && params.lon != null,
	});
};
