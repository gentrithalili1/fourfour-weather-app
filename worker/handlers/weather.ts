import { OPENWEATHER } from "../utils/constants";
import type { CityWeather } from "@core/types/weather";

export async function handleFetch(
  request: Request,
  getApiKey: () => string | null,
  getDoStub: () => DurableObjectStub,
): Promise<Response> {
  const body = (await request.json()) as { lat?: number; lon?: number };
  const { lat, lon } = body;
  const apiKey = getApiKey();
  if (lat == null || lon == null || !apiKey) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
  const cityWeather = await fetchCityWeather({ lat, lon, apiKey });
  const stub = getDoStub();
  await stub.fetch("https://do/api/weather/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cityWeather),
  });

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
