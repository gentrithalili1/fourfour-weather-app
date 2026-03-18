import { apiRequest } from "@core/api/api-request";
import type { SearchCity, CityWeather } from "@core/types/weather";

const getRecentWeather = async () => {
  return apiRequest.get<CityWeather[]>(`/recent`);
};

const fetchWeather = async (lat: number, lon: number) => {
  return apiRequest.post<CityWeather>(`/fetch`, { lat, lon });
};

const searchWeather = async (query: string) => {
  return apiRequest.get<SearchCity[]>(`/search`, { params: { q: query } });
};

export const weatherApi = {
  search: searchWeather,
  fetch: fetchWeather,
  recent: getRecentWeather,
};
