import * as React from "react";
import { Loader2, Search } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@core/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@core/components/ui/popover";
import { useDebounce } from "@/core/hooks/use-debounce";
import { useEffect, useState } from "react";
import { useSearchCityQuery } from "@/features/weather/lib/hooks/use-search-city-query";
import type { SearchCity } from "@/core/types/weather";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/core/components/ui/input-group";

export function SearchCityCombobox({
  onSelect,
}: {
  onSelect: (city: SearchCity) => void;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const debounced = useDebounce(search.trim(), 300);
  const searchCityQuery = useSearchCityQuery(debounced);

  useEffect(() => {
    if (searchCityQuery.isSuccess && searchCityQuery.data?.length > 0) {
      setOpen(true);
    }
  }, [searchCityQuery.isSuccess, searchCityQuery.data?.length]);

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setSearch("");
      setOpen(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSelect = (city: SearchCity) => {
    setSearch("");
    setOpen(false);
    onSelect(city);
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange} modal={false}>
      <PopoverTrigger
        nativeButton={false}
        render={
          <div className="relative flex w-full items-center cursor-text" />
        }
      >
        <InputGroup className="h-13 text-2xl">
          <InputGroupInput
            id="input-group-url"
            placeholder="Search City..."
            value={search}
            onChange={handleInputChange}
          />
          <InputGroupAddon align="inline-start">
            <Search />
          </InputGroupAddon>

          <InputGroupAddon align="inline-end">
            {searchCityQuery.isLoading && search.length > 0 && (
              <Loader2 className="animate-spin" />
            )}
          </InputGroupAddon>
        </InputGroup>
      </PopoverTrigger>

      <PopoverContent
        className="w-(--anchor-width) p-0"
        align="start"
        initialFocus={false}
      >
        <Command shouldFilter={false}>
          <CommandList>
            {searchCityQuery.isError && (
              <div className="p-3 text-sm text-red-500">
                {searchCityQuery.error.message}
              </div>
            )}

            {!searchCityQuery.isLoading &&
              !searchCityQuery.isError &&
              searchCityQuery.data?.length === 0 &&
              search.length > 0 && (
                <CommandEmpty>No results found.</CommandEmpty>
              )}

            <CommandGroup>
              {searchCityQuery.data?.map((item) => (
                <CommandItem
                  key={item.id}
                  value={`${item.name}, ${item.country}`}
                  onSelect={() => handleSelect(item)}
                >
                  {item.name}, {item.country}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
