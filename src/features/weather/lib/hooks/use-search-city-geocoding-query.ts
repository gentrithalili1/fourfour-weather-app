import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { weatherApi } from "@/features/weather/lib/api/weather";

export const searchCityGeocodingQueryKeys = {
	search: (query: string) => ["search-city", query] as const,
};

export const useSearchCityGeocodingQuery = (searchTerm: string) => {
	const query = useQuery({
		queryKey: searchCityGeocodingQueryKeys.search(searchTerm),
		queryFn: () => weatherApi.searchCityGeocoding(searchTerm),
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
