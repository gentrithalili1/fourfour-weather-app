import { describe, expect, it } from "vitest";
import { getErrorMessage } from "./get-error-message";

describe("getErrorMessage", () => {
	it("returns message for Error instance", () => {
		expect(getErrorMessage(new Error("boom"))).toBe("boom");
	});

	it("returns string when a string error is provided at runtime", () => {
		expect(getErrorMessage("network down" as unknown as Error)).toBe("network down");
	});

	it("stringifies null", () => {
		expect(getErrorMessage(null)).toBe("null");
	});

	it("stringifies undefined", () => {
		expect(getErrorMessage(undefined)).toBe("undefined");
	});

	it("stringifies unknown objects", () => {
		expect(getErrorMessage({ code: 500 } as unknown as Error)).toBe("[object Object]");
	});
});
