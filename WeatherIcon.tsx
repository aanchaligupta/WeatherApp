import React from 'react';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  Snowflake, 
  Zap, 
  CloudSnow,
  Eye,
  Wind
} from 'lucide-react';

interface WeatherIconProps {
  condition: string;
  size?: number;
  className?: string;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ 
  condition, 
  size = 24, 
  className = '' 
}) => {
  const iconProps = { size, className };

  switch (condition.toLowerCase()) {
    case 'clear':
    case 'sun':
    case 'sunny':
      return <Sun {...iconProps} />;
    case 'clouds':
    case 'cloud':
    case 'cloudy':
      return <Cloud {...iconProps} />;
    case 'rain':
    case 'cloud-rain':
    case 'rainy':
      return <CloudRain {...iconProps} />;
    case 'snow':
    case 'snowflake':
    case 'snowy':
      return <Snowflake {...iconProps} />;
    case 'thunderstorm':
    case 'storm':
      return <Zap {...iconProps} />;
    case 'mist':
    case 'fog':
      return <Eye {...iconProps} />;
    case 'wind':
      return <Wind {...iconProps} />;
    default:
      return <Sun {...iconProps} />;
  }
};