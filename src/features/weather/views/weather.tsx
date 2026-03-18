import { useState } from "react";
import { Search, Cloud, CloudRain, Sun } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { Input } from "@/core/components/ui/input";
import { Button } from "@/core/components/ui/button";
import {
  CITIES,
  WEATHER_DATA,
  type CityWeather,
} from "@/features/weather/lib/data/static-weather";

const iconMap = {
  sun: Sun,
  cloud: Cloud,
  "cloud-sun": Cloud,
  "cloud-rain": CloudRain,
};

function WeatherIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = iconMap[name as keyof typeof iconMap] ?? Cloud;
  return <Icon className={className ?? "size-8"} />;
}

export function Weather() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<CityWeather | null>(
    WEATHER_DATA["London"],
  );
  const [recent, setRecent] = useState<string[]>([]);

  const handleSearch = () => {
    const city = CITIES.find(
      (c) => c.toLowerCase() === search.trim().toLowerCase(),
    );
    if (city && WEATHER_DATA[city]) {
      setSelected(WEATHER_DATA[city]);
      setRecent((prev) => {
        const next = [city, ...prev.filter((c) => c !== city)].slice(0, 3);
        return next;
      });
    }
  };

  const selectCity = (city: string) => {
    if (WEATHER_DATA[city]) {
      setSelected(WEATHER_DATA[city]);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col gap-6 p-6 lg:p-8">
      <div className="shrink-0 flex justify-center">
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="h-12 pl-12 text-base"
          />
        </div>
      </div>

      {selected && (
        <>
          <div className="relative flex min-h-0 flex-1 overflow-hidden rounded-2xl bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 text-white shadow-2xl ring-1 ring-white/10 dark:from-sky-600 dark:via-blue-700 dark:to-indigo-800">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.2),transparent)]" />
            <div className="absolute -right-20 -top-20 size-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 size-40 rounded-full bg-white/5 blur-2xl" />
            <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-6 p-8 lg:gap-8 lg:p-12">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="rounded-3xl bg-white/20 p-8 backdrop-blur-md lg:p-10">
                  <WeatherIcon
                    name={selected.icon}
                    className="size-16 lg:size-18"
                  />
                </div>
                <h1 className="text-3xl font-bold tracking-tight drop-shadow-lg sm:text-5xl lg:text-6xl xl:text-7xl">
                  {selected.temp}°
                </h1>
                <p className="text-2xl font-medium opacity-95 lg:text-3xl xl:text-4xl">
                  {selected.city}
                </p>
                <p className="text-lg text-white/90 lg:text-xl">
                  {selected.condition}
                </p>
                <p className="text-base text-white/70 lg:text-lg">
                  Feels like {selected.feelsLike}°
                </p>
              </div>
              <div className="flex gap-12 lg:gap-16">
                <div className="text-center">
                  <p className="text-sm text-white/70 lg:text-base">Humidity</p>
                  <p className="text-xl font-semibold lg:text-2xl">
                    {selected.humidity}%
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-white/70 lg:text-base">Wind</p>
                  <p className="text-xl font-semibold lg:text-2xl">
                    {selected.wind} km/h
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid shrink-0 gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>5 Day Forecast</CardTitle>
                <CardDescription>Upcoming weather</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
                  {selected.forecast.map((day) => (
                    <div
                      key={day.date}
                      className="flex flex-col items-center rounded-xl border bg-muted/30 p-4"
                    >
                      <p className="font-medium">{day.date}</p>
                      <WeatherIcon name={day.icon} />
                      <p className="text-lg font-semibold">{day.high}°</p>
                      <p className="text-sm text-muted-foreground">
                        {day.low}°
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Searches</CardTitle>
                <CardDescription>Last 3 locations</CardDescription>
              </CardHeader>
              <CardContent>
                {recent.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    {recent.map((city) => (
                      <Button
                        key={city}
                        variant="outline"
                        className="h-auto justify-start py-3"
                        onClick={() => selectCity(city)}
                      >
                        {city}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Search for cities to see them here
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
