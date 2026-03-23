import { cn } from "@core/utils/shadcn-utils";

import { getOwIconSrc } from "@/features/weather/lib/utils/get-ow-icon-src";

type WeatherIconProps = {
	icon: string;
	alt?: string;
	className?: string;
};

export function WeatherIcon({ icon, alt = "", className }: WeatherIconProps) {
	return (
		<img
			src={getOwIconSrc(icon)}
			alt={alt}
			aria-hidden={alt === "" ? true : undefined}
			className={cn("shrink-0", className)}
		/>
	);
}
