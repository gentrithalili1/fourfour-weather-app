import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Weather } from "@/features/weather/views/weather";

import { ReactQueryProvider } from "@/core/components/providers/react-query-provider";
import { ThemeProvider } from "@/core/components/providers/theme-provider";

function App() {
	return (
		<ReactQueryProvider>
			<ThemeProvider>
				<Weather />
			</ThemeProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</ReactQueryProvider>
	);
}

export default App;
