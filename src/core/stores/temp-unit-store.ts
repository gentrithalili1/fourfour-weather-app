import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { TempUnit } from "@/core/types/common";
import { generateStorageKey } from "@/core/utils/storage";

type TempUnitStoreState = {
	unit: TempUnit;
};

type TempUnitStoreActions = {
	setUnit: (unit: TempUnit) => void;
};

export const useTempUnitStore = create<TempUnitStoreState & TempUnitStoreActions>()(
	persist(
		(set) => ({
			unit: "celsius",
			setUnit: (unit) => set({ unit }),
		}),
		{ name: generateStorageKey("temp-unit") }
	)
);
