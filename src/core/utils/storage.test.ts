import { describe, expect, it } from "vitest";

import { generateStorageKey, STORAGE_KEY_PREFIX } from "@/core/utils/storage";

describe("generateStorageKey", () => {
	it("appends the prefix to the key", () => {
		const storageKey = "test-data";
		const r = generateStorageKey(storageKey);
		expect(r).toBe(`${STORAGE_KEY_PREFIX}:${storageKey}`);
	});
});
