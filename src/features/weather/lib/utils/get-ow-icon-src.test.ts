import { describe, expect, it } from "vitest";
import { getOwIconSrc } from "./get-ow-icon-src";

describe("getOwIconSrc", () => {
	it("returns OpenWeather icon URL with 4x resolution", () => {
		expect(getOwIconSrc("01d")).toBe(
			"https://openweathermap.org/img/wn/01d@4x.png"
		);
	});

	it("handles night icons", () => {
		expect(getOwIconSrc("01n")).toBe(
			"https://openweathermap.org/img/wn/01n@4x.png"
		);
	});
});
