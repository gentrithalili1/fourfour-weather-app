export interface GeoCity {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

export interface SearchCity extends GeoCity {
  id: string;
}

export interface CityWeather {
  id: string;
  name: string;
  country: string;
  temp: number;
  description: string;
  lat: number;
  lon: number;
  searchedAt: number;
}
