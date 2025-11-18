interface DailyForecastProps {
  day: string;
  icon: string;
  temperature: string | number;
}

const DailyForecast = ({ day, icon, temperature }: DailyForecastProps) => {
  return (
    <div className="bg-[hsl(243,27%,20%)] shadow rounded-lg p-3 text-center">
      <h2 className="text-md font-semibold mb-2 text-[hsl(0,0%,100%)]">{day}</h2>
      <img src={icon} alt={`${day} weather icon`} className="mx-auto mb-2" />
      <div className="flex items-center jgap-x- 6 justify-between">
         <p className="text-white">{temperature}</p>
          <p className="text-white">{temperature}</p>
      </div>
     
    </div>
  );
};

export default DailyForecast;