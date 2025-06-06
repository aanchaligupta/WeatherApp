import React from 'react';
import { HourlyData } from '../types/weather';

interface WeatherChartProps {
  hourlyData: HourlyData[];
}

export const WeatherChart: React.FC<WeatherChartProps> = ({ hourlyData }) => {
  const data = hourlyData.slice(0, 12);
  const maxTemp = Math.max(...data.map(d => d.temperature));
  const minTemp = Math.min(...data.map(d => d.temperature));
  const tempRange = maxTemp - minTemp || 1;

  const getYPosition = (temp: number) => {
    return 200 - ((temp - minTemp) / tempRange) * 180;
  };

  const pathData = data
    .map((d, i) => {
      const x = (i * 300) / (data.length - 1);
      const y = getYPosition(d.temperature);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  return (
    <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/30">
      <h3 className="text-xl font-semibold text-blue-900 mb-4">Temperature Trend</h3>
      
      <div className="relative h-48 mb-4">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 300 200"
          className="overflow-visible"
        >
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map(i => (
            <line
              key={i}
              x1="0"
              y1={i * 50}
              x2="300"
              y2={i * 50}
              stroke="rgba(59, 130, 246, 0.1)"
              strokeWidth="1"
            />
          ))}
          
          {/* Temperature line */}
          <path
            d={pathData}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
          
          {/* Data points */}
          {data.map((d, i) => (
            <circle
              key={i}
              cx={(i * 300) / (data.length - 1)}
              cy={getYPosition(d.temperature)}
              r="4"
              fill="#3B82F6"
              className="hover:r-6 transition-all cursor-pointer"
            />
          ))}
        </svg>
      </div>
      
      {/* Time labels */}
      <div className="flex justify-between text-xs text-blue-600">
        {data.map((d, i) => (
          <span key={i}>
            {i === 0 ? 'Now' : new Date(d.time).getHours()}h
          </span>
        ))}
      </div>
    </div>
  );
};