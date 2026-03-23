import type { ForecastItem } from "@core/types/weather";

import { WeatherIcon } from "@/core/components/shared/weather-icon";
import { useFormatTemperature } from "@/core/hooks/use-format-temperature";
import { formatForecastDay, isToday } from "@/core/utils/dates";

type CityForecastDayCardProps = {
	day: ForecastItem;
	timezone: number;
};

export function CityForecastDayCard({ day, timezone }: CityForecastDayCardProps) {
	const formatTemperature = useFormatTemperature();

	return (
		<div
			role="listitem"
			className="flex min-w-0 flex-col gap-1.5 rounded-lg bg-white/10 p-3 text-foreground">
			<div className="flex items-start justify-between ">
				<span className="text-xs font-semibold">
					{isToday(day.dt, timezone) ? "Today" : formatForecastDay(day.dt, timezone)}
				</span>
				<div className="flex flex-col gap-1 text-xs">
					<span>Min:{formatTemperature(day.main.temp_min)}</span>
					<span>Max:{formatTemperature(day.main.temp_max)}</span>
				</div>
			</div>
			<div className="flex flex-col items-center gap-0.5">
				<WeatherIcon
					icon={day.weather[0].icon}
					alt={day.weather[0].description}
					className="size-11 drop-shadow sm:size-12"
				/>
				<p className="text-center text-xs capitalize ">{day.weather[0].description}</p>
				<div className="flex flex-wrap justify-center gap-x-2 gap-y-0.5 text-xs">
					<span>{day.main.humidity}%</span>
					{day.wind != null && <span>{day.wind.speed} m/s</span>}
					{(day.pop ?? 0) > 0.1 && <span>{Math.round((day.pop ?? 0) * 100)}%</span>}
				</div>
			</div>
		</div>
	);
}
