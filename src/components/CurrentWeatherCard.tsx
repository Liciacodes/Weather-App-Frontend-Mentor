// components/CurrentWeatherCard.tsx - WITH SPACE BETWEEN ICON AND TEMP
import { useUnits } from '../context/UnitsContext';
import { formatTemperature } from '../utils/unitConverter';

interface CurrentWeatherCardProps {
  temperature: number;
  location: string;
  date: string;
  icon: string;
  description?: string;
}

const CurrentWeatherCard = ({ temperature, location, date, icon, description }: CurrentWeatherCardProps) => {
  const { units } = useUnits();
  
  return (
    <div className="h-auto sm:h-80">
      <div className="relative h-full rounded-xl overflow-hidden">
        {/* Background Images */}
        <img
          src="/assets/images/bg-today-large.svg"
          alt="Weather background"
          className="hidden sm:block w-full h-full object-cover rounded-xl"
        />
        <img
          src="/assets/images/bg-today-small.svg"
          alt="Weather background"
          className="block sm:hidden w-full h-full object-cover rounded-xl"
        />
        
        {/* Overlay container for mobile stacking */}
        <div className="absolute inset-0 flex flex-col sm:block items-center justify-center p-6 sm:p-0">
          {/* Left Content */}
          <div className="
            sm:absolute sm:left-10 sm:top-1/2 sm:transform sm:-translate-y-1/2
            text-center sm:text-left
            mb-6 sm:mb-0
          ">
            <h1 className="text-2xl font-semibold text-white">
              {location}
            </h1>
            <p className="mt-2 text-white">{date}</p>
            {description && (
              <p className="mt-1 text-gray-300 text-sm">{description}</p>
            )}
          </div>
          
          {/* Right Content - WITH SPACE AROUND */}
          <div className="
            sm:absolute sm:right-10 sm:top-1/2 sm:transform sm:-translate-y-1/2
            flex items-center justify-around
            text-center
            space-x-4 sm:space-x-6 /* Horizontal space between icon and temp */
            px-4 sm:px-0 /* Horizontal padding for mobile */
            py-3 sm:py-0 /* Vertical padding for mobile */
          ">
            <img src={icon} alt="Weather icon" className="w-20 h-20 sm:w-24 sm:h-24" />
            <p className="text-white text-5xl sm:text-7xl font-semibold font-bricolage">
              {formatTemperature(temperature, units.temperature)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherCard;