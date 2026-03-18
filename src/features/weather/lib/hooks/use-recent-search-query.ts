import { weatherApi } from "@/features/weather/lib/api/weather";
import type { CityWeather } from "@core/types/weather";
import { useQuery } from "@tanstack/react-query";

export const recentSearchQueryKeys = {
  all: ["recent-search-cities"] as const,
};

export const useRecentSearchQuery = () => {
  return useQuery<CityWeather[], Error>({
    queryKey: recentSearchQueryKeys.all,
    queryFn: () => weatherApi.getRecentSearch(),
  });
};
