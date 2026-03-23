import { useMutation, useQueryClient } from "@tanstack/react-query";

import { weatherApi } from "@/features/weather/lib/api/weather";
import { recentSearchQueryKeys } from "@/features/weather/lib/hooks/use-recent-search-query";

import type { CityWeather } from "@/core/types/weather";

export const useDeleteRecentSearchItemMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: number) => weatherApi.deleteRecentSearchItem(id),
		onSuccess: (_, id) => {
			queryClient.setQueryData(recentSearchQueryKeys.all, (prev: CityWeather[] | undefined) =>
				(prev ?? []).filter((c: CityWeather) => c.id !== id)
			);
		},
	});
};
