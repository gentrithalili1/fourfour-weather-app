export function handleLocation(request: Request): Response {
	const cf = (request as Request & { cf?: { latitude?: string; longitude?: string } }).cf;
	const lat = cf?.latitude ? parseFloat(cf.latitude) : undefined;
	const lon = cf?.longitude ? parseFloat(cf.longitude) : undefined;
	if (lat == null || lon == null || Number.isNaN(lat) || Number.isNaN(lon)) {
		return Response.json({ error: "Location unavailable" }, { status: 503 });
	}
	return Response.json({ lat, lon });
}
