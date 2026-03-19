import { OPENWEATHER } from "../utils/constants";
import type { CityGeocoding } from "@core/types/weather";

export async function handleSearch(
	request: Request,
	getApiKey: () => string | null
): Promise<Response> {
	const url = new URL(request.url);
	const q = url.searchParams.get("q");
	const apiKey = getApiKey();
	if (!q?.trim() || !apiKey) {
		return Response.json({ error: "Missing query or API key" }, { status: 400 });
	}

	const data = await searchCityGeocoding(q.trim(), apiKey);
	return Response.json(data);
}

async function searchCityGeocoding(query: string, apiKey: string): Promise<CityGeocoding[]> {
	const url = `${OPENWEATHER.GEO}?q=${encodeURIComponent(query)}&limit=5&appid=${apiKey}`;
	const res = await fetch(url);
	if (!res.ok) {
		const data = (await res.json()) as { message?: string };
		throw new Error(data?.message ?? "Geocoding failed");
	}

	return (await res.json()) as CityGeocoding[];
}
