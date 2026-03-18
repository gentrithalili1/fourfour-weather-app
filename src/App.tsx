import { ThemeProvider } from "@/core/components/providers/theme-provider";
import { ModeToggle } from "@/core/components/shared/mode-toggle";
import { Weather } from "@/features/weather/views/weather";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <header className="flex justify-end p-4">
          <ModeToggle />
        </header>

        <main className="p-4">
          <Weather />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
