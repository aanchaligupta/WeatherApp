import React, { useState, useEffect } from 'react';
import { SearchLocation } from './components/SearchLocation';
import { CurrentWeather } from './components/CurrentWeather';
import { ForecastCard } from './components/ForecastCard';
import { HourlyForecast } from './components/HourlyForecast';
import { WeatherChart } from './components/WeatherChart';
import { MLInsights } from './components/MLInsights';
import { weatherService } from './services/weatherApi';
import { mlAnalysisService } from './services/mlAnalysis';
import { WeatherData, ForecastData, HourlyData, WeatherTrend } from './types/weather';
import { RefreshCw, CloudSun } from 'lucide-react';

function App() {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [hourlyData, setHourlyData] = useState<HourlyData[]>([]);
  const [trends, setTrends] = useState<WeatherTrend[]>([]);
  const [weatherPattern, setWeatherPattern] = useState<{
    pattern: string;
    confidence: number;
    description: string;
  } | null>(null);
  const [comfortIndex, setComfortIndex] = useState<{
    index: number;
    level: string;
    factors: string[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState('New York');

  const loadWeatherData = async (location?: string) => {
    setLoading(true);
    try {
      const [weather, forecastData, hourlyForecast] = await Promise.all([
        weatherService.getCurrentWeather(location || selectedLocation),
        weatherService.getForecast(),
        weatherService.getHourlyForecast()
      ]);

      setCurrentWeather(weather);
      setForecast(forecastData);
      setHourlyData(hourlyForecast);

      // Calculate ML insights
      const historicalData = Array.from({ length: 7 }, () => weather);
      const trendAnalysis = mlAnalysisService.analyzeTrends(historicalData);
      const patternPrediction = mlAnalysisService.predictWeatherPattern(forecastData);
      const comfort = mlAnalysisService.calculateComfortIndex(weather);

      setTrends(trendAnalysis);
      setWeatherPattern(patternPrediction);
      setComfortIndex(comfort);
    } catch (error) {
      console.error('Failed to load weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeatherData();
  }, []);

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    loadWeatherData(location);
  };

  const handleLocationSearch = async (query: string) => {
    return await weatherService.searchLocation(query);
  };

  const handleRefresh = () => {
    loadWeatherData();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-300 via-sky-400 to-blue-500 flex items-center justify-center">
        <div className="text-center">
          <CloudSun className="mx-auto mb-4 text-white animate-pulse\" size={60} />
          <div className="text-white text-xl font-semibold">Loading Weather Data...</div>
          <div className="text-white/80 text-sm mt-2">Analyzing atmospheric conditions</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-300 via-sky-400 to-blue-500">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <CloudSun className="text-white" size={32} />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                Weather Forecast ML
              </h1>
              <p className="text-white/80 text-sm">
                Advanced weather prediction with machine learning insights
              </p>
            </div>
          </div>
          
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-colors disabled:opacity-50"
          >
            <RefreshCw className={loading ? 'animate-spin' : ''} size={16} />
            Refresh
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <SearchLocation
            onLocationSelect={handleLocationSelect}
            onSearch={handleLocationSearch}
            loading={loading}
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Current Weather & ML Insights */}
          <div className="lg:col-span-2 space-y-6">
            {currentWeather && comfortIndex && (
              <CurrentWeather
                weather={currentWeather}
                comfortIndex={comfortIndex}
              />
            )}

            {hourlyData.length > 0 && (
              <HourlyForecast hourlyData={hourlyData} />
            )}

            {hourlyData.length > 0 && (
              <WeatherChart hourlyData={hourlyData} />
            )}
          </div>

          {/* Right Column - Forecast & ML Analysis */}
          <div className="space-y-6">
            {/* 5-Day Forecast */}
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/30">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">5-Day Forecast</h3>
              <div className="space-y-3">
                {forecast.map((day, index) => (
                  <ForecastCard
                    key={index}
                    forecast={day}
                    isToday={index === 0}
                  />
                ))}
              </div>
            </div>

            {/* ML Insights */}
            {trends.length > 0 && weatherPattern && (
              <MLInsights
                trends={trends}
                weatherPattern={weatherPattern}
              />
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-white/60 text-sm">
          <p>
            Weather data simulated for demonstration • ML analysis shows predictive capabilities
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;