// components/WeatherMetrics.tsx
import { useUnits } from '../context/UnitsContext';
import { formatTemperature, formatWindSpeed, formatPrecipitation } from '../utils/unitConverter';


type WeatherMetricType = 'temperature' | 'wind' | 'precipitation' | 'humidity' | 'pressure' | 'visibility';

interface WeatherMetricsProps {
  title: string;
  value: number;
  type: WeatherMetricType;
}

const WeatherMetrics = ({ title, value, type }: WeatherMetricsProps) => {
  const { units } = useUnits();
  
  const formatValue = () => {
    switch (type) {
      case 'temperature':
        return formatTemperature(value, units.temperature);
      case 'wind':
        return formatWindSpeed(value, units.wind);
      case 'precipitation':
        return formatPrecipitation(value, units.precipitation);
      case 'humidity':
        return `${Math.round(value)}%`;
      case 'pressure':
        return `${Math.round(value)} hPa`;
      case 'visibility':
       
        if (units.wind === 'kmh') {
          return `${(value / 1000).toFixed(1)} km`;
        } else {
          return `${(value * 0.000621371).toFixed(1)} mi`;
        }
      default:
        return value.toString();
    }
  };

  return (
    <div className="bg-[hsl(243,27%,20%)] shadow rounded-lg p-3 border border-[hsl(243,27%,25%)]">
      <h2 className="text-sm font-medium mb-4 text-[hsl(240,6%,70%)]">
        {title}
      </h2>
      <p className="text-white text-lg">{formatValue()}</p>
    </div>
  );
};

export default WeatherMetrics;