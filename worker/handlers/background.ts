import { UNSPLASH } from "../utils/constants";

export async function handleBackground(
  request: Request,
  getUnsplashKey: () => string | null,
): Promise<Response> {
  const key = getUnsplashKey();
  if (!key) {
    return Response.json(
      { imageUrl: null, photographer: null },
      { status: 200 },
    );
  }

  const url = new URL(request.url);
  const query = url.searchParams.get("q")?.trim();
  if (!query) {
    return Response.json({ error: "Missing query param 'q'" }, { status: 400 });
  }

  const searchUrl = `${UNSPLASH.BASE}/search/photos?query=${encodeURIComponent(query)}+city+landscape&per_page=1&orientation=landscape`;
  const res = await fetch(searchUrl, {
    headers: { Authorization: `Client-ID ${key}` },
  });

  if (!res.ok) {
    return Response.json(
      { imageUrl: null, photographer: null },
      { status: 200 },
    );
  }

  const data = (await res.json()) as {
    results?: Array<{
      urls?: { regular?: string };
      user?: { name?: string; username?: string; links?: { html?: string } };
    }>;
  };
  const photo = data.results?.[0];
  const imageUrl = photo?.urls?.regular ?? null;
  const user = photo?.user;
  const baseUrl =
    user?.links?.html ??
    (user?.username
      ? `https://unsplash.com/@${user.username}`
      : "https://unsplash.com");
  const photographer = user
    ? {
        name: user.name ?? user.username ?? "Unknown",
        url: `${baseUrl}${baseUrl.includes("?") ? "&" : "?"}utm_source=fourfour-weather&utm_medium=referral`,
      }
    : null;
  return Response.json({ imageUrl, photographer });
}
