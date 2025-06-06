import { WeatherData, ForecastData, WeatherTrend } from '../types/weather';

class MLAnalysisService {
  // Time series analysis using moving averages and trend detection
  analyzeTrends(historicalData: WeatherData[]): WeatherTrend[] {
    if (historicalData.length < 3) {
      return [];
    }

    const trends: WeatherTrend[] = [];
    
    // Temperature trend analysis
    const temperatures = historicalData.map(d => d.temperature);
    const tempTrend = this.calculateTrend(temperatures);
    trends.push({
      metric: 'Temperature',
      trend: tempTrend.direction,
      change: tempTrend.change,
      prediction: tempTrend.prediction
    });

    // Humidity trend analysis
    const humidity = historicalData.map(d => d.humidity);
    const humidityTrend = this.calculateTrend(humidity);
    trends.push({
      metric: 'Humidity',
      trend: humidityTrend.direction,
      change: humidityTrend.change,
      prediction: humidityTrend.prediction
    });

    // Pressure trend analysis
    const pressure = historicalData.map(d => d.pressure);
    const pressureTrend = this.calculateTrend(pressure);
    trends.push({
      metric: 'Pressure',
      trend: pressureTrend.direction,
      change: pressureTrend.change,
      prediction: pressureTrend.prediction
    });

    return trends;
  }

  private calculateTrend(values: number[]): {
    direction: 'up' | 'down' | 'stable';
    change: number;
    prediction: number;
  } {
    const recent = values.slice(-3);
    const older = values.slice(-6, -3);
    
    const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
    const olderAvg = older.length > 0 ? older.reduce((a, b) => a + b, 0) / older.length : recentAvg;
    
    const change = recentAvg - olderAvg;
    const changePercent = Math.abs(change / olderAvg) * 100;
    
    let direction: 'up' | 'down' | 'stable';
    if (changePercent < 2) {
      direction = 'stable';
    } else if (change > 0) {
      direction = 'up';
    } else {
      direction = 'down';
    }

    // Simple linear extrapolation for prediction
    const prediction = recentAvg + (change * 0.5);

    return {
      direction,
      change: Math.round(change * 100) / 100,
      prediction: Math.round(prediction * 100) / 100
    };
  }

  // Predict weather patterns using simple time series analysis
  predictWeatherPattern(forecastData: ForecastData[]): {
    pattern: string;
    confidence: number;
    description: string;
  } {
    const temperatures = forecastData.map(d => (d.high + d.low) / 2);
    const precipitations = forecastData.map(d => d.precipitation);
    
    // Analyze temperature pattern
    const tempVariance = this.calculateVariance(temperatures);
    const tempTrend = temperatures[temperatures.length - 1] - temperatures[0];
    
    // Analyze precipitation pattern
    const precipSum = precipitations.reduce((a, b) => a + b, 0);
    const avgPrecip = precipSum / precipitations.length;
    
    let pattern: string;
    let confidence: number;
    let description: string;
    
    if (tempVariance < 10 && avgPrecip < 5) {
      pattern = 'Stable Clear';
      confidence = 85;
      description = 'Expect consistent clear weather with minimal temperature variation';
    } else if (tempTrend > 5 && avgPrecip < 10) {
      pattern = 'Warming Trend';
      confidence = 78;
      description = 'Temperature rising with low precipitation probability';
    } else if (avgPrecip > 15) {
      pattern = 'Wet Period';
      confidence = 72;
      description = 'Higher chance of precipitation over the forecast period';
    } else if (tempVariance > 15) {
      pattern = 'Variable';
      confidence = 65;
      description = 'Expect variable weather conditions with temperature fluctuations';
    } else {
      pattern = 'Mixed Conditions';
      confidence = 60;
      description = 'Mixed weather patterns with moderate variability';
    }
    
    return { pattern, confidence, description };
  }

  private calculateVariance(values: number[]): number {
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const squaredDiffs = values.map(value => Math.pow(value - mean, 2));
    return squaredDiffs.reduce((a, b) => a + b, 0) / values.length;
  }

  // Calculate weather comfort index using multiple factors
  calculateComfortIndex(weather: WeatherData): {
    index: number;
    level: string;
    factors: string[];
  } {
    let score = 50; // Base score
    const factors: string[] = [];
    
    // Temperature factor (optimal range: 18-24°C)
    if (weather.temperature >= 18 && weather.temperature <= 24) {
      score += 20;
      factors.push('Optimal temperature');
    } else if (weather.temperature >= 15 && weather.temperature <= 27) {
      score += 10;
      factors.push('Comfortable temperature');
    } else {
      score -= 10;
      factors.push('Temperature outside comfort zone');
    }
    
    // Humidity factor (optimal range: 40-60%)
    if (weather.humidity >= 40 && weather.humidity <= 60) {
      score += 15;
      factors.push('Ideal humidity');
    } else if (weather.humidity >= 30 && weather.humidity <= 70) {
      score += 5;
      factors.push('Acceptable humidity');
    } else {
      score -= 10;
      factors.push('Humidity discomfort');
    }
    
    // Wind factor (optimal: 5-15 km/h)
    if (weather.windSpeed >= 5 && weather.windSpeed <= 15) {
      score += 10;
      factors.push('Pleasant breeze');
    } else if (weather.windSpeed > 25) {
      score -= 15;
      factors.push('Strong winds');
    }
    
    // UV Index factor
    if (weather.uvIndex <= 2) {
      score += 5;
      factors.push('Low UV exposure');
    } else if (weather.uvIndex >= 8) {
      score -= 10;
      factors.push('High UV warning');
    }
    
    const index = Math.max(0, Math.min(100, score));
    let level: string;
    
    if (index >= 80) level = 'Excellent';
    else if (index >= 60) level = 'Good';
    else if (index >= 40) level = 'Fair';
    else level = 'Poor';
    
    return { index, level, factors };
  }
}

export const mlAnalysisService = new MLAnalysisService();