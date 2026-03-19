import { describe, expect, it, vi } from "vitest";
import { scrollToTop } from "./scroll";

describe("scrollToTop", () => {
	it("calls window.scrollTo with top 0 and smooth behavior", () => {
		const scrollTo = vi.fn();
		Object.defineProperty(window, "scrollTo", { value: scrollTo, writable: true });

		scrollToTop();

		expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
	});
});
