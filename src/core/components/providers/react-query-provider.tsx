import { reactQueryClient } from "@core/api/react-query-client";
import { QueryClientProvider } from "@tanstack/react-query";

export function ReactQueryProvider({ children }: { children: React.ReactNode }) {
	return <QueryClientProvider client={reactQueryClient}>{children}</QueryClientProvider>;
}
