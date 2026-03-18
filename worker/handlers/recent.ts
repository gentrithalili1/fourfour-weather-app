export async function handleRecent(
  request: Request,
  getDoStub: () => DurableObjectStub,
): Promise<Response> {
  const stub = getDoStub();
  return stub.fetch("https://do/api/recent", { method: request.method });
}
