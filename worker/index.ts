import { API_PATHS } from "./utils/constants";
import { handleSearch } from "./handlers/search";
import { handleFetch } from "./handlers/weather";
import { handleRecent } from "./handlers/recent";
import { handleLocation } from "./handlers/location";
import { getApiKey } from "./utils/get-api-key";
import { getDoStub } from "./utils/get-do-stub";
import { WeatherSync } from "./WeatherSync";

export { WeatherSync };

function match(request: Request, path: string, method: string): boolean {
  const url = new URL(request.url);
  return url.pathname === path && request.method === method;
}

export default {
  async fetch(request: Request, env: Env) {
    const getKey = () => getApiKey(env);
    const getStub = () => getDoStub(env);

    if (match(request, API_PATHS.SEARCH, "GET")) {
      return handleSearch(request, getKey);
    }

    if (match(request, API_PATHS.FETCH, "GET")) {
      return handleFetch(request, getKey);
    }

    if (match(request, API_PATHS.LOCATION, "GET")) {
      return handleLocation(request);
    }

    if (
      match(request, API_PATHS.RECENT, "GET") ||
      match(request, API_PATHS.RECENT, "POST") ||
      match(request, API_PATHS.RECENT, "DELETE")
    ) {
      return handleRecent(request, getStub);
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
