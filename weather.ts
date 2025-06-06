export interface WeatherData {
  location: string;
  country: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDirection: number;
  visibility: number;
  uvIndex: number;
  condition: string;
  description: string;
  icon: string;
  cloudCover: number;
  timestamp: number;
}

export interface ForecastData {
  date: string;
  high: number;
  low: number;
  condition: string;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  precipitation: number;
}

export interface HourlyData {
  time: string;
  temperature: number;
  condition: string;
  icon: string;
  precipitation: number;
  windSpeed: number;
}

export interface WeatherTrend {
  metric: string;
  trend: 'up' | 'down' | 'stable';
  change: number;
  prediction: number;
}