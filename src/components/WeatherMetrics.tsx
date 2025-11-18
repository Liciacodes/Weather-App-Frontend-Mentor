interface WeatherMetricsProps {
  title: string;
  value: string | number;
}

const WeatherMetrics = ({ title, value }: WeatherMetricsProps) => {
  return (
    <div className="bg-[hsl(243,27%,20%)]  shadow rounded-lg p-3">
      <h2 className="text-md font-semibold mb-4 text-[hsl(0,0%,100%)]">
        {title}
      </h2>
      <p className="text-white">{value}</p>
    </div>
  );
};

export default WeatherMetrics;
