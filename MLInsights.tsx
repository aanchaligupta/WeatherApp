import React from 'react';
import { WeatherTrend } from '../types/weather';
import { TrendingUp, TrendingDown, Minus, Brain, Target } from 'lucide-react';

interface MLInsightsProps {
  trends: WeatherTrend[];
  weatherPattern: {
    pattern: string;
    confidence: number;
    description: string;
  };
}

export const MLInsights: React.FC<MLInsightsProps> = ({ trends, weatherPattern }) => {
  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="text-green-600\" size={20} />;
      case 'down':
        return <TrendingDown className="text-red-600" size={20} />;
      default:
        return <Minus className="text-blue-600" size={20} />;
    }
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return 'text-green-700';
      case 'down':
        return 'text-red-700';
      default:
        return 'text-blue-700';
    }
  };

  return (
    <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/30">
      <div className="flex items-center gap-2 mb-6">
        <Brain className="text-blue-600" size={24} />
        <h3 className="text-xl font-semibold text-blue-900">ML Weather Analysis</h3>
      </div>

      {/* Weather Pattern Prediction */}
      <div className="bg-white/15 rounded-2xl p-4 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Target className="text-blue-600" size={20} />
          <h4 className="font-semibold text-blue-900">Pattern Prediction</h4>
        </div>
        
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-bold text-blue-900">{weatherPattern.pattern}</span>
          <div className="flex items-center gap-2">
            <div className="text-sm text-blue-600">Confidence:</div>
            <div className="text-lg font-bold text-blue-900">{weatherPattern.confidence}%</div>
          </div>
        </div>
        
        <div className="w-full bg-white/20 rounded-full h-2 mb-3">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${weatherPattern.confidence}%` }}
          />
        </div>
        
        <p className="text-sm text-blue-700">{weatherPattern.description}</p>
      </div>

      {/* Trend Analysis */}
      <div className="space-y-4">
        <h4 className="font-semibold text-blue-900 mb-3">Time Series Trends</h4>
        
        {trends.map((trend, index) => (
          <div key={index} className="bg-white/10 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                {getTrendIcon(trend.trend)}
                <span className="font-medium text-blue-900">{trend.metric}</span>
              </div>
              
              <div className="text-right">
                <div className={`text-sm font-semibold ${getTrendColor(trend.trend)}`}>
                  {trend.trend === 'up' && '+'}
                  {trend.change}
                  {trend.metric === 'Temperature' ? '°' : 
                   trend.metric === 'Humidity' ? '%' : ' mb'}
                </div>
                <div className="text-xs text-blue-600">Change</div>
              </div>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-blue-600">Next predicted value:</span>
              <span className="font-semibold text-blue-900">
                {trend.prediction}
                {trend.metric === 'Temperature' ? '°' : 
                 trend.metric === 'Humidity' ? '%' : ' mb'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};