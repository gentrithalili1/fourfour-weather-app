import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandList,
	CommandLoading,
} from "@core/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@core/components/ui/popover";
import { Loader2, Search, X } from "lucide-react";
import * as React from "react";
import { useEffect, useRef, useState } from "react";

import { useAddToRecentSearchMutation } from "@/features/weather/lib/hooks/use-add-to-recent-search-mutation";
import { useSearchCityGeocodingQuery } from "@/features/weather/lib/hooks/use-search-city-geocoding-query";
import { useCityGeocodingStore } from "@/features/weather/lib/stores/city-geocoding-store";

import { Button } from "@/core/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/core/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/core/components/ui/input-group";
import { useDebounce } from "@/core/hooks/use-debounce";
import type { CityGeocoding } from "@/core/types/weather";
import { cn } from "@/core/utils/shadcn-utils";

export function SearchCityCombobox() {
	const inputRef = useRef<HTMLInputElement>(null);
	const listRef = useRef<HTMLDivElement>(null);
	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState("");
	const debounced = useDebounce(search.trim(), 300);
	const searchCityGeocodingQuery = useSearchCityGeocodingQuery(debounced);
	const cityGeocodingStore = useCityGeocodingStore();
	const addToRecentSearchMutation = useAddToRecentSearchMutation();

	const hasSearch = search.trim().length > 0;
	const isLoading = hasSearch && searchCityGeocodingQuery.isLoading;
	const isError = hasSearch && searchCityGeocodingQuery.isError;
	const hasResults = (searchCityGeocodingQuery.data?.length ?? 0) > 0;
	const isEmpty = hasSearch && !isLoading && !isError && !hasResults;

	useEffect(() => {
		if (searchCityGeocodingQuery.isSuccess) {
			setOpen(true);
		}
	}, [searchCityGeocodingQuery.isSuccess]);

	const handleOpenChange = (newOpen: boolean) => {
		if (!newOpen) {
			setSearch("");
			setOpen(false);
		}
	};

	const handleClearSearch = () => {
		setSearch("");
		setOpen(false);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.trim().length === 0) {
			setOpen(false);
		}
		setSearch(e.target.value);
	};

	const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const hasNavigableResults =
			open &&
			!searchCityGeocodingQuery.isLoading &&
			!searchCityGeocodingQuery.isError &&
			(searchCityGeocodingQuery.data?.length ?? 0) > 0;

		if (e.key === "ArrowDown" && hasNavigableResults) {
			e.preventDefault();
			const commandRoot = listRef.current?.querySelector<HTMLElement>("[cmdk-root]");
			if (commandRoot) {
				commandRoot.focus();
				commandRoot.dispatchEvent(
					new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true })
				);
			}
		}
	};

	const handleListKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === "ArrowUp") {
			const firstItem = listRef.current?.querySelector<HTMLElement>("[cmdk-item]");
			const selectedItem = listRef.current?.querySelector<HTMLElement>(
				"[cmdk-item][aria-selected='true']"
			);
			const isFirstItemSelected = firstItem != null && selectedItem === firstItem;
			const focusInList = listRef.current?.contains(document.activeElement);
			if (isFirstItemSelected && focusInList) {
				e.preventDefault();
				e.stopPropagation();
				inputRef.current?.focus();
			}
		}
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
			<Field data-invalid={isError}>
				<FieldLabel htmlFor="city-search-input" className="sr-only">
					Search city
				</FieldLabel>
				<PopoverTrigger
					nativeButton={false}
					render={<div className="relative flex w-full items-center cursor-text" />}>
					<InputGroup
						className={cn(
							"h-10 text-2xl border-white/30 rounded-xl bg-white/15 backdrop-blur-xl shadow-lg shadow-black/10 **:data-[slot=input-group-addon]:text-white/90"
						)}>
						<InputGroupInput
							ref={inputRef}
							id="city-search-input"
							autoComplete="off"
							role="combobox"
							aria-label="Search for a city"
							aria-autocomplete="list"
							aria-expanded={open}
							aria-controls="city-search-results"
							aria-describedby="city-search-status"
							aria-invalid={searchCityGeocodingQuery.isError}
							aria-errormessage={
								searchCityGeocodingQuery.isError ? "city-search-error-description" : undefined
							}
							placeholder="Search City..."
							className="text-white placeholder:text-white/60"
							value={search}
							onChange={handleInputChange}
							onKeyDown={handleInputKeyDown}
						/>
						<InputGroupAddon align="inline-start">
							<Search aria-hidden />
						</InputGroupAddon>

						<InputGroupAddon align="inline-end">
							{searchCityGeocodingQuery.isLoading && search.length > 0 && (
								<Loader2 className="animate-spin" aria-hidden />
							)}

							{!searchCityGeocodingQuery.isLoading && debounced.length > 0 && (
								<Button variant="ghost" size="icon-xs" onClick={handleClearSearch}>
									<X aria-hidden />
								</Button>
							)}
						</InputGroupAddon>
					</InputGroup>
				</PopoverTrigger>

				{isError && (
					<FieldDescription
						id="city-search-error-description"
						className="px-1 text-sm text-red-400">
						{searchCityGeocodingQuery.error.message}
					</FieldDescription>
				)}
			</Field>

			<PopoverContent
				id="city-search-results"
				className="w-(--anchor-width) p-0"
				align="start"
				initialFocus={false}
				finalFocus={inputRef}>
				<div ref={listRef} className="outline-none" onKeyDownCapture={handleListKeyDown}>
					<Command shouldFilter={false} tabIndex={-1}>
						<CommandList>
							{isLoading && (
								<CommandLoading>
									<div className="flex flex-row items-center justify-center gap-2">
										<Loader2 className="size-4 animate-spin" aria-hidden />
										<span>Searching...</span>
									</div>
								</CommandLoading>
							)}

							{isEmpty && <CommandEmpty>Nothing found.</CommandEmpty>}

							{hasResults && !isLoading && (
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
							)}
						</CommandList>
					</Command>
				</div>
			</PopoverContent>
		</Popover>
	);
}
