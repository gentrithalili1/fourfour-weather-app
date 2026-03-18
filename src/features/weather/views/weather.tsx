import { useCallback } from "react";
import type { CityGeocoding } from "@core/types/weather";
import { useCityWeatherMutation } from "@/features/weather/lib/hooks/use-city-weather-mutation";
import { SearchCityCombobox } from "@/features/weather/lib/components/search-city-combobox";
import { RecentSearch } from "@/features/weather/lib/components/recent-search";

export function Weather() {
  const cityWeatherMutation = useCityWeatherMutation();

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

  return (
    <div className="flex min-h-full flex-1 flex-col gap-6 p-6 lg:p-8">
      <SearchCityCombobox onSelect={onSelect} />

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

      <RecentSearch />
    </div>
  );
}
