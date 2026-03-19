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
	return stub.fetch("https://do/api/recent", { method: request.method });
}
