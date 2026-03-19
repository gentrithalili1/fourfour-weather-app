import { Button } from "@core/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@core/components/ui/dropdown-menu";
import { useTempUnitStore } from "@core/stores/temp-unit-store";

import type { TempUnit } from "@/core/types/common";

const TEMP_UNIT_OPTIONS: { unit: TempUnit; label: string }[] = [
	{ unit: "celsius", label: "°C Celsius" },
	{ unit: "fahrenheit", label: "°F Fahrenheit" },
];

export function TempUnitToggle() {
	const tempUnitStore = useTempUnitStore();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={
					<Button variant="outline" size="icon">
						<span>{tempUnitStore.unit === "celsius" ? "°C" : "°F"}</span>
						<span className="sr-only">Temperature unit</span>
					</Button>
				}
			/>
			<DropdownMenuContent align="end">
				{TEMP_UNIT_OPTIONS.map((option) => (
					<DropdownMenuItem
						key={option.unit}
						variant="default"
						onClick={() => tempUnitStore.setUnit(option.unit)}
						className={tempUnitStore.unit === option.unit ? "bg-accent" : undefined}>
						{option.label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
