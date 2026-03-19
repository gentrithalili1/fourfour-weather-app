import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Theme } from "@/core/types/common";
import { generateStorageKey } from "@/core/utils/storage";

type ThemeStoreState = {
	theme: Theme;
};

type ThemeStoreActions = {
	setTheme: (theme: Theme) => void;
};

export const useThemeStore = create<ThemeStoreState & ThemeStoreActions>()(
	persist(
		(set) => ({
			theme: "dark",
			setTheme: (theme) => set({ theme }),
		}),
		{ name: generateStorageKey("theme") }
	)
);
