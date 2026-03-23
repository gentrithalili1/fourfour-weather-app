import { useCityGeocodingStore } from "@/features/weather/lib/stores/city-geocoding-store";

import { useCurrentUserLocation } from "@/core/hooks/use-current-user-location";

export const useSelectedCityCoords = () => {
	const cityGeocodingStore = useCityGeocodingStore();
	const currentUserLocation = useCurrentUserLocation({
		enabled: !cityGeocodingStore.cityGeocoding,
	});

	return {
		error: currentUserLocation.error,
		data: cityGeocodingStore.cityGeocoding ?? currentUserLocation.data,
		isFetching: currentUserLocation.isFetching,
		isLoading: currentUserLocation.isLoading,
	};
};
