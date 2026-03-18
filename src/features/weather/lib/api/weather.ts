import { apiRequest } from "@core/api/api-request";
import type { CityGeocoding, CityWeather } from "@core/types/weather";

const getRecentCityWeatherSearch = async () => {
  return apiRequest.get<CityWeather[]>(`/recent`);
};

const fetchCityWeather = async (lat: number, lon: number) => {
  return apiRequest.post<CityWeather>(`/fetch`, { lat, lon });
};

const searchCityGeocoding = async (query: string) => {
  return apiRequest.get<CityGeocoding[]>(`/search`, { params: { q: query } });
};

export const weatherApi = {
  searchCityGeocoding: searchCityGeocoding,
  fetchCityWeather: fetchCityWeather,
  getRecentSearch: getRecentCityWeatherSearch,
};
