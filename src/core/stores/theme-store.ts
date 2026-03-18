import { create } from "zustand";
import { persist } from "zustand/middleware";
import { generateStorageKey } from "@/core/utils/storage";
import type { Theme } from "@/core/types/common";

type ThemeStore = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: "system",
      setTheme: (theme) => set({ theme }),
    }),
    { name: generateStorageKey("theme") },
  ),
);
