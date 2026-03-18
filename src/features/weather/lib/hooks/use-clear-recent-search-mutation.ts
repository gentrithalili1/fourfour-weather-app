import { weatherApi } from "@/features/weather/lib/api/weather";
import { recentSearchQueryKeys } from "@/features/weather/lib/hooks/use-recent-search-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useClearRecentSearchMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => weatherApi.clearRecentSearch(),
    onSuccess: () => {
      queryClient.setQueryData(recentSearchQueryKeys.all, []);
    },
  });
};
