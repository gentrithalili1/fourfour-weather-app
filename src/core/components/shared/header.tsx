import { ModeToggle } from "@/core/components/shared/mode-toggle";

export function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-10 flex h-14 items-center justify-between border-b border-border/50 bg-background/80 px-4 backdrop-blur-sm z-50">
      <span className="text-2xl font-bold tracking-tight text-primary italic">
        44Weather
      </span>
      <ModeToggle />
    </header>
  );
}
