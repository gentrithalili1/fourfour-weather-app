import { API_PATHS } from "../constants";
import { fetchWeather } from "../openweather";

export async function handleFetch(
  request: Request,
  getApiKey: () => string | null,
  getDoStub: () => DurableObjectStub
): Promise<Response | null> {
  const url = new URL(request.url);
  if (url.pathname !== API_PATHS.FETCH || request.method !== "POST") {
    return null;
  }

  const body = (await request.json()) as { lat?: number; lon?: number };
  const { lat, lon } = body;
  const apiKey = getApiKey();
  if (lat == null || lon == null || !apiKey) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const cityWeather = await fetchWeather(lat, lon, apiKey);

  const stub = getDoStub();
  await stub.fetch("https://do/api/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cityWeather),
  });

  return Response.json(cityWeather);
}
