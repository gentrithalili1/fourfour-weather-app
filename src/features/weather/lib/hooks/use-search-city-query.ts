import { weatherApi } from "@/features/weather/lib/api/weather";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const searchCityQueryKeys = {
  search: (query: string) => ["search-city", query] as const,
};

export const useSearchCityQuery = (searchTerm: string) => {
  const query = useQuery({
    queryKey: searchCityQueryKeys.search(searchTerm),
    queryFn: () => weatherApi.search(searchTerm),
    enabled: searchTerm.length > 0,
  });

  const deduplicatedResults = useMemo(() => {
    if (!query.data) return [];
    const seen = new Set<string>();
    return query.data.filter((city) => {
      const key = `${city.name}-${city.country}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [query.data]);

  return { ...query, data: deduplicatedResults };
};
