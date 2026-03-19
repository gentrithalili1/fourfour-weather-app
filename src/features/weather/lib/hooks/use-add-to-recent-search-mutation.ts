import type { CityWeather, Coord } from "@core/types/weather";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";

import { weatherApi } from "@/features/weather/lib/api/weather";
import { recentSearchQueryKeys } from "@/features/weather/lib/hooks/use-recent-search-query";

export const addToRecentSearchMutationKeys = {
	all: ["fetch-city-weather"] as const,
};

export const useAddToRecentSearchMutation = (
	options?: Omit<UseMutationOptions<CityWeather, Error, Coord>, "mutationFn">
) => {
	const queryClient = useQueryClient();

	return useMutation<CityWeather, Error, Coord>({
		mutationKey: addToRecentSearchMutationKeys.all,
		mutationFn: async ({ lat, lon }) => {
			const cityWeather = await weatherApi.fetchCityWeather({ lat, lon });
			await weatherApi.addToRecentSearch(cityWeather);
			return cityWeather;
		},
		onSuccess: async () => {
			queryClient.invalidateQueries({
				queryKey: recentSearchQueryKeys.all,
			});
		},
		...options,
	});
};
