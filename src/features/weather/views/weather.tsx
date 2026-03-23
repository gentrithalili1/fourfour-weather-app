import { CityForecast } from "@/features/weather/lib/components/city-forecast";
import { CityWeatherDetails } from "@/features/weather/lib/components/city-weather-details";
import { RecentSearch } from "@/features/weather/lib/components/recent-search";
import { useCityWeatherQuery } from "@/features/weather/lib/hooks/use-city-weather-query";
import { useForecastQuery } from "@/features/weather/lib/hooks/use-forecast-query";
import { useSelectedCityCoords } from "@/features/weather/lib/hooks/use-selected-city-coords";

import { Header } from "@/core/components/shared/header";
import { WeatherBackground } from "@/core/components/shared/weather-background";
import { useSetDocumentName } from "@/core/hooks/use-set-document-name";

export function Weather() {
	const selectedCityCoords = useSelectedCityCoords();
	const cityWeatherQuery = useCityWeatherQuery({
		lat: selectedCityCoords.data?.lat,
		lon: selectedCityCoords.data?.lon,
	});
	const forecastQuery = useForecastQuery({
		lat: selectedCityCoords.data?.lat,
		lon: selectedCityCoords.data?.lon,
	});

	const cityWeatherDetails = cityWeatherQuery.data;
	const forecastData = forecastQuery.data;

	useSetDocumentName(cityWeatherDetails?.name);

	return (
		<div className="relative min-h-screen w-full overflow-auto">
			<WeatherBackground cityWeather={cityWeatherDetails} />

			<div className="relative z-10 flex min-h-screen flex-col gap-6 p-6 lg:p-8">
				<Header />

				<CityWeatherDetails
					error={selectedCityCoords.error || cityWeatherQuery.error}
					cityWeather={cityWeatherDetails}
					isLoading={selectedCityCoords.isLoading || cityWeatherQuery.isLoading}
				/>

				<div className="mx-auto w-full max-w-3xl">
					<CityForecast
						error={forecastQuery.error}
						isLoading={forecastQuery.isLoading}
						forecast={forecastData}
					/>
				</div>

				<RecentSearch />
			</div>
		</div>
	);
}
