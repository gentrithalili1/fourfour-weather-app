import { weatherApi } from "@/features/weather/lib/api/weather";
import type { CityWeather } from "@/features/weather/lib/types";
import { useQuery } from "@tanstack/react-query";

export const recentSearchCitiesQueryKeys = {
  all: ["recent-search-cities"] as const,
};

export const useRecentSearchCitiesQuery = () => {
  return useQuery<CityWeather[], Error>({
    queryKey: recentSearchCitiesQueryKeys.all,
    queryFn: () => weatherApi.recent(),
  });
};
