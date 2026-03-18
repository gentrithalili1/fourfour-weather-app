import { API_PATHS } from "../constants";
import { searchCities } from "../openweather";

export async function handleSearch(
  request: Request,
  getApiKey: () => string | null
): Promise<Response | null> {
  const url = new URL(request.url);
  if (url.pathname !== API_PATHS.SEARCH || request.method !== "GET") {
    return null;
  }

  const q = url.searchParams.get("q");
  const apiKey = getApiKey();
  if (!q?.trim() || !apiKey) {
    return Response.json(
      { error: "Missing query or API key" },
      { status: 400 }
    );
  }

  const data = await searchCities(q.trim(), apiKey);
  return Response.json(data);
}
