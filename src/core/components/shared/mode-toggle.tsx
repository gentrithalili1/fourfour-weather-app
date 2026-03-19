import { Moon, Sun } from "lucide-react";

import { Button } from "@core/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@core/components/ui/dropdown-menu";
import { useTheme } from "@core/components/providers/theme-provider";
import type { Theme } from "@/core/types/common";

const THEME_OPTIONS: { theme: Theme; label: string }[] = [
  {
    theme: "light",
    label: "Light",
  },
  {
    theme: "dark",
    label: "Dark",
  },
  {
    theme: "system",
    label: "System",
  },
];

export function ModeToggle() {
  const themeStore = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        }
      />
      <DropdownMenuContent align="end">
        {THEME_OPTIONS.map((option) => (
          <DropdownMenuItem
            key={option.theme}
            onClick={() => themeStore.setTheme(option.theme)}
            className={
              themeStore.theme === option.theme ? "bg-accent" : undefined
            }
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
