import { OPENWEATHER } from "./constants";

export interface GeoCity {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

export async function searchCities(
  query: string,
  apiKey: string
): Promise<GeoCity[]> {
  const url = `${OPENWEATHER.GEO}?q=${encodeURIComponent(query)}&limit=5&appid=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) {
    const data = (await res.json()) as { message?: string };
    throw new Error(data?.message ?? "Geocoding failed");
  }
  return res.json();
}

export interface WeatherData {
  id: string;
  name: string;
  country: string;
  temp: number;
  description: string;
  lat: number;
  lon: number;
  searchedAt: number;
}

export async function fetchWeather(
  lat: number,
  lon: number,
  apiKey: string
): Promise<WeatherData> {
  const url = `${OPENWEATHER.WEATHER}?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  const res = await fetch(url);
  const data = (await res.json()) as {
    name: string;
    sys: { country: string };
    main: { temp: number };
    weather: Array<{ description: string }>;
    coord: { lat: number; lon: number };
    cod?: number;
    message?: string;
  };
  if (!res.ok || (data.cod != null && data.cod >= 400)) {
    throw new Error(data?.message ?? "Weather fetch failed");
  }
  return {
    id: `${data.coord.lat.toFixed(2)}_${data.coord.lon.toFixed(2)}`,
    name: data.name,
    country: data.sys.country,
    temp: Math.round(data.main.temp),
    description: data.weather[0]?.description ?? "",
    lat: data.coord.lat,
    lon: data.coord.lon,
    searchedAt: Date.now(),
  };
}
