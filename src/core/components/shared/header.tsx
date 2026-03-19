import { ModeToggle } from "@/core/components/shared/mode-toggle";
import { SettingsSheet } from "@/core/components/shared/settings-sheet";
import { TempUnitToggle } from "@/core/components/shared/temp-unit-toggle";

export function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 flex h-14 items-center justify-between border-b border-border/50 bg-background/80 px-4 backdrop-blur-sm z-50">
      <span className="text-2xl font-bold tracking-tight text-primary italic">
        44Weather
      </span>

      <div className="flex items-center gap-2">
        <TempUnitToggle />
        <ModeToggle />
        <SettingsSheet />
      </div>
    </header>
  );
}
