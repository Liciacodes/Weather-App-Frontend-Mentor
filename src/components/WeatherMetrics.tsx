interface WeatherMetricsProps {
  title: string;
  value: string | number;
}

const WeatherMetrics = ({ title, value }: WeatherMetricsProps) => {
  return (
    <div className="bg-[hsl(243,27%,20%)]  shadow rounded-lg p-3">
      <h2 className="text-sm font-medium mb-4 text-[hsl(240,6%,70%)]">
        {title}
      </h2>
      <p className="text-white text-lg">{value}</p>
    </div>
  );
};

export default WeatherMetrics;
