import { useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { Button } from "@/core/components/ui/button";
import type { CityGeocoding, CityWeather } from "@core/types/weather";
import { useRecentSearchQuery } from "@/features/weather/lib/hooks/use-recent-search-query";
import { useCityWeatherMutation } from "@/features/weather/lib/hooks/use-city-weather-mutation";
import { SearchCityCombobox } from "@/features/weather/lib/components/search-city-combobox";
import { useClearRecentSearchMutation } from "@/features/weather/lib/hooks/use-clear-recent-search-mutation";
import { Trash2 } from "lucide-react";
import { Spinner } from "@/core/components/ui/spinner";

export function Weather() {
  const recentSearchQuery = useRecentSearchQuery();
  const cityWeatherMutation = useCityWeatherMutation();
  const clearRecentMutation = useClearRecentSearchMutation();

  const onSelect = useCallback(
    async (city: CityGeocoding) => {
      try {
        const data = await cityWeatherMutation.mutateAsync({
          lat: city.lat,
          lon: city.lon,
        });
        console.log("data", data);
      } catch {
        // ignore
      }
    },
    [cityWeatherMutation],
  );

  const onSelectRecent = (c: CityWeather) => {
    console.log("c", c);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col gap-6 p-6 lg:p-8">
      <div className="shrink-0 flex justify-center">
        <SearchCityCombobox onSelect={onSelect} />

        {/* <div className="relative w-full max-w-xl">
          <Search className="absolute left-5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-12 pl-12 text-base"
          />
        </div> */}
      </div>

      {/* {selected && (
        <>
          <div className="relative flex min-h-0 flex-1 overflow-hidden rounded-2xl bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 text-white shadow-2xl ring-1 ring-white/10 dark:from-sky-600 dark:via-blue-700 dark:to-indigo-800">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.2),transparent)]" />
            <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-6 p-8 lg:p-12">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="rounded-3xl bg-white/20 p-8 backdrop-blur-md">
                  <Cloud className="size-16 lg:size-18" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  {selected.temp}°
                </h1>
                <p className="text-2xl font-medium opacity-95 lg:text-3xl">
                  {selected.name}, {selected.country}
                </p>
                <p className="text-lg text-white/90 capitalize">
                  {selected.description}
                </p>
              </div>
            </div>
          </div>
        </>
      )} */}

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
              {recentSearchQuery.data?.map((c) => (
                <Button
                  key={c.id}
                  variant="outline"
                  className="h-auto justify-start py-3"
                  onClick={() => onSelectRecent(c)}
                >
                  {c.name}, {c.sys.country} — {c.main.temp}°C
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
    </div>
  );
}
