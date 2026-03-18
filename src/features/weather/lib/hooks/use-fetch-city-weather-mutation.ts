import { weatherApi } from "@/features/weather/lib/api/weather";
import { recentSearchCitiesQueryKeys } from "@/features/weather/lib/hooks/use-recent-search-cities-query";
import type { CityWeather } from "@/features/weather/lib/types";
import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";

export const fetchCityWeatherMutationKeys = {
  all: ["fetch-city-weather"] as const,
};

export const useFetchCityWeatherMutation = (
  options?: Omit<
    UseMutationOptions<CityWeather, Error, { lat: number; lon: number }>,
    "mutationFn"
  >,
) => {
  const queryClient = useQueryClient();
  return useMutation<CityWeather, Error, { lat: number; lon: number }>({
    mutationKey: fetchCityWeatherMutationKeys.all,
    mutationFn: ({ lat, lon }) => weatherApi.fetch(lat, lon),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: recentSearchCitiesQueryKeys.all,
      });
    },
    ...options,
  });
};
