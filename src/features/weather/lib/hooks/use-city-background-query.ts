import { weatherApi } from "@/features/weather/lib/api/weather";
import { useQuery } from "@tanstack/react-query";

export const cityBackgroundQueryKeys = {
  all: ["city-background"] as const,
  city: (city: string) => [...cityBackgroundQueryKeys.all, city] as const,
};

export const useCityBackgroundQuery = (cityName: string | undefined) => {
  return useQuery({
    queryKey: cityBackgroundQueryKeys.city(cityName ?? ""),
    queryFn: () => weatherApi.fetchCityBackground(cityName!),
    enabled: !!cityName?.trim(),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
