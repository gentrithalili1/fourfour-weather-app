import { weatherApi } from "@/features/weather/lib/api/weather";
import { recentSearchQueryKeys } from "@/features/weather/lib/hooks/use-recent-search-query";
import type { CityWeather } from "@core/types/weather";
import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";

export const cityWeatherMutationKeys = {
  all: ["fetch-city-weather"] as const,
};

export const useCityWeatherMutation = (
  options?: Omit<
    UseMutationOptions<CityWeather, Error, { lat: number; lon: number }>,
    "mutationFn"
  >,
) => {
  const queryClient = useQueryClient();
  return useMutation<CityWeather, Error, { lat: number; lon: number }>({
    mutationKey: cityWeatherMutationKeys.all,
    mutationFn: ({ lat, lon }) => weatherApi.fetchCityWeather(lat, lon),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: recentSearchQueryKeys.all,
      });
    },
    ...options,
  });
};
