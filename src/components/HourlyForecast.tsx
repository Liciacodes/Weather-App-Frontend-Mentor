// components/HourlyForecast.tsx
import { useState } from 'react';
import { useUnits } from '../context/UnitsContext';
import { formatTemperature } from '../utils/unitConverter';

interface HourlyData {
  time: string;
  icon: string;
  temp: number;
}

interface HourlyForecastProps {
  hourlyData?: HourlyData[]; // Make it optional
}

const HourlyForecast = ({ hourlyData = [] }: HourlyForecastProps) => { // Add default value
  const [selectedDay, setSelectedDay] = useState('Tuesday');
  const { units } = useUnits();

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Use default data if none provided
  const data = hourlyData.length > 0 ? hourlyData : [
    { time: "3 PM", icon: "/assets/images/icon-fog.webp", temp: 20 },
    { time: "4 PM", icon: "/assets/images/icon-sunny.webp", temp: 20 },
    { time: "5 PM", icon: "/assets/images/icon-overcast.webp", temp: 20 },
    { time: "6 PM", icon: "/assets/images/icon-drizzle.webp", temp: 19 },
    { time: "7 PM", icon: "/assets/images/icon-fog.webp", temp: 18 },
    { time: "8 PM", icon: "/assets/images/icon-partly-cloudy.webp", temp: 18 },
    { time: "9 PM", icon: "/assets/images/icon-rain.webp", temp: 17 },
    { time: "10 PM", icon: "/assets/images/icon-storm.webp", temp: 17 },
  ];

  return (
    <div className="bg-[hsl(243,27%,20%)] rounded-xl p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-white font-semibold text-lg">Hourly forecast</h3>
        
        {/* Simple Select Dropdown */}
        <select 
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
          className="bg-[hsl(243,23%,24%)] border-[0.5px] border-[hsl(243,23%,30%)] text-[hsl(250,6%,84%)] text-sm font-medium rounded px-3 py-1 focus:outline-none focus:ring-1 focus:ring-[hsl(243,23%,30%)] hover:bg-[hsl(243,23%,28%)] hover:border-[hsl(243,23%,40%)] transition-colors"
        >
          {days.map((day) => (
            <option key={day} value={day} className="bg-[hsl(243,23%,24%)] rounded-md "
            style={{
              backgroundColor: 'hsl(243, 23%, 24%)',
              color: 'hsl(250, 6%, 84%)',
            }}>
              {day}
            </option>
          ))}
        </select>
      </div>
      
      {/* Hourly List */}
      <div className="space-y-4 grow overflow-y-auto pr-1">
        {data.map((hour, index) => (
          <div key={`${hour.time}-${index}`} className="flex justify-between items-center bg-[hsl(243,23%,24%)] rounded-md border-[0.5px] border-[hsl(243,23%,30%)] p-2 min-h-[60px]">
            <div className="text-neutral-300 text-base">
              <div className='flex items-center justify-center'>
                <img src={hour.icon} alt="weather icon" className='mx-auto mb-2 w-10 h-10'/>
                <p>{hour.time}</p>
              </div>
            </div>
            <div className="text-[hsl(240,6%,70%)] text-base font-medium">
              {formatTemperature(hour.temp, units.temperature)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;