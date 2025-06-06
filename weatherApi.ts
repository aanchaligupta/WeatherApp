import { WeatherData, ForecastData, HourlyData } from '../types/weather';

// Mock weather API service - In production, replace with actual API
const API_KEY = 'demo_key';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

class WeatherService {
  // Generate realistic mock data for demonstration
  private generateMockWeatherData(location: string): WeatherData {
    const conditions = [
      { condition: 'Clear', description: 'Clear sky', icon: 'sun' },
      { condition: 'Clouds', description: 'Partly cloudy', icon: 'cloud' },
      { condition: 'Rain', description: 'Light rain', icon: 'cloud-rain' },
      { condition: 'Snow', description: 'Light snow', icon: 'snowflake' }
    ];
    
    const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
    
    return {
      location: location || 'New York',
      country: 'US',
      temperature: Math.round(15 + Math.random() * 20),
      feelsLike: Math.round(12 + Math.random() * 25),
      humidity: Math.round(40 + Math.random() * 40),
      pressure: Math.round(1000 + Math.random() * 50),
      windSpeed: Math.round(Math.random() * 15),
      windDirection: Math.round(Math.random() * 360),
      visibility: Math.round(8 + Math.random() * 2),
      uvIndex: Math.round(Math.random() * 11),
      condition: randomCondition.condition,
      description: randomCondition.description,
      icon: randomCondition.icon,
      cloudCover: Math.round(Math.random() * 100),
      timestamp: Date.now()
    };
  }

  private generateMockForecast(): ForecastData[] {
    const conditions = [
      { condition: 'Clear', description: 'Sunny', icon: 'sun' },
      { condition: 'Clouds', description: 'Cloudy', icon: 'cloud' },
      { condition: 'Rain', description: 'Rainy', icon: 'cloud-rain' }
    ];

    return Array.from({ length: 5 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i + 1);
      const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
      
      return {
        date: date.toISOString().split('T')[0],
        high: Math.round(20 + Math.random() * 15),
        low: Math.round(5 + Math.random() * 15),
        condition: randomCondition.condition,
        description: randomCondition.description,
        icon: randomCondition.icon,
        humidity: Math.round(30 + Math.random() * 50),
        windSpeed: Math.round(Math.random() * 20),
        precipitation: Math.round(Math.random() * 30)
      };
    });
  }

  private generateMockHourlyData(): HourlyData[] {
    const conditions = [
      { condition: 'Clear', icon: 'sun' },
      { condition: 'Clouds', icon: 'cloud' },
      { condition: 'Rain', icon: 'cloud-rain' }
    ];

    return Array.from({ length: 24 }, (_, i) => {
      const time = new Date();
      time.setHours(time.getHours() + i);
      const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
      
      return {
        time: time.toISOString(),
        temperature: Math.round(18 + Math.random() * 10 + Math.sin(i / 4) * 5),
        condition: randomCondition.condition,
        icon: randomCondition.icon,
        precipitation: Math.round(Math.random() * 20),
        windSpeed: Math.round(Math.random() * 15)
      };
    });
  }

  async getCurrentWeather(location: string = ''): Promise<WeatherData> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.generateMockWeatherData(location);
  }

  async getForecast(): Promise<ForecastData[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.generateMockForecast();
  }

  async getHourlyForecast(): Promise<HourlyData[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    return this.generateMockHourlyData();
  }

  async searchLocation(query: string): Promise<string[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const cities = [
      'New York, US', 'London, GB', 'Tokyo, JP', 'Paris, FR', 
      'Sydney, AU', 'Berlin, DE', 'Toronto, CA', 'Mumbai, IN'
    ];
    return cities.filter(city => 
      city.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);
  }
}

export const weatherService = new WeatherService();