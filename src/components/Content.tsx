import CurrentWeatherCard from "./CurrentWeatherCard";
import DailyForecast from "./DailyForecast";
import HourlyForecast from "./HourlyForecast";
import WeatherMetrics from "./WeatherMetrics";

const Content = () => {
  return (
    <section className="mx-auto px-20 mt-8 ">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Takes 2/3 on desktop */}
        <div className="lg:col-span-2 space-y-6">
          <CurrentWeatherCard />
          
          {/* Weather Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <WeatherMetrics title="Feels Like" value="18°" />
            <WeatherMetrics title="Humidity" value="46%" />
            <WeatherMetrics title="Wind" value="14 km/h" />
            <WeatherMetrics title="Precipitation" value="0 mm" />
          </div>

          <div className="mt-6">
            <h1 className="text-white text-lg py-4">Daily Forecast</h1>
            <div className="grid grid-cols-2 md:grid-cols-7 gap-2">
          <DailyForecast day="Mon" icon="/assets/images/icon-sunny.webp" temperature="22°" />
          <DailyForecast day="Tue" icon="/assets/images/icon-overcast.webp" temperature="18°" />
          <DailyForecast day="Wed" icon="/assets/images/icon-drizzle.webp" temperature="20°" />
            <DailyForecast day="Thu" icon="/assets/images/icon-fog.webp" temperature="24°" />
            <DailyForecast day="Fri" icon="/assets/images/icon-partly-cloudy.webp" temperature="19°" />
            <DailyForecast day="Sat" icon="/assets/images/icon-rain.webp" temperature="0°" />
            <DailyForecast day="Sun" icon="/assets/images/icon-storm.webp" temperature="21°" />
          </div>

          </div>

          {/* <DailyForecast /> */}
        </div>

        {/* Right Column - Takes 1/3 on desktop */}
        <div className="lg:col-span-1">
            <HourlyForecast />
        </div>
      </div>
    </section>
  );
};

export default Content;