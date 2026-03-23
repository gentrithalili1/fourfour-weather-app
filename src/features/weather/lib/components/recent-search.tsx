import { RecentSearchCity } from "./recent-search-city";
import { Trash2 } from "lucide-react";

import { useClearRecentSearchMutation } from "@/features/weather/lib/hooks/use-clear-recent-search-mutation";
import { useDeleteRecentSearchItemMutation } from "@/features/weather/lib/hooks/use-delete-recent-search-item-mutation";
import { useRecentSearchQuery } from "@/features/weather/lib/hooks/use-recent-search-query";
import { useCityGeocodingStore } from "@/features/weather/lib/stores/city-geocoding-store";
import { transformCityWeatherToCityGeocoding } from "@/features/weather/lib/utils/data-transform";

import { ErrorMessage } from "@/core/components/shared/error-message";
import { LoadingData } from "@/core/components/shared/loading-data";
import { Button } from "@/core/components/ui/button";
import { Spinner } from "@/core/components/ui/spinner";
import { useErrorHandler } from "@/core/hooks/use-error-handler";
import type { CityWeather } from "@/core/types/weather";
import { scrollToTop } from "@/core/utils/scroll";

export function RecentSearch() {
	const recentSearchQuery = useRecentSearchQuery();
	const clearRecentMutation = useClearRecentSearchMutation();
	const deleteItemMutation = useDeleteRecentSearchItemMutation();
	const cityGeocodingStore = useCityGeocodingStore();
	const errorHandler = useErrorHandler();

	const handleSelect = (city: CityWeather) => {
		scrollToTop();
		cityGeocodingStore.setCityGeocoding(transformCityWeatherToCityGeocoding(city));
	};

	const handleDelete = async (id: number) => {
		try {
			await deleteItemMutation.mutateAsync(id);
		} catch (error) {
			errorHandler.handleError({ error });
		}
	};

	const handleClearAll = async () => {
		try {
			await clearRecentMutation.mutateAsync();
		} catch (error) {
			errorHandler.handleError({ error });
		}
	};

	const cities = recentSearchQuery.data ?? [];
	const isEmpty = cities.length === 0;

	return (
		<div className="flex flex-col gap-5 mb-4" aria-labelledby="recent-search-heading">
			<div className="flex items-center justify-between border-b border-border/50 pb-2">
				<h2 id="recent-search-heading" className="text-md font-semibold">
					Recent searches
				</h2>

				{!isEmpty && (
					<Button
						variant="outline"
						aria-label="Clear recent searches"
						onClick={handleClearAll}
						disabled={clearRecentMutation.isPending}>
						{clearRecentMutation.isPending ? (
							<Spinner className="size-3.5" aria-hidden />
						) : (
							<Trash2 className="size-3.5" aria-hidden />
						)}
						Clear
					</Button>
				)}
			</div>

			<div aria-live="polite" aria-busy={recentSearchQuery.isLoading}>
				{recentSearchQuery.isLoading ? (
					<LoadingData message="Loading recent searches..." />
				) : recentSearchQuery.error ? (
					<ErrorMessage error={recentSearchQuery.error} />
				) : isEmpty ? (
					<p className="text-sm">Search for cities to see them here.</p>
				) : (
					<ul
						role="list"
						className="flex flex-row overflow-x-auto gap-3 pb-3 list-none p-0 m-0"
						aria-label="Recent city searches">
						{cities.map((city) => (
							<RecentSearchCity
								key={city.id}
								city={city}
								isDeleting={
									deleteItemMutation.isPending && deleteItemMutation.variables === city.id
								}
								onSelect={handleSelect}
								onDelete={handleDelete}
							/>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}
