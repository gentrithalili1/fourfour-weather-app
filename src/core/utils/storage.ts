export const STORAGE_KEY_PREFIX = "fourfour-weather-app";

export function generateStorageKey(key: string) {
	return `${STORAGE_KEY_PREFIX}:${key}`;
}
