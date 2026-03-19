import { CityWeatherDetails } from "@/features/weather/lib/components/city-weather-details";
import { RecentSearch } from "@/features/weather/lib/components/recent-search";
import { useCityWeatherQuery } from "@/features/weather/lib/hooks/use-city-weather-query";
import { useSelectedCityCoords } from "@/features/weather/lib/hooks/use-selected-city-coords";

import { Header } from "@/core/components/shared/header";
import { WeatherBackground } from "@/core/components/shared/weather-background";

export function Weather() {
	const selectedCityCoords = useSelectedCityCoords();
	const cityWeatherQuery = useCityWeatherQuery({
		lat: selectedCityCoords.data?.lat,
		lon: selectedCityCoords.data?.lon,
	});
	const cityWeatherDetails = cityWeatherQuery.data;

	return (
		<div className="relative min-h-screen w-full overflow-auto">
			<WeatherBackground cityWeather={cityWeatherDetails} />

			<div className="relative z-10 flex min-h-screen flex-col gap-6 p-6 lg:p-8">
				<Header />
				<CityWeatherDetails cityWeather={cityWeatherDetails} />
				<RecentSearch />
			</div>
		</div>
	);
}
