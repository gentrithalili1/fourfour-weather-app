import { OPENWEATHER } from "../utils/constants";
import type { CityWeather } from "@core/types/weather";

export async function handleFetch(
  request: Request,
  getApiKey: () => string | null,
): Promise<Response> {
  const url = new URL(request.url);
  const lat = Number(url.searchParams.get("lat"));
  const lon = Number(url.searchParams.get("lon"));
  const apiKey = getApiKey();
  if (Number.isNaN(lat) || Number.isNaN(lon) || !apiKey) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
  const cityWeather = await fetchCityWeather({ lat, lon, apiKey });
  return Response.json(cityWeather);
}

async function fetchCityWeather(params: {
  lat: number;
  lon: number;
  apiKey: string;
}): Promise<CityWeather> {
  const { lat, lon, apiKey } = params;
  const url = `${OPENWEATHER.WEATHER}?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Weather fetch failed");
  }
  return data as CityWeather;
}
