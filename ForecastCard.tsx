import React from 'react';
import { ForecastData } from '../types/weather';
import { WeatherIcon } from './WeatherIcon';

interface ForecastCardProps {
  forecast: ForecastData;
  isToday?: boolean;
}

export const ForecastCard: React.FC<ForecastCardProps> = ({ 
  forecast, 
  isToday = false 
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isToday) return 'Today';
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center hover:bg-white/30 transition-all duration-300 border border-white/20">
      <div className="text-sm font-medium text-blue-700 mb-2">
        {formatDate(forecast.date)}
      </div>
      
      <div className="flex justify-center mb-3">
        <WeatherIcon 
          condition={forecast.icon} 
          size={40} 
          className="text-blue-600" 
        />
      </div>
      
      <div className="text-xs text-blue-600 mb-2 capitalize">
        {forecast.description}
      </div>
      
      <div className="flex justify-between items-end">
        <div className="text-left">
          <div className="text-lg font-bold text-blue-900">{forecast.high}°</div>
          <div className="text-sm text-blue-600">{forecast.low}°</div>
        </div>
        
        <div className="text-right text-xs text-blue-600">
          <div>{forecast.precipitation}% rain</div>
          <div>{forecast.windSpeed} km/h</div>
        </div>
      </div>
    </div>
  );
};