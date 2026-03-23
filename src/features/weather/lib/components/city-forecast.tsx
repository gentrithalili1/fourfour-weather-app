import type { ForecastResponse } from "@core/types/weather";
import { cn } from "@core/utils/shadcn-utils";
import { Calendar } from "lucide-react";

import { CityForecastDayCard } from "@/features/weather/lib/components/city-forecast-day-card";
import { transformForecastToDailyForecast } from "@/features/weather/lib/utils/data-transform";

type CityForecastProps = {
	forecast?: ForecastResponse;
};

export function CityForecast({ forecast }: CityForecastProps) {
	const dailyForecast = forecast ? transformForecastToDailyForecast(forecast.list) : [];
	const timezone = forecast?.city.timezone ?? 0;

	if (!dailyForecast.length) return null;

	return (
		<div
			aria-label="5-day forecast"
			className={cn(
				"w-full rounded-xl bg-white/15 p-4 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2 duration-300 pt-2"
			)}>
			<div className="mb-3 flex items-center gap-1.5 text-sm font-medium uppercase tracking-wider">
				<Calendar className="size-4" aria-hidden />
				5-DAY FORECAST
			</div>

			<div
				role="list"
				className="grid min-w-0 grid-cols-2 gap-3 overflow-x-auto pb-2 pt-2 sm:grid-cols-3 lg:grid-cols-5">
				{dailyForecast.map((day) => (
					<CityForecastDayCard key={day.dt_txt.slice(0, 10)} day={day} timezone={timezone} />
				))}
			</div>
		</div>
	);
}
