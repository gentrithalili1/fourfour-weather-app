import { create } from "zustand";
import { persist } from "zustand/middleware";
import { generateStorageKey } from "@/core/utils/storage";
import type { Theme } from "@/core/types/common";

type ThemeStoreState = {
  theme: Theme;
};

type ThemeStoreActions = {
  setTheme: (theme: Theme) => void;
};

export const useThemeStore = create<ThemeStoreState & ThemeStoreActions>()(
  persist(
    (set) => ({
      theme: "system",
      setTheme: (theme) => set({ theme }),
    }),
    { name: generateStorageKey("theme") },
  ),
);
