import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Weather } from "@/features/weather/views/weather";

import { ReactQueryProvider } from "@/core/components/providers/react-query-provider";
import { ThemeProvider } from "@/core/components/providers/theme-provider";
import { Header } from "@/core/components/shared/header";

function App() {
	return (
		<ReactQueryProvider>
			<ThemeProvider>
				<div className="flex h-screen flex-col overflow-hidden">
					<Header />

					<main className="min-h-0 flex-1 overflow-y-auto pt-10">
						<Weather />
					</main>
				</div>
			</ThemeProvider>

			<ReactQueryDevtools initialIsOpen={false} />
		</ReactQueryProvider>
	);
}

export default App;
