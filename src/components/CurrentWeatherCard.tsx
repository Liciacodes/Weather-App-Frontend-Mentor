const CurrentWeatherCard = () => {
  return (
    <div className=" mt-10">
      <div className="relative max-w-8xl"> {/* Use max-width instead */}
        <img
          src="/assets/images/bg-today-large.svg"
          alt="Location Icon"
          className="w-full"
        />
        
        {/* Left Content */}
        <div className="absolute left-10 top-1/2 transform -translate-y-1/2">
          <h1 className="text-2xl font-semibold text-white">
            Berlin, Germany
          </h1>
          <p className="mt-2 text-white">Tuesday, Aug 5, 2025</p>
        </div>
        
        {/* Right Content */}
        <div className="flex items-center absolute right-10 top-1/2 transform -translate-y-1/2 text-center">
          <img src="/assets/images/icon-sunny.webp" alt="Sun" className="w-24 h-24" />
          <p className="text-white text-7xl font-semibold mt-2 font-bricolage">20°</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherCard;