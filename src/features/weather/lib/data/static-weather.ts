export interface DayForecast {
  date: string;
  high: number;
  low: number;
  condition: string;
  icon: string;
}

export interface CityWeather {
  city: string;
  temp: number;
  feelsLike: number;
  condition: string;
  humidity: number;
  wind: number;
  icon: string;
  forecast: DayForecast[];
}

export const CITIES = ["London", "New York", "Tokyo", "Paris", "Sydney"];

export const WEATHER_DATA: Record<string, CityWeather> = {
  London: {
    city: "London",
    temp: 14,
    feelsLike: 12,
    condition: "Partly Cloudy",
    humidity: 72,
    wind: 18,
    icon: "cloud-sun",
    forecast: [
      { date: "Wed", high: 15, low: 8, condition: "Cloudy", icon: "cloud" },
      { date: "Thu", high: 16, low: 9, condition: "Sunny", icon: "sun" },
      { date: "Fri", high: 14, low: 7, condition: "Rain", icon: "cloud-rain" },
      { date: "Sat", high: 13, low: 6, condition: "Partly Cloudy", icon: "cloud-sun" },
      { date: "Sun", high: 17, low: 10, condition: "Sunny", icon: "sun" },
    ],
  },
  "New York": {
    city: "New York",
    temp: 22,
    feelsLike: 21,
    condition: "Sunny",
    humidity: 45,
    wind: 12,
    icon: "sun",
    forecast: [
      { date: "Wed", high: 24, low: 15, condition: "Sunny", icon: "sun" },
      { date: "Thu", high: 23, low: 14, condition: "Partly Cloudy", icon: "cloud-sun" },
      { date: "Fri", high: 20, low: 12, condition: "Rain", icon: "cloud-rain" },
      { date: "Sat", high: 19, low: 11, condition: "Cloudy", icon: "cloud" },
      { date: "Sun", high: 21, low: 13, condition: "Sunny", icon: "sun" },
    ],
  },
  Tokyo: {
    city: "Tokyo",
    temp: 18,
    feelsLike: 17,
    condition: "Cloudy",
    humidity: 65,
    wind: 8,
    icon: "cloud",
    forecast: [
      { date: "Wed", high: 19, low: 12, condition: "Rain", icon: "cloud-rain" },
      { date: "Thu", high: 20, low: 13, condition: "Partly Cloudy", icon: "cloud-sun" },
      { date: "Fri", high: 21, low: 14, condition: "Sunny", icon: "sun" },
      { date: "Sat", high: 22, low: 15, condition: "Sunny", icon: "sun" },
      { date: "Sun", high: 20, low: 14, condition: "Cloudy", icon: "cloud" },
    ],
  },
  Paris: {
    city: "Paris",
    temp: 16,
    feelsLike: 15,
    condition: "Partly Cloudy",
    humidity: 58,
    wind: 14,
    icon: "cloud-sun",
    forecast: [
      { date: "Wed", high: 17, low: 10, condition: "Sunny", icon: "sun" },
      { date: "Thu", high: 16, low: 9, condition: "Cloudy", icon: "cloud" },
      { date: "Fri", high: 15, low: 8, condition: "Rain", icon: "cloud-rain" },
      { date: "Sat", high: 14, low: 7, condition: "Rain", icon: "cloud-rain" },
      { date: "Sun", high: 18, low: 11, condition: "Partly Cloudy", icon: "cloud-sun" },
    ],
  },
  Sydney: {
    city: "Sydney",
    temp: 26,
    feelsLike: 28,
    condition: "Sunny",
    humidity: 55,
    wind: 22,
    icon: "sun",
    forecast: [
      { date: "Wed", high: 27, low: 19, condition: "Sunny", icon: "sun" },
      { date: "Thu", high: 28, low: 20, condition: "Partly Cloudy", icon: "cloud-sun" },
      { date: "Fri", high: 25, low: 18, condition: "Rain", icon: "cloud-rain" },
      { date: "Sat", high: 24, low: 17, condition: "Cloudy", icon: "cloud" },
      { date: "Sun", high: 26, low: 19, condition: "Sunny", icon: "sun" },
    ],
  },
};
