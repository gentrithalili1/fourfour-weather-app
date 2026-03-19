import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandList,
} from "@core/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@core/components/ui/popover";
import { Loader2, Search } from "lucide-react";
import * as React from "react";
import { useEffect, useState } from "react";

import { useAddToRecentSearchMutation } from "@/features/weather/lib/hooks/use-add-to-recent-search-mutation";
import { useSearchCityGeocodingQuery } from "@/features/weather/lib/hooks/use-search-city-geocoding-query";
import { useCityGeocodingStore } from "@/features/weather/lib/stores/city-geocoding-store";

import { InputGroup, InputGroupAddon, InputGroupInput } from "@/core/components/ui/input-group";
import { useDebounce } from "@/core/hooks/use-debounce";
import type { CityGeocoding } from "@/core/types/weather";
import { cn } from "@/core/utils/shadcn-utils";

export function SearchCityCombobox() {
	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState("");
	const debounced = useDebounce(search.trim(), 300);
	const searchCityGeocodingQuery = useSearchCityGeocodingQuery(debounced);
	const cityGeocodingStore = useCityGeocodingStore();
	const addToRecentSearchMutation = useAddToRecentSearchMutation();

	useEffect(() => {
		if (searchCityGeocodingQuery.isSuccess && searchCityGeocodingQuery.data?.length > 0) {
			setOpen(true);
		}
	}, [searchCityGeocodingQuery.isSuccess, searchCityGeocodingQuery.data?.length]);

	const handleOpenChange = (newOpen: boolean) => {
		if (!newOpen) {
			setSearch("");
			setOpen(false);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const handleSelect = (city: CityGeocoding) => {
		setSearch("");
		setOpen(false);
		cityGeocodingStore.setCityGeocoding(city);
		addToRecentSearchMutation.mutate({
			lat: city.lat,
			lon: city.lon,
		});
	};

	return (
		<Popover open={open} onOpenChange={handleOpenChange} modal={false}>
			<PopoverTrigger
				nativeButton={false}
				render={<div className="relative flex w-full items-center cursor-text" />}>
				<InputGroup
					className={cn(
						"h-10 text-2xl border-white/30 rounded-xl bg-white/15 backdrop-blur-xl shadow-lg shadow-black/10 [&_[data-slot=input-group-addon]]:text-white/90"
					)}>
					<InputGroupInput
						id="input-group-url"
						placeholder="Search City..."
						className="text-white placeholder:text-white/60"
						value={search}
						onChange={handleInputChange}
					/>
					<InputGroupAddon align="inline-start">
						<Search />
					</InputGroupAddon>

					<InputGroupAddon align="inline-end">
						{searchCityGeocodingQuery.isLoading && search.length > 0 && (
							<Loader2 className="animate-spin" />
						)}
					</InputGroupAddon>
				</InputGroup>
			</PopoverTrigger>

			<PopoverContent className="w-(--anchor-width) p-0" align="start" initialFocus={false}>
				<Command shouldFilter={false}>
					<CommandList>
						{searchCityGeocodingQuery.isError && (
							<div className="p-3 text-sm text-red-500">
								{searchCityGeocodingQuery.error.message}
							</div>
						)}

						{!searchCityGeocodingQuery.isLoading &&
							!searchCityGeocodingQuery.isError &&
							searchCityGeocodingQuery.data?.length === 0 &&
							search.length > 0 && <CommandEmpty>No results found.</CommandEmpty>}

						<CommandGroup>
							{searchCityGeocodingQuery.data?.map((item) => (
								<CommandItem
									key={`${item.name}-${item.country}`}
									value={`${item.name}, ${item.country}`}
									onSelect={() => handleSelect(item)}>
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
