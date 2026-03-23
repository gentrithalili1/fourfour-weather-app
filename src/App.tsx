import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Weather } from "@/features/weather/views/weather";

import { ReactQueryProvider } from "@/core/components/providers/react-query-provider";
import { ThemeProvider } from "@/core/components/providers/theme-provider";
import { Toaster } from "@/core/components/ui/sonner";

function App() {
	return (
		<ReactQueryProvider>
			<ThemeProvider>
				<Weather />
				<Toaster position="top-center" />
			</ThemeProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</ReactQueryProvider>
	);
}

export default App;
