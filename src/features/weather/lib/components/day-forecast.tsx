import type { ForecastItem } from "@core/types/weather";
import { cn } from "@core/utils/shadcn-utils";
import { Calendar } from "lucide-react";

import { getOwIconSrc } from "@/features/weather/lib/utils/get-ow-icon-src";

import { useFormatTemperature } from "@/core/hooks/use-format-temperature";
import { formatForecastDay } from "@/core/utils/dates";

interface DayForecastProps {
	daily: ForecastItem[];
	timezone: number;
}

export function DayForecast({ daily, timezone }: DayForecastProps) {
	const formatTemperature = useFormatTemperature();

	if (!daily?.length) return null;

	return (
		<div
			className={cn(
				"w-full rounded-xl bg-white/15 p-4 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2 duration-300 pt-2"
			)}>
			<div className="mb-3 flex items-center gap-1.5 text-sm font-medium uppercase tracking-wider">
				<Calendar className="size-4" aria-hidden />
				5-DAY FORECAST
			</div>

			<div className="grid min-w-0 grid-cols-2 gap-3 overflow-x-auto pb-2 pt-2 sm:grid-cols-3 lg:grid-cols-5">
				{daily.map((day, index) => (
					<div
						key={day.dt_txt.slice(0, 10)}
						className="flex min-w-0 flex-col gap-1.5 rounded-lg bg-white/10 p-3 text-foreground">
						<div className="flex items-center justify-between ">
							<span className="text-xs font-semibold">
								{index === 0 ? "Today" : formatForecastDay(day.dt, timezone)}
							</span>
							<div className="flex gap-1 text-sm">
								<span className="font-semibold text-xs">
									{formatTemperature(day.main.temp_min)}
								</span>
								<span className="font-semibold text-xs">
									{formatTemperature(day.main.temp_max)}
								</span>
							</div>
						</div>
						<div className="flex flex-col items-center gap-0.5">
							<img
								src={getOwIconSrc(day.weather[0].icon)}
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
				))}
			</div>
		</div>
	);
}
