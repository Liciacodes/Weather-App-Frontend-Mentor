// components/Content.tsx - FIXED
import { useUnits } from '../context/UnitsContext';
import CurrentWeatherCard from "./CurrentWeatherCard";
import DailyForecast from "./DailyForecast";
import HourlyForecast from "./HourlyForecast";
import LoadingSkeleton from "./LoadingSkeleton";
import WeatherMetrics from "./WeatherMetrics";

interface ContentProps {
  isLoading?: boolean;
  weatherData?: {
    location?: string; // Make sure this is in the interface
    current: {
      temperature: number;
      feelsLike: number;
      humidity: number;
      windSpeed: number;
      precipitation: number;
      pressure?: number;
      visibility?: number;
      description?: string;
      icon?: string;
    };
    daily: Array<{
      day: string;
      icon: string;
      highTemp: number;
      lowTemp: number;
    }>;
    hourly: Array<{
      time: string;
      icon: string;
      temp: number;
    }>;
  };
}

const Content = ({ isLoading, weatherData }: ContentProps) => {
  const { units } = useUnits();

  if (isLoading) {
    return <LoadingSkeleton/>
  }

  // Check if weatherData is provided
  if (!weatherData) {
    return (
      <section className="mx-auto px-4 sm:px-20 mt-10 text-center">
        <div className="bg-[hsl(243,27%,20%)] rounded-xl p-8">
          <p className="text-white text-lg">No weather data available.</p>
          <p className="text-gray-400 mt-2">Please search for a location to see weather information.</p>
        </div>
      </section>
    );
  }

  // Use the provided data
  const data = weatherData;
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  console.log('Content component data:', data); // Debug log

  return (
    <section className="mx-auto px-4 sm:px-20 mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Takes 2/3 on desktop */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <CurrentWeatherCard 
            temperature={data.current.temperature}
            location={data.location || "Loading..."} // USE API LOCATION HERE
            date={currentDate}
            icon={data.daily[0]?.icon || "/assets/images/icon-sunny.webp"} // Use first day's icon
            description={data.current.description || `Feels like ${data.current.feelsLike}°`}
          />
          
          {/* Weather Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <WeatherMetrics 
              title="Feels Like" 
              value={data.current.feelsLike} 
              type="temperature" 
            />
            <WeatherMetrics 
              title="Humidity" 
              value={data.current.humidity} 
              type="humidity" 
            />
            <WeatherMetrics 
              title="Wind" 
              value={data.current.windSpeed} 
              type="wind" 
            />
            <WeatherMetrics 
              title="Precipitation" 
              value={data.current.precipitation} 
              type="precipitation" 
            />
            {/* Optional metrics - only show if data exists */}
            {data.current.pressure !== undefined && (
              <WeatherMetrics 
                title="Pressure" 
                value={data.current.pressure} 
                type="pressure" 
              />
            )}
            {data.current.visibility !== undefined && (
              <WeatherMetrics 
                title="Visibility" 
                value={data.current.visibility} 
                type="visibility" 
              />
            )}
          </div>

          <div className="mt-6">
            <h1 className="text-white text-lg py-4">Daily Forecast</h1>
            <div className="grid grid-cols-3 md:grid-cols-7 gap-4">
              {data.daily.map((day, index) => (
                <DailyForecast 
                  key={`${day.day}-${index}`}
                  day={day.day}
                  icon={day.icon}
                  highTemp={day.highTemp}
                  lowTemp={day.lowTemp}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Takes 1/3 on desktop */}
        <div className="lg:col-span-1">
          <div className="h-full">
            <HourlyForecast hourlyData={data.hourly} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content;