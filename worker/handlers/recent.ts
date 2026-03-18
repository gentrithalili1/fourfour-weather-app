import { API_PATHS } from "../constants";

export async function handleRecent(
  request: Request,
  getDoStub: () => DurableObjectStub
): Promise<Response | null> {
  const url = new URL(request.url);
  if (url.pathname !== API_PATHS.RECENT || request.method !== "GET") {
    return null;
  }
  const stub = getDoStub();
  return stub.fetch("https://do/api/recent");
}
