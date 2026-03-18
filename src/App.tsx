import { ThemeProvider } from "@/core/components/providers/theme-provider";
import { Header } from "@/core/components/shared/header";
import { Weather } from "@/features/weather/views/weather";

function App() {
  return (
    <ThemeProvider>
      <div className="flex h-screen flex-col overflow-hidden">
        <Header />
        <main className="min-h-0 flex-1 overflow-y-auto pt-10">
          <Weather />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
