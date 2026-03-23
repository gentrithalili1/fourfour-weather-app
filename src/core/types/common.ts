export type TempUnit = "celsius" | "fahrenheit";

export type Theme = "dark" | "light" | "system";

export type BackgroundType = "gradient" | "image" | "none";

export type CityBackground = {
	imageUrl: string | null;
	photographer: { name: string; url: string } | null;
};

export type WithOkResponse = {
	ok: boolean;
};
