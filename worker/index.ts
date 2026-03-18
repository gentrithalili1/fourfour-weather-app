import { WeatherSync } from "./WeatherSync";
import { handleSearch } from "./handlers/search";
import { handleFetch } from "./handlers/weather";
import { handleRecent } from "./handlers/recent";

export { WeatherSync };

function getApiKey(env: Env): string | null {
  return env.OPENWEATHER_API_KEY?.trim() || null;
}

function getDoStub(env: Env): DurableObjectStub {
  const id = env.WEATHER_SYNC.idFromName("global");
  return env.WEATHER_SYNC.get(id);
}

export default {
  async fetch(request: Request, env: Env) {
    const searchRes = await handleSearch(request, () => getApiKey(env));
    if (searchRes !== null) return searchRes;

    const fetchRes = await handleFetch(request, () => getApiKey(env), () =>
      getDoStub(env)
    );
    if (fetchRes !== null) return fetchRes;

    const recentRes = await handleRecent(request, () => getDoStub(env));
    if (recentRes !== null) return recentRes;

    return new Response(null, { status: 404 });
  },
} satisfies ExportedHandler<Env>;
