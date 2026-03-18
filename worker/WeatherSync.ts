import { DurableObject } from "cloudflare:workers";
import type { WeatherData } from "./openweather";

const MAX_RECENT = 5;

export class WeatherSync extends DurableObject<Env> {
  private recent: WeatherData[] = [];

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    this.ctx.blockConcurrencyWhile(async () => {
      const stored = await this.ctx.storage.get<WeatherData[]>("recent");
      if (stored) this.recent = stored;
    });
  }

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/recent" && request.method === "GET") {
      return Response.json(this.recent);
    }

    if (url.pathname === "/api/add" && request.method === "POST") {
      const city = (await request.json()) as WeatherData;
      this.recent = [
        city,
        ...this.recent.filter((c) => c.id !== city.id),
      ].slice(0, MAX_RECENT);
      await this.ctx.storage.put("recent", this.recent);
      return Response.json({ ok: true });
    }

    return new Response("Not found", { status: 404 });
  }
}
