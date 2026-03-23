import { formatForecastDay, formatLocalTime, formatSunTime, isToday } from "./dates";
import { describe, expect, it, vi } from "vitest";

describe("formatSunTime", () => {
	it("formats unix timestamp with timezone offset", () => {
		const unix = 0;
		const tzOffset = 0;
		expect(formatSunTime(unix, tzOffset)).toBe("12:00 AM");
	});

	it("adjusts for positive timezone offset", () => {
		const unix = 0;
		const tzOffset = 3600;
		expect(formatSunTime(unix, tzOffset)).toBe("01:00 AM");
	});
});

describe("formatLocalTime", () => {
	it("formats unix timestamp with timezone offset", () => {
		const unix = 0;
		const tzOffset = 0;
		expect(formatLocalTime(unix, tzOffset)).toBe("12:00 AM");
	});
});

describe("formatForecastDay", () => {
	it("formats unix timestamp as weekday", () => {
		const unix = 0;
		const tzOffset = 0;
		expect(formatForecastDay(unix, tzOffset)).toBe("Thu");
	});
});

describe("isToday", () => {
	it("returns true when dt matches today in timezone", () => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date("2025-03-19T12:00:00Z"));
		const dt = Math.floor(new Date("2025-03-19T12:00:00Z").getTime() / 1000);
		const tzOffset = 0;
		expect(isToday(dt, tzOffset)).toBe(true);
		vi.useRealTimers();
	});

	it("returns false when dt is different day", () => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date("2025-03-19T12:00:00Z"));
		const dt = Math.floor(new Date("2025-03-20T12:00:00Z").getTime() / 1000);
		const tzOffset = 0;
		expect(isToday(dt, tzOffset)).toBe(false);
		vi.useRealTimers();
	});
});
