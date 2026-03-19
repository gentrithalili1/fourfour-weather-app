export const getApiKey = (env: Env): string | null => {
	return env.OPENWEATHER_API_KEY?.trim() || null;
};
