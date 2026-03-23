export async function handleRecent(
	request: Request,
	getDoStub: () => DurableObjectStub
): Promise<Response> {
	const stub = getDoStub();
	if (request.method === "POST") {
		return stub.fetch("https://do/api/weather/add", {
			method: "POST",
			headers: request.headers,
			body: request.body,
		});
	}
	const url = new URL(request.url);
	const doUrl = url.searchParams.has("id")
		? `https://do/api/recent?id=${url.searchParams.get("id")}`
		: "https://do/api/recent";
	return stub.fetch(doUrl, { method: request.method });
}
