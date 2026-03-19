export const formatSunTime = (unix: number, timezoneOffsetSeconds: number) =>
	new Date((unix + timezoneOffsetSeconds) * 1000).toLocaleTimeString("en", {
		timeZone: "UTC",
		hour: "2-digit",
		minute: "2-digit",
	});

export const formatForecastDay = (unix: number, timezoneOffsetSeconds: number) =>
	new Date((unix + timezoneOffsetSeconds) * 1000).toLocaleDateString("en", {
		timeZone: "UTC",
		weekday: "short",
	});
