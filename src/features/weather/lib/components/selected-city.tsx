import { Card, CardContent } from "@/core/components/ui/card";
import { Skeleton } from "@/core/components/ui/skeleton";
import { useCityWeatherQuery } from "@/features/weather/lib/hooks/use-city-weather-query";

import { useCityGeocodingStore } from "@/features/weather/lib/stores/city-geocoding-store";
import { Cloud } from "lucide-react";
import { useCurrentUserLocation } from "@/core/hooks/use-current-user-location";

export function SelectedCity() {
  const cityGeocodingStore = useCityGeocodingStore();
  const currentUserLocation = useCurrentUserLocation(
    !cityGeocodingStore.cityGeocoding,
  );
  const coords = cityGeocodingStore.cityGeocoding ?? currentUserLocation.data;
  const cityWeatherQuery = useCityWeatherQuery({
    lat: coords?.lat,
    lon: coords?.lon,
  });

  const selected = cityWeatherQuery.data;
  const isLoading =
    currentUserLocation.isLoading ||
    (coords != null && cityWeatherQuery.isFetching);

  return (
    <>
      {isLoading ? (
        <div className="flex min-h-0 flex-1 overflow-hidden rounded-xl bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 text-white shadow-2xl ring-1 ring-white/10 dark:from-sky-600 dark:via-blue-700 dark:to-indigo-800 flex-col items-center justify-center">
          <Skeleton className="w-full h-full" />
        </div>
      ) : selected ? (
        <Card>
          <CardContent className="p-0">
            <div className="relative flex min-h-0 flex-1 overflow-hidden rounded-xl bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 text-white shadow-2xl ring-1 ring-white/10 dark:from-sky-600 dark:via-blue-700 dark:to-indigo-800">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.2),transparent)]" />
              <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-6 p-8 lg:p-12">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="rounded-3xl bg-white/20 p-8 backdrop-blur-md">
                    <Cloud className="size-16 lg:size-18" />
                  </div>
                  <h1 className="text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                    {selected.main.temp}°
                  </h1>
                  <p className="text-2xl font-medium opacity-95 lg:text-3xl">
                    {selected.name}, {selected.sys.country}
                  </p>
                  <p className="text-lg text-white/90 capitalize">
                    {selected.weather[0].description}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </>
  );
}
