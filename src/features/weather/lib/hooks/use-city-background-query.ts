import { weatherApi } from "@/features/weather/lib/api/weather";
import { useQuery } from "@tanstack/react-query";

export const cityBackgroundQueryKeys = {
  all: ["city-background"] as const,
  city: (str: string) => [...cityBackgroundQueryKeys.all, str] as const,
};

export const useCityBackgroundQuery = (str?: string) => {
  return useQuery({
    queryKey: cityBackgroundQueryKeys.city(str!),
    queryFn: () => weatherApi.fetchCityBackground(str!),
    enabled: !!str?.trim(),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
