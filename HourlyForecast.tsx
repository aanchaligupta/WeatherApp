import React from 'react';
import { HourlyData } from '../types/weather';
import { WeatherIcon } from './WeatherIcon';

interface HourlyForecastProps {
  hourlyData: HourlyData[];
}

export const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourlyData }) => {
  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      hour12: true 
    });
  };

  return (
    <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/30">
      <h3 className="text-xl font-semibold text-blue-900 mb-4">24-Hour Forecast</h3>
      
      <div className="flex gap-3 overflow-x-auto pb-2">
        {hourlyData.slice(0, 12).map((hour, index) => (
          <div
            key={index}
            className="flex-shrink-0 bg-white/15 rounded-xl p-3 text-center min-w-[80px] hover:bg-white/25 transition-colors"
          >
            <div className="text-xs text-blue-600 mb-2">
              {index === 0 ? 'Now' : formatTime(hour.time)}
            </div>
            
            <div className="flex justify-center mb-2">
              <WeatherIcon 
                condition={hour.icon} 
                size={24} 
                className="text-blue-600" 
              />
            </div>
            
            <div className="text-sm font-semibold text-blue-900 mb-1">
              {hour.temperature}°
            </div>
            
            <div className="text-xs text-blue-600">
              {hour.precipitation}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};