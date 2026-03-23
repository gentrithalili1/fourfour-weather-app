import { apiRequest } from "@core/api/api-request";
import type { CityBackground, WithOkResponse } from "@core/types/common";
import type { CityGeocoding, CityWeather, Coord, ForecastResponse } from "@core/types/weather";

const getRecentCityWeatherSearch = async () => {
	return apiRequest.get<CityWeather[]>(`/recent`);
};

const clearRecentSearch = async () => {
	return apiRequest.delete<WithOkResponse>(`/recent`);
};

const deleteRecentSearchItem = async (id: number) => {
	return apiRequest.delete<WithOkResponse>(`/recent`, { params: { id } });
};

const fetchCityWeather = async (params: Coord) => {
	return apiRequest.get<CityWeather>(`/fetch`, { params });
};

const fetchForecast = async (params: Coord) => {
	return apiRequest.get<ForecastResponse>(`/forecast`, { params });
};

const addToRecentSearch = async (cityWeather: CityWeather) => {
	return apiRequest.post<WithOkResponse>(`/recent`, cityWeather);
};

const searchCityGeocoding = async (query: string) => {
	return apiRequest.get<CityGeocoding[]>(`/search`, { params: { q: query } });
};

const fetchCityBackground = async (query: string) => {
	return apiRequest.get<CityBackground>(`/background`, { params: { q: query } });
};

export const weatherApi = {
	searchCityGeocoding,
	fetchCityWeather,
	fetchForecast,
	fetchCityBackground,
	addToRecentSearch,
	getRecentCityWeatherSearch,
	clearRecentSearch,
	deleteRecentSearchItem,
};
