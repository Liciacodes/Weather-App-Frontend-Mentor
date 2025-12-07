const LoadingSkeleton = () => {
  return (
    <section className="mx-auto px-20 mt-10 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Weather Card Skeleton */}
          <div className="max-w-8xl w-full h-80 bg-[hsl(243,23%,24%)] rounded-xl flex flex-col justify-center items-center">
            <div className="w-8 h-8 border-dotted border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white mt-2"> Loading...</p>
          </div>

          {/* Weather Metrics - 4 cards exactly */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Feels Like", "Humidity", "Wind", "Precipitation"].map((title) => (
              <div key={title} className="bg-[hsl(243,27%,20%)] shadow rounded-lg p-3">
                <h2 className="text-sm font-medium mb-4 text-[hsl(240,6%,70%)]">{title}</h2>
                <p className="text-white text-lg">-</p>
              </div>
            ))}
          </div>

          {/* Daily Forecast - 7 days exactly */}
          <div className="mt-6 ">
            <p className="text-white mb-4">Daily Forecast</p>
            <div className="grid grid-cols-2 md:grid-cols-7 gap-3 h-24">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <div key={day} className="bg-[hsl(243,27%,20%)] shadow rounded-lg p-4 text-center space-y-3"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Hourly Forecast */}
        <div className="lg:col-span-1">
          <div className="bg-[hsl(243,27%,20%)] rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white font-semibold text-lg">Hourly forecast</h3>
              
              {/* Select dropdown skeleton */}
              <select name="" id="" className="bg-[hsl(243,23%,24%)] border-[0.5px] border-[hsl(243,23%,30%)] rounded px-3 py-1 w-24 h-8 text-white"
              value={'-'}>
                <option value="-" className="text-white"></option>
              </select>
            
            </div>
            
            <div className="space-y-6">
              {["Now", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM"].map((time) => (
                <div key={time} className="flex items-center justify-between py-2">
                  <div className="h-4 bg-[hsl(243,23%,24%)] rounded w-16"></div>
                  <div className="w-8 h-8 bg-[hsl(243,23%,24%)] rounded-full"></div>
                  <div className="h-5 bg-[hsl(243,23%,24%)] rounded w-12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoadingSkeleton;