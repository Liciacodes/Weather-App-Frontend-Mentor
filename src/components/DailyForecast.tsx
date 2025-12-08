// components/DailyForecast.tsx
import { useUnits } from '../context/UnitsContext';
import { formatTemperature } from '../utils/unitConverter';

interface DailyForecastProps {
  day: string;
  icon: string;
  highTemp: number;
  lowTemp: number;
}

const DailyForecast = ({ day, icon, highTemp, lowTemp }: DailyForecastProps) => {
  const { units } = useUnits();
  
  return (
    <div className="bg-[hsl(243,27%,20%)] shadow rounded-lg p-3 text-center border border-[hsl(243,27%,25%)]">
      <h2 className="text-md font-semibold mb-2 text-[hsl(240,6%,70%)]">{day}</h2>
      <img src={icon} alt={`${day} weather icon`} className="mx-auto mb-2 w-10 h-10" />
      <div className="flex items-center justify-between text-[hsl(240,6%,70%)]">
        <p className="text-white font-medium">{formatTemperature(highTemp, units.temperature)}</p>
        <p>{formatTemperature(lowTemp, units.temperature)}</p>
      </div>
    </div>
  );
};

export default DailyForecast;