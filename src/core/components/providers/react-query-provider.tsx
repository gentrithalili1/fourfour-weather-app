import { QueryClientProvider } from "@tanstack/react-query";
import { reactQueryClient } from "@core/api/react-query-client";

export function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={reactQueryClient}>
      {children}
    </QueryClientProvider>
  );
}
