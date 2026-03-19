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

export const isToday = (dt: number, timezoneOffsetSeconds: number) => {
	const now = Math.floor(Date.now() / 1000);
	const todayDay = Math.floor((now + timezoneOffsetSeconds) / 86400);
	const forecastDay = Math.floor((dt + timezoneOffsetSeconds) / 86400);
	return todayDay === forecastDay;
};
