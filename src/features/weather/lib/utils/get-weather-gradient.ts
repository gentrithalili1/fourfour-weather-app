import type { CityWeather } from "@/core/types/weather";

export const getWeatherGradient = (weather: CityWeather): string => {
	const main = weather.weather[0].main;
	const temp = weather.main.temp;
	const isNight = weather.weather[0].icon.endsWith("n");

	switch (main) {
		case "Clear":
			return isNight
				? "from-indigo-900 via-slate-900 to-slate-950"
				: temp > 25
					? "from-amber-400 via-orange-500 to-rose-500"
					: "from-sky-400 via-blue-500 to-indigo-600";
		case "Mist":
		case "Fog":
		case "Haze":
			return "from-slate-400 via-slate-500 to-slate-600";
		case "Rain":
		case "Drizzle":
			return "from-slate-600 via-slate-700 to-slate-900";
		case "Snow":
			return "from-slate-300 via-blue-200 to-indigo-300";
		case "Thunderstorm":
			return "from-slate-800 via-indigo-900 to-slate-950";
		case "Clouds":
			return "from-slate-500 via-sky-600 to-indigo-700";

		default:
			return "from-sky-500 via-blue-600 to-indigo-700";
	}
};
