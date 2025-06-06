import React from 'react';
import { WeatherData } from '../types/weather';
import { WeatherIcon } from './WeatherIcon';
import { 
  Thermometer, 
  Droplets, 
  Gauge, 
  Wind, 
  Eye, 
  Sun,
  MapPin
} from 'lucide-react';

interface CurrentWeatherProps {
  weather: WeatherData;
  comfortIndex: {
    index: number;
    level: string;
    factors: string[];
  };
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ 
  weather, 
  comfortIndex 
}) => {
  return (
    <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/30">
      {/* Location */}
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="text-blue-700" size={20} />
        <h2 className="text-xl font-semibold text-blue-900">
          {weather.location}, {weather.country}
        </h2>
      </div>

      {/* Main Weather Display */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <WeatherIcon 
            condition={weather.icon} 
            size={80} 
            className="text-blue-600" 
          />
          <div>
            <div className="text-5xl font-bold text-blue-900 mb-1">
              {weather.temperature}°
            </div>
            <div className="text-blue-700 text-lg capitalize">
              {weather.description}
            </div>
            <div className="text-blue-600 text-sm">
              Feels like {weather.feelsLike}°
            </div>
          </div>
        </div>
        
        {/* Comfort Index */}
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-900 mb-1">
            {comfortIndex.index}
          </div>
          <div className="text-sm text-blue-700 font-medium">
            {comfortIndex.level}
          </div>
          <div className="text-xs text-blue-600">
            Comfort Index
          </div>
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-3 p-3 bg-white/10 rounded-xl">
          <Droplets className="text-blue-600" size={20} />
          <div>
            <div className="text-sm text-blue-600">Humidity</div>
            <div className="font-semibold text-blue-900">{weather.humidity}%</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-white/10 rounded-xl">
          <Wind className="text-blue-600" size={20} />
          <div>
            <div className="text-sm text-blue-600">Wind</div>
            <div className="font-semibold text-blue-900">{weather.windSpeed} km/h</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-white/10 rounded-xl">
          <Gauge className="text-blue-600" size={20} />
          <div>
            <div className="text-sm text-blue-600">Pressure</div>
            <div className="font-semibold text-blue-900">{weather.pressure} mb</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-white/10 rounded-xl">
          <Eye className="text-blue-600" size={20} />
          <div>
            <div className="text-sm text-blue-600">Visibility</div>
            <div className="font-semibold text-blue-900">{weather.visibility} km</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-white/10 rounded-xl">
          <Sun className="text-blue-600" size={20} />
          <div>
            <div className="text-sm text-blue-600">UV Index</div>
            <div className="font-semibold text-blue-900">{weather.uvIndex}</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-white/10 rounded-xl">
          <Thermometer className="text-blue-600" size={20} />
          <div>
            <div className="text-sm text-blue-600">Cloud Cover</div>
            <div className="font-semibold text-blue-900">{weather.cloudCover}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};