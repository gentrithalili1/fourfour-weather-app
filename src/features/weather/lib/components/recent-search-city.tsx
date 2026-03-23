import { cn } from "@core/utils/shadcn-utils";
import { X } from "lucide-react";

import { WeatherIcon } from "@/core/components/shared/weather-icon";
import { Button } from "@/core/components/ui/button";
import { Spinner } from "@/core/components/ui/spinner";
import { useFormatTemperature } from "@/core/hooks/use-format-temperature";
import type { CityWeather } from "@/core/types/weather";

type RecentSearchCityProps = {
	isDeleting?: boolean;
	city: CityWeather;
	onSelect: (city: CityWeather) => void;
	onDelete?: (id: number) => void;
};

export function RecentSearchCity({ city, onSelect, onDelete, isDeleting }: RecentSearchCityProps) {
	const formatTemperature = useFormatTemperature();
	const temp = formatTemperature(city.main.temp);
	const location = `${city.name}, ${city.sys.country}`;

	return (
		<li className="shrink-0">
			<div
				className={cn(
					"relative flex items-stretch rounded-xl border border-border overflow-hidden"
				)}>
				<Button
					type="button"
					variant="outline"
					className="p-0 gap-0 h-auto w-auto justify-start rounded-none border-none focus-visible:ring-inset"
					aria-label={`Select ${location}, ${temp}`}
					onClick={() => onSelect(city)}>
					<span className="shrink-0">
						<WeatherIcon icon={city.weather[0]?.icon ?? "01d"} alt="" className="size-10" />
					</span>
					<div className="flex flex-row gap-2 pr-3 pl-2 whitespace-nowrap">
						<span className="block font-semibold  ">{location}</span>
						<span className="block text-sm shrink-0" aria-hidden>
							{temp}
						</span>
					</div>
				</Button>

				{onDelete && (
					<Button
						variant="destructive"
						size="icon"
						aria-label={`Remove ${location} from recent searches`}
						onClick={() => onDelete(city.id)}
						disabled={isDeleting}
						className="rounded-none border-none self-stretch h-auto focus-visible:ring-inset">
						{isDeleting ? (
							<Spinner className="size-3.5" aria-hidden />
						) : (
							<X className="size-3.5" aria-hidden />
						)}
					</Button>
				)}
			</div>
		</li>
	);
}
