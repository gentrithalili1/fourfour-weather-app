import { apiRequest } from "@core/api/api-request";
import type { CityGeocoding, CityWeather, Coord } from "@core/types/weather";

const getRecentCityWeatherSearch = async () => {
	return apiRequest.get<CityWeather[]>(`/recent`);
};

const clearRecentSearch = async () => {
	return apiRequest.delete<{ ok: boolean }>(`/recent`);
};

const fetchCityWeather = async (params: Coord) => {
	return apiRequest.get<CityWeather>(`/fetch`, { params });
};

const addToRecentSearch = async (cityWeather: CityWeather) => {
	return apiRequest.post<{ ok: boolean }>(`/recent`, cityWeather);
};

const searchCityGeocoding = async (query: string) => {
	return apiRequest.get<CityGeocoding[]>(`/search`, { params: { q: query } });
};

const fetchCityBackground = async (query: string) => {
	return apiRequest.get<{
		imageUrl: string | null;
		photographer: { name: string; url: string } | null;
	}>(`/background`, { params: { q: query } });
};

export const weatherApi = {
	searchCityGeocoding,
	fetchCityWeather,
	fetchCityBackground,
	addToRecentSearch,
	getRecentCityWeatherSearch,
	clearRecentSearch,
};
