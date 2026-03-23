import { cn } from "@core/utils/shadcn-utils";

import { useCityBackgroundQuery } from "@/features/weather/lib/hooks/use-city-background-query";
import { getWeatherGradient } from "@/features/weather/lib/utils/get-weather-gradient";

import { useBackgroundStore } from "@/core/stores/background-store";
import type { CityWeather } from "@/core/types/weather";

type WeatherBackgroundProps = {
	cityWeather?: CityWeather;
};

export function WeatherBackground(props: WeatherBackgroundProps) {
	const backgroundStore = useBackgroundStore();
	const isPhoto = backgroundStore.type === "image";
	const isGradient = backgroundStore.type === "gradient";
	const backgroundQuery = useCityBackgroundQuery({
		cityWeather: isPhoto ? props.cityWeather : undefined,
	});
	const { imageUrl, photographer } = backgroundQuery.data ?? {};

	const gradient = props.cityWeather ? getWeatherGradient(props.cityWeather) : "";

	if ((!isPhoto && !isGradient) || backgroundQuery.isLoading) {
		return null;
	}

	return (
		<>
			<div className={cn("fixed inset-0 -z-10 bg-linear-to-br", gradient)} aria-hidden>
				{imageUrl && isPhoto && (
					<>
						<div
							className="absolute inset-0 scale-105 blur-[2px] opacity-80 bg-cover bg-center bg-no-repeat"
							style={{ backgroundImage: `url(${imageUrl})` }}
						/>
						<div className="pointer-events-none absolute inset-0 bg-black/20" />
					</>
				)}

				<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.15),transparent)]" />
			</div>

			{imageUrl && isPhoto && photographer && (
				<a
					href={photographer.url}
					target="_blank"
					rel="noopener noreferrer"
					className="fixed bottom-3 right-3 z-20 text-xs text-white/70 transition hover:text-white">
					Photo by {photographer.name} on Unsplash
				</a>
			)}
		</>
	);
}
