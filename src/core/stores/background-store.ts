import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { BackgroundType } from "@/core/types/common";
import { generateStorageKey } from "@/core/utils/storage";

type BackgroundStoreState = {
	type: BackgroundType;
};

type BackgroundStoreActions = {
	setType: (type: BackgroundType) => void;
};

export const useBackgroundStore = create<BackgroundStoreState & BackgroundStoreActions>()(
	persist(
		(set) => ({
			type: "image",
			setType: (type) => set({ type }),
		}),
		{ name: generateStorageKey("background") }
	)
);
