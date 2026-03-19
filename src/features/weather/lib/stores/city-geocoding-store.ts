import type { CityGeocoding } from "@/core/types/weather";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { generateStorageKey } from "@/core/utils/storage";

type CityGeocodingState = {
  cityGeocoding: CityGeocoding | null;
  setCityGeocoding: (cityGeocoding: CityGeocoding | null) => void;
};

type CityGeocodingActions = {
  setCityGeocoding: (cityGeocoding: CityGeocoding | null) => void;
};

export const useCityGeocodingStore = create<
  CityGeocodingState & CityGeocodingActions
>()(
  persist(
    (set) => ({
      cityGeocoding: null,
      setCityGeocoding: (cityGeocoding) => set({ cityGeocoding }),
    }),
    { name: generateStorageKey("city-geocoding") },
  ),
);
