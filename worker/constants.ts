export const OPENWEATHER = {
  GEO: "https://api.openweathermap.org/geo/1.0/direct",
  WEATHER: "https://api.openweathermap.org/data/2.5/weather",
} as const;

export const API_PATHS = {
  SEARCH: "/api/weather/search",
  FETCH: "/api/weather/fetch",
  RECENT: "/api/weather/recent",
} as const;
