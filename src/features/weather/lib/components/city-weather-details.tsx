import { Droplets, Sunrise, Sunset, Thermometer, Wind } from "lucide-react";

import { getOwIconSrc } from "@/features/weather/lib/utils/get-ow-icon-src";

import { useFormatTemperature } from "@/core/hooks/use-format-temperature";
import type { CityWeather } from "@/core/types/weather";
import { formatSunTime } from "@/core/utils/dates";

interface CityWeatherDetailsProps {
	cityWeather?: CityWeather;
}

export function CityWeatherDetails(props: CityWeatherDetailsProps) {
	const formatTemperature = useFormatTemperature();
	const cityWeather = props.cityWeather;

	return (
		<div className="flex flex-1 flex-col items-center justify-center">
			{cityWeather ? (
				<div
					key={cityWeather.id}
					className="flex flex-col items-center gap-4 text-center animate-in fade-in slide-in-from-bottom-2 duration-300">
					<div className="rounded-2xl bg-white/20 p-6 backdrop-blur-md">
						<img
							src={getOwIconSrc(cityWeather.weather[0].icon)}
							alt={cityWeather.weather[0].description}
							className="size-18 lg:size-20 drop-shadow-lg"
						/>
					</div>
					<h1 className="text-4xl font-bold tracking-tight drop-shadow-md lg:text-6xl">
						{formatTemperature(cityWeather.main.temp)}
					</h1>
					<p className="text-2xl font-medium opacity-95 drop-shadow lg:text-4xl">
						{cityWeather.name}, {cityWeather.sys.country}
					</p>
					<p className="text-2xl capitalize">{cityWeather.weather[0].description}</p>
					<div className="flex flex-wrap justify-center gap-6 text-md ">
						<span className="flex items-center gap-1.5">
							<Thermometer className="size-4" aria-hidden />
							Feels like {formatTemperature(cityWeather.main.feels_like)}
						</span>
						<span className="flex items-center gap-1.5">
							<Droplets className="size-4" aria-hidden />
							{cityWeather.main.humidity}% humidity
						</span>
						<span className="flex items-center gap-1.5">
							<Wind className="size-4" aria-hidden />
							{cityWeather.wind.speed} m/s wind
						</span>
						<span className="flex items-center gap-1.5">
							<Sunrise className="size-4" aria-hidden />
							{formatSunTime(cityWeather.sys.sunrise, cityWeather.timezone)}
						</span>
						<span className="flex items-center gap-1.5">
							<Sunset className="size-4" aria-hidden />
							{formatSunTime(cityWeather.sys.sunset, cityWeather.timezone)}
						</span>
					</div>
				</div>
			) : null}
		</div>
	);
}
