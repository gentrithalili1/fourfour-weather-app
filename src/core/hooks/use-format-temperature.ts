import { useTempUnitStore } from "@/core/stores/temp-unit-store";
import type { TempUnit } from "@/core/types/common";

const celsiusToFahrenheit = (celsius: number): number => {
	return (celsius * 9) / 5 + 32;
};

const formatTemp = (params: { celsius: number; unit: TempUnit }): string => {
	const { celsius, unit } = params;
	if (!Number.isFinite(celsius)) return "—";

	const value = unit === "fahrenheit" ? celsiusToFahrenheit(celsius) : celsius;
	const symbol = unit === "fahrenheit" ? "°F" : "°C";
	return `${Math.round(value)}${symbol}`;
};

export function useFormatTemperature() {
	const tempUnitStore = useTempUnitStore();

	return (celsius: number) => {
		return formatTemp({ celsius, unit: tempUnitStore.unit });
	};
}
