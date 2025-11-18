import { useState } from 'react';

const HourlyForecast = () => {
  const [selectedDay, setSelectedDay] = useState('Tuesday');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const hourlyData = [
    {icon: '/assets/images/icon-fog.webp', time: '3 PM', temp: 20 },
    {icon: '/assets/images/icon-sunny.webp', time: '4 PM', temp: 20 },
    {icon: '/assets/images/icon-overcast.webp', time: '5 PM', temp: 20 },
    {icon: '/assets/images/icon-drizzle.webp', time: '6 PM', temp: 19 },
    {icon: '/assets/images/icon-fog.webp', time: '7 PM', temp: 18 },
    {icon: '/assets/images/icon-partly-cloudy.webp', time: '8 PM', temp: 18 },
    { icon: '/assets/images/icon-rain.webp',time: '9 PM', temp: 17 },
    { icon: '/assets/images/icon-storm.webp',time: '10 PM', temp: 17 },
  ];

  return (
    <div className="bg-[hsl(243,27%,20%)] rounded-xl p-6 h-full mt-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-white font-semibold text-lg">Hourly forecast</h3>
        
        {/* Simple Select Dropdown */}
        <select 
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
          className="bg-[hsl(243,23%,24%)] border border-[hsl(243,23%,30%)] text-[hsl(250,6%,84%)] text-sm font-medium rounded px-3 py-1 focus:outline-none focus:ring-1 focus:ring-[hsl(233,67%,56%)]"
        >
          {days.map((day) => (
            <option key={day} value={day} className="bg-[hsl(250,6%,84%)] text-white">
              {day}

            </option>))}
        </select>
      </div>
      
      {/* Hourly List */}
      <div className="space-y-6">
        {hourlyData.map((hour, index) => (
          <div key={index} className="flex justify-between items-center bg-[hsl(243,23%,24%)] rounded-md border border-[hsl(250,6%,84%)] p-3">
            <div className="text-neutral-300 text-base">
                <div className='flex items-center justify-center'>
                      <img src={hour.icon} alt="weather icon"  className='mx-auto mb-2 w-10 h-10'/>
                <p>{hour.time}</p></div>
                </div>
              
                
            <div className="text-white text-base font-medium">{hour.temp}°</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;