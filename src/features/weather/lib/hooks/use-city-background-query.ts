import type { CityBackground } from "@core/types/common";
import { useQuery } from "@tanstack/react-query";

import { weatherApi } from "@/features/weather/lib/api/weather";

import type { CityWeather } from "@/core/types/weather";

export const cityBackgroundQueryKeys = {
	all: ["city-background"] as const,
	city: (str: string) => [...cityBackgroundQueryKeys.all, str] as const,
};

type UseCityBackgroundQueryParams = {
	cityWeather?: CityWeather;
};
export const useCityBackgroundQuery = (params?: UseCityBackgroundQueryParams) => {
	const { cityWeather } = params ?? {};

	const localHour = cityWeather
		? new Date((cityWeather?.dt + cityWeather?.timezone) * 1000).getUTCHours()
		: undefined;
	const dayPart = localHour ? (localHour >= 6 && localHour < 18 ? "day" : "night") : undefined;
	const description = cityWeather?.weather[0]?.description?.trim() || "weather";

	const imageQuery = `${dayPart} ${description}`;
	return useQuery<CityBackground, Error>({
		queryKey: cityBackgroundQueryKeys.city(imageQuery),
		queryFn: () => weatherApi.fetchCityBackground(imageQuery),
		enabled: Boolean(cityWeather && imageQuery),
	});
};
