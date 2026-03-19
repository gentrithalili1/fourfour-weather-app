import type { CityBackground } from "@core/types/common";
import { useQuery } from "@tanstack/react-query";

import { weatherApi } from "@/features/weather/lib/api/weather";

export const cityBackgroundQueryKeys = {
	all: ["city-background"] as const,
	city: (str: string) => [...cityBackgroundQueryKeys.all, str] as const,
};

export const useCityBackgroundQuery = (str?: string) => {
	return useQuery<CityBackground, Error>({
		queryKey: cityBackgroundQueryKeys.city(str!),
		queryFn: () => weatherApi.fetchCityBackground(str!),
		enabled: !!str?.trim(),
		staleTime: Infinity,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
	});
};
