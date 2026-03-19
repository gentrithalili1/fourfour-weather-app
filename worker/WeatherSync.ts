import type { CityWeather } from "@core/types/weather";
import { DurableObject } from "cloudflare:workers";

const MAX_RECENT = 3;

export class WeatherSync extends DurableObject<Env> {
	private recent: CityWeather[] = [];

	constructor(ctx: DurableObjectState, env: Env) {
		super(ctx, env);
		this.ctx.blockConcurrencyWhile(async () => {
			const stored = await this.ctx.storage.get<CityWeather[]>("recent");
			if (stored) this.recent = stored;
		});
	}

	async fetch(request: Request): Promise<Response> {
		const url = new URL(request.url);

		if (url.pathname === "/api/recent" && request.method === "GET") {
			return Response.json(this.recent);
		}

		if (url.pathname === "/api/recent" && request.method === "DELETE") {
			this.recent = [];
			await this.ctx.storage.put("recent", this.recent);
			return Response.json({ ok: true });
		}

		if (url.pathname === "/api/weather/add" && request.method === "POST") {
			const city = (await request.json()) as CityWeather;
			this.recent = [city, ...this.recent.filter((c) => c.id !== city.id)].slice(0, MAX_RECENT);

			await this.ctx.storage.put("recent", this.recent);

			return Response.json({ ok: true });
		}

		return new Response("Not found", { status: 404 });
	}
}
