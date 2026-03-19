import { SearchCityCombobox } from "@/features/weather/lib/components/search-city-combobox";
import { RecentSearch } from "@/features/weather/lib/components/recent-search";
import { SelectedCity } from "@/features/weather/lib/components/selected-city";

export function Weather() {
  return (
    <div className="flex min-h-full flex-1 flex-col gap-6 p-6 lg:p-8">
      <SearchCityCombobox />
      <SelectedCity />
      <RecentSearch />
    </div>
  );
}
