import { useClearRecentSearchMutation } from "@/features/weather/lib/hooks/use-clear-recent-search-mutation";
import { useRecentSearchQuery } from "@/features/weather/lib/hooks/use-recent-search-query";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/core/components/ui/card";
import { Button } from "@/core/components/ui/button";
import { Spinner } from "@/core/components/ui/spinner";

export function RecentSearch() {
  const recentSearchQuery = useRecentSearchQuery();
  const clearRecentMutation = useClearRecentSearchMutation();
  return (
    <Card className="shrink-0">
      <CardHeader>
        <CardTitle>Recent</CardTitle>
        <CardDescription>Recent searched cities</CardDescription>
      </CardHeader>
      <CardContent>
        {recentSearchQuery.data?.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Search for cities to see them here
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {recentSearchQuery.data?.map((c) => (
              <Button
                key={c.id}
                variant="outline"
                className="h-auto justify-start py-3"
                onClick={() => console.log(c)}
              >
                {c.name}, {c.sys.country} — {c.main.temp}°C
              </Button>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Button
          disabled={clearRecentMutation.isPending}
          variant="destructive"
          size="sm"
          onClick={() => clearRecentMutation.mutate()}
        >
          {clearRecentMutation.isPending ? (
            <Spinner className="size-4" data-icon="inline-start" />
          ) : null}
          Clear
        </Button>
      </CardFooter>
    </Card>
  );
}
