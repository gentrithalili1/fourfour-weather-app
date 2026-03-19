import { useCityBackgroundQuery } from "@/features/weather/lib/hooks/use-city-background-query";
import { useCityWeatherQuery } from "@/features/weather/lib/hooks/use-city-weather-query";
import { useSelectedCityCoords } from "@/features/weather/lib/hooks/use-selected-city-coords";
import { getOwIconSrc } from "@/features/weather/lib/utils/get-ow-icon-src";
import { getWeatherGradient } from "@/features/weather/lib/utils/get-weather-gradient";

import { Card, CardContent } from "@/core/components/ui/card";
import { Skeleton } from "@/core/components/ui/skeleton";
import { useFormatTemperature } from "@/core/hooks/use-format-temperature";

export function SelectedCity() {
	const selectedCityCoords = useSelectedCityCoords();
	const formatTemperature = useFormatTemperature();
	const cityWeatherQuery = useCityWeatherQuery({
		lat: selectedCityCoords.data?.lat,
		lon: selectedCityCoords.data?.lon,
	});
	const selected = cityWeatherQuery.data;
	const backgroundQuery = useCityBackgroundQuery(selected?.weather[0].description);
	const { imageUrl, photographer } = backgroundQuery.data ?? {};
	const isLoading =
		selectedCityCoords.isFetching ||
		(selectedCityCoords.data != null && cityWeatherQuery.isLoading);

	if (isLoading) {
		return (
			<div className="flex min-h-0 flex-1 overflow-hidden rounded-xl bg-linear-to-br from-sky-500 via-blue-600 to-indigo-700 text-white shadow-2xl ring-1 ring-white/10 flex-col items-center justify-center">
				<Skeleton className="w-full h-full" />
			</div>
		);
	}

	if (!selected) return null;

	const gradient = getWeatherGradient(selected);
	const iconCode = selected.weather[0].icon;

	return (
		<Card>
			<CardContent className="p-0">
				<div
					className={`relative flex min-h-0 flex-1 overflow-hidden rounded-xl bg-linear-to-br ${gradient} text-white shadow-2xl ring-1 ring-white/10`}>
					{imageUrl && (
						<>
							<img
								src={imageUrl}
								alt=""
								className="absolute inset-0 size-full object-cover scale-105 blur-[2px] opacity-80"
								aria-hidden
							/>
							<div className="absolute inset-0 bg-black/20" />
							{photographer && (
								<a
									href={photographer.url}
									target="_blank"
									rel="noopener noreferrer"
									className="absolute bottom-3 right-3 z-20 text-xs text-white/70 transition hover:text-white">
									Photo by {photographer.name} on Unsplash
								</a>
							)}
						</>
					)}
					<div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.15),transparent)]" />
					<div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-6 p-8 lg:p-12">
						<div className="flex flex-col items-center gap-4 text-center">
							<div className="rounded-3xl bg-white/20 p-6 backdrop-blur-md">
								<img
									src={getOwIconSrc(iconCode)}
									alt={selected.weather[0].description}
									className="size-20 lg:size-24 drop-shadow-lg"
								/>
							</div>
							<h1 className="text-4xl font-bold tracking-tight drop-shadow-md sm:text-5xl lg:text-7xl">
								{formatTemperature(selected.main.temp)}
							</h1>
							<p className="text-2xl font-medium opacity-95 drop-shadow lg:text-3xl">
								{selected.name}, {selected.sys.country}
							</p>
							<p className="text-lg capitalize text-white/90 drop-shadow">
								{selected.weather[0].description}
							</p>
							<div className="flex gap-6 text-sm text-white/80">
								<span>Feels like {formatTemperature(selected.main.feels_like)}</span>
								<span>{selected.main.humidity}% humidity</span>
								<span>{selected.wind.speed} m/s wind</span>
							</div>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
