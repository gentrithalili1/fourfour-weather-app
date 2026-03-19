import { useClearRecentSearchMutation } from "@/features/weather/lib/hooks/use-clear-recent-search-mutation";
import { useRecentSearchQuery } from "@/features/weather/lib/hooks/use-recent-search-query";
import { useCityGeocodingStore } from "@/features/weather/lib/stores/city-geocoding-store";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/core/components/ui/card";
import { Button } from "@/core/components/ui/button";
import { Spinner } from "@/core/components/ui/spinner";
import type { CityWeather } from "@/core/types/weather";
import { transformCityWeatherToCityGeocoding } from "@/features/weather/lib/utils/data-transform";

export function RecentSearch() {
  const recentSearchQuery = useRecentSearchQuery();
  const clearRecentMutation = useClearRecentSearchMutation();
  const cityGeocodingStore = useCityGeocodingStore();

  const handleSelect = (city: CityWeather) => {
    cityGeocodingStore.setCityGeocoding(
      transformCityWeatherToCityGeocoding(city),
    );
  };

  return (
    <Card className="shrink-0">
      <CardHeader>
        <CardTitle>Recent</CardTitle>
        <CardDescription>Recent searched cities</CardDescription>
      </CardHeader>
      <CardContent>
        {recentSearchQuery.data?.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Search for cities to see them here
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {recentSearchQuery.data?.map((city) => (
              <Button
                key={city.id}
                variant="outline"
                className="h-auto justify-start py-3"
                onClick={() => handleSelect(city)}
              >
                {city.name}, {city.sys.country} — {city.main.temp}°C
              </Button>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Button
          disabled={clearRecentMutation.isPending}
          variant="destructive"
          size="sm"
          onClick={() => clearRecentMutation.mutate()}
        >
          {clearRecentMutation.isPending ? (
            <Spinner className="size-4" data-icon="inline-start" />
          ) : null}
          Clear
        </Button>
      </CardFooter>
    </Card>
  );
}
