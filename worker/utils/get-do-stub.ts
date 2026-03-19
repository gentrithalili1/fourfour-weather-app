export const getDoStub = (env: Env): DurableObjectStub => {
	const id = env.WEATHER_SYNC.idFromName("global");
	return env.WEATHER_SYNC.get(id);
};
