import { OPENWEATHER } from "../utils/constants";
import type { ForecastResponse } from "@core/types/weather";

export async function handleForecast(
	request: Request,
	getApiKey: () => string | null
): Promise<Response> {
	const url = new URL(request.url);
	const lat = Number(url.searchParams.get("lat"));
	const lon = Number(url.searchParams.get("lon"));
	const apiKey = getApiKey();
	if (Number.isNaN(lat) || Number.isNaN(lon) || !apiKey) {
		return Response.json({ error: "Invalid request" }, { status: 400 });
	}
	const forecast = await fetchForecast({ lat, lon, apiKey });
	return Response.json(forecast);
}

async function fetchForecast(params: {
	lat: number;
	lon: number;
	apiKey: string;
}): Promise<ForecastResponse> {
	const { lat, lon, apiKey } = params;
	const apiUrl = `${OPENWEATHER.FORECAST}?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
	const res = await fetch(apiUrl);
	const data = await res.json();
	if (!res.ok) {
		throw new Error("Forecast fetch failed");
	}
	return data as ForecastResponse;
}
