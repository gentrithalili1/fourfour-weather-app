import { Trash2 } from "lucide-react";

import { useClearRecentSearchMutation } from "@/features/weather/lib/hooks/use-clear-recent-search-mutation";
import { useRecentSearchQuery } from "@/features/weather/lib/hooks/use-recent-search-query";
import { useCityGeocodingStore } from "@/features/weather/lib/stores/city-geocoding-store";
import { transformCityWeatherToCityGeocoding } from "@/features/weather/lib/utils/data-transform";
import { getOwIconSrc } from "@/features/weather/lib/utils/get-ow-icon-src";

import { Button } from "@/core/components/ui/button";
import { Spinner } from "@/core/components/ui/spinner";
import { useFormatTemperature } from "@/core/hooks/use-format-temperature";
import type { CityWeather } from "@/core/types/weather";
import { scrollToTop } from "@/core/utils/scroll";

export function RecentSearch() {
	const recentSearchQuery = useRecentSearchQuery();
	const clearRecentMutation = useClearRecentSearchMutation();
	const cityGeocodingStore = useCityGeocodingStore();
	const formatTemperature = useFormatTemperature();

	const handleSelect = (city: CityWeather) => {
		scrollToTop();
		cityGeocodingStore.setCityGeocoding(transformCityWeatherToCityGeocoding(city));
	};

	const cities = recentSearchQuery.data ?? [];
	const isEmpty = cities.length === 0;

	return (
		<div className="flex flex-col gap-5 mb-4">
			<div className="flex items-center justify-between border-b border-border/50 pb-2">
				<h2 className="text-md font-semibold">Recent</h2>

				{!isEmpty && (
					<Button
						variant="outline"
						aria-label="Clear recent searches"
						onClick={() => clearRecentMutation.mutate()}
						disabled={clearRecentMutation.isPending}>
						{clearRecentMutation.isPending ? (
							<Spinner className="size-3.5" />
						) : (
							<Trash2 className="size-3.5" aria-hidden />
						)}
						Clear
					</Button>
				)}
			</div>

			{isEmpty ? (
				<p className="text-sm">Search for cities to see them here</p>
			) : (
				<div className="flex flex-row overflow-x-auto gap-2 pb-3">
					{cities.map((city) => (
						<Button
							key={city.id}
							variant="outline"
							aria-label={`Select ${city.name}, ${city.sys.country} - ${formatTemperature(city.main.temp)}`}
							onClick={() => handleSelect(city)}>
							<img
								src={getOwIconSrc(city.weather[0].icon)}
								alt={city.weather[0].description}
								className="size-10"
							/>

							<span>
								{city.name}, {city.sys.country}
							</span>
							<span className="ml-2 ">{formatTemperature(city.main.temp)}</span>
						</Button>
					))}
				</div>
			)}
		</div>
	);
}
