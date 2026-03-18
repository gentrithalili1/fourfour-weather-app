import { weatherApi } from "@/features/weather/lib/api/weather";
import { useQuery } from "@tanstack/react-query";

export const searchCityQueryKeys = {
  search: (query: string) => ["search-city", query] as const,
};

export const useSearchCityQuery = (query: string) => {
  return useQuery({
    queryKey: searchCityQueryKeys.search(query),
    queryFn: () => weatherApi.search(query),
    enabled: query.length > 0,
  });
};
