import { useState } from "react";
import { Search, Cloud } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { Input } from "@/core/components/ui/input";
import { Button } from "@/core/components/ui/button";
import { useDebounce } from "@core/hooks/use-debounce";
import type { SearchCity, CityWeather } from "@core/types/weather";
import { useSearchCityQuery } from "@/features/weather/lib/hooks/use-search-city-query";
import { useRecentSearchCitiesQuery } from "@/features/weather/lib/hooks/use-recent-search-cities-query";
import { useFetchCityWeatherMutation } from "@/features/weather/lib/hooks/use-fetch-city-weather-mutation";

export function Weather() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<CityWeather | null>(null);
  const debounced = useDebounce(search.trim(), 300);

  const searchCityQuery = useSearchCityQuery(debounced);
  const recentSearchCitiesQuery = useRecentSearchCitiesQuery();
  const fetchCityWeatherMutation = useFetchCityWeatherMutation();

  const onSelect = async (city: SearchCity) => {
    try {
      const data = await fetchCityWeatherMutation.mutateAsync({
        lat: city.lat,
        lon: city.lon,
      });
      setSelected(data);
      setSearch("");
    } catch {
      // ignore
    }
  };

  const onSelectRecent = (c: CityWeather) => {
    setSelected(c);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col gap-6 p-6 lg:p-8">
      <div className="shrink-0 flex justify-center">
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-12 pl-12 text-base"
          />
        </div>
      </div>

      {debounced && (
        <Card className="mx-auto w-full max-w-xl">
          <CardHeader>
            <CardTitle>Search results</CardTitle>
            <CardDescription>
              {searchCityQuery.isFetching
                ? "Searching..."
                : `${searchCityQuery.data?.length} cities found`}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {searchCityQuery.data?.length === 0 &&
            !searchCityQuery.isFetching ? (
              <p className="text-sm text-muted-foreground">No results</p>
            ) : (
              <div className="flex flex-col gap-2">
                {searchCityQuery.data?.map((c) => (
                  <Button
                    key={c.id}
                    variant="outline"
                    className="h-auto justify-start py-3"
                    onClick={() => onSelect(c)}
                    disabled={fetchCityWeatherMutation.isPending}
                  >
                    {c.name}, {c.country}
                  </Button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {selected && (
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
      )}

      <Card className="shrink-0">
        <CardHeader>
          <CardTitle>Recent</CardTitle>
          <CardDescription>Searched locations</CardDescription>
        </CardHeader>
        <CardContent>
          {recentSearchCitiesQuery.data?.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Search for cities to see them here
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {recentSearchCitiesQuery.data?.map((c) => (
                <Button
                  key={c.id}
                  variant="outline"
                  className="h-auto justify-start py-3"
                  onClick={() => onSelectRecent(c)}
                >
                  {c.name}, {c.country} — {c.temp}°C
                </Button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
