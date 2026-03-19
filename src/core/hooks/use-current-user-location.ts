import type { Coord } from "@core/types/weather";
import { useQuery } from "@tanstack/react-query";

import { apiRequest } from "@/core/api/api-request";

// Try to get the user's location from the browser,
// if not available, get it from the open weather API,
// if not available, return the default coordinates (Oslo, Norway).
const DEFAULT_COORDS: Coord = { lat: 59.9139, lon: 10.7522 }; // Oslo, Norway

const getBrowserUserLocationCoords = (): Promise<Coord> => {
	return new Promise((resolve, reject) => {
		if (!navigator.geolocation) {
			reject(new Error("Geolocation not supported"));
			return;
		}
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				resolve({
					lat: pos.coords.latitude,
					lon: pos.coords.longitude,
				});
			},
			reject,
			{ enableHighAccuracy: false, timeout: 5000, maximumAge: 300000 }
		);
	});
};

const getOpenWeatherUserLocation = async (): Promise<Coord> => {
	const openWeatherUserLocation = await apiRequest.get<Coord>(`/location`);
	return openWeatherUserLocation ?? DEFAULT_COORDS;
};

const getUserLocationCoords = async (): Promise<Coord> => {
	try {
		return await getBrowserUserLocationCoords();
	} catch {
		const openWeatherUserLocation = await getOpenWeatherUserLocation();
		return openWeatherUserLocation ?? DEFAULT_COORDS;
	}
};

export const currentUserLocationQueryKeys = {
	all: ["current-user-location"] as const,
};

interface UseCurrentUserLocationParams {
	enabled: boolean;
}

export const useCurrentUserLocation = (params: UseCurrentUserLocationParams) => {
	return useQuery<Coord, Error>({
		queryKey: currentUserLocationQueryKeys.all,
		queryFn: getUserLocationCoords,
		enabled: params.enabled,
		staleTime: Infinity,
		retry: 1,
	});
};
