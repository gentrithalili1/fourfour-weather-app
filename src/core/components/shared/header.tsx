import { SearchCityCombobox } from "@/features/weather/lib/components/search-city-combobox";

import { BackgroundToggle } from "@/core/components/shared/background-toggle";
import { Logo } from "@/core/components/shared/logo";
import { ModeToggle } from "@/core/components/shared/mode-toggle";
import { TempUnitToggle } from "@/core/components/shared/temp-unit-toggle";

export function Header() {
	return (
		<header>
			<div className="grid grid-cols-[1fr_auto] grid-rows-[auto_auto] gap-5 sm:grid-cols-[auto_1fr_auto] sm:grid-rows-1 sm:items-center sm:gap-20">
				<div className="col-start-1 row-start-1 min-w-0">
					<Logo />
				</div>
				<div className="col-span-2 col-start-1 row-start-2 min-w-0 sm:col-span-1 sm:col-start-2 sm:row-start-1">
					<SearchCityCombobox />
				</div>
				<div className="col-start-2 row-start-1 flex items-center justify-end gap-2 sm:col-start-3 sm:justify-start">
					<BackgroundToggle />
					<TempUnitToggle />
					<ModeToggle />
				</div>
			</div>
		</header>
	);
}