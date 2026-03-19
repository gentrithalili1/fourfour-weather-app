import { Image, ImageOff, Palette } from "lucide-react";

import { Button } from "@/core/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/core/components/ui/dropdown-menu";
import { useBackgroundStore } from "@/core/stores/background-store";
import type { BackgroundType } from "@/core/types/common";

const OPTIONS: { type: BackgroundType; label: string; icon: React.ReactNode }[] = [
	{ type: "image", label: "Weather photo", icon: <Image className="size-4" aria-hidden /> },
	{ type: "gradient", label: "Weather color", icon: <Palette className="size-4" aria-hidden /> },
	{ type: "none", label: "None", icon: <ImageOff className="size-4" aria-hidden /> },
] as const;

export function BackgroundToggle() {
	const backgroundStore = useBackgroundStore();
	const icon = OPTIONS.find((option) => option.type === backgroundStore.type)?.icon;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={
					<Button variant="outline" size="icon">
						<span>{icon}</span>
						<span className="sr-only">Background</span>
					</Button>
				}
			/>
			<DropdownMenuContent align="end">
				{OPTIONS.map((option) => (
					<DropdownMenuItem
						key={option.type}
						onClick={() => backgroundStore.setType(option.type)}
						className={backgroundStore.type === option.type ? "bg-accent" : undefined}>
						{option.label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
