export async function handleRecent(
  _request: Request,
  getDoStub: () => DurableObjectStub,
): Promise<Response> {
  const stub = getDoStub();
  return stub.fetch("https://do/api/recent");
}
