// services/weatherService.ts - SAFE VERSION
import type{ TemperatureUnit, WindUnit, PrecipitationUnit } from '../context/UnitsContext';

export interface WeatherData {
  location: string;
  current: {
    temperature: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    precipitation: number;
    pressure: number;
    visibility: number;
    weatherCode: number;
    description: string;
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
}

// Helper to safely convert values
const safeNumber = (value: any, defaultValue: number = 0): number => {
  if (value === null || value === undefined || isNaN(Number(value))) {
    return defaultValue;
  }
  return Number(value);
};

// Map weather codes to icons
const weatherCodeMap: Record<number, string> = {
  0: '/assets/images/icon-sunny.webp',
  1: '/assets/images/icon-partly-cloudy.webp',
  2: '/assets/images/icon-partly-cloudy.webp',
  3: '/assets/images/icon-overcast.webp',
  45: '/assets/images/icon-fog.webp',
  48: '/assets/images/icon-fog.webp',
  51: '/assets/images/icon-drizzle.webp',
  53: '/assets/images/icon-drizzle.webp',
  55: '/assets/images/icon-drizzle.webp',
  56: '/assets/images/icon-drizzle.webp',
  57: '/assets/images/icon-drizzle.webp',
  61: '/assets/images/icon-rain.webp',
  63: '/assets/images/icon-rain.webp',
  65: '/assets/images/icon-rain.webp',
  66: '/assets/images/icon-rain.webp',
  67: '/assets/images/icon-rain.webp',
  71: '/assets/images/icon-snow.webp',
  73: '/assets/images/icon-snow.webp',
  75: '/assets/images/icon-snow.webp',
  77: '/assets/images/icon-snow.webp',
  80: '/assets/images/icon-rain.webp',
  81: '/assets/images/icon-rain.webp',
  82: '/assets/images/icon-rain.webp',
  85: '/assets/images/icon-snow.webp',
  86: '/assets/images/icon-snow.webp',
  95: '/assets/images/icon-storm.webp',
  96: '/assets/images/icon-storm.webp',
  99: '/assets/images/icon-storm.webp',
};

export const fetchWeatherData = async (
  lat: number = 52.52,
  lon: number = 13.41,
  temperatureUnit: TemperatureUnit = 'celsius',
  windUnit: WindUnit = 'kmh',
  precipitationUnit: PrecipitationUnit = 'mm',
  locationName: string = 'Berlin, Germany'
): Promise<WeatherData> => {
  try {
    // Convert our unit types to Open-Meteo API unit parameters
    const tempUnitParam = temperatureUnit === 'celsius' ? 'celsius' : 'fahrenheit';
    const windUnitParam = windUnit === 'kmh' ? 'kmh' : 'mph';
    const precipUnitParam = precipitationUnit === 'mm' ? 'mm' : 'inch';

    // Build the API URL
    const url = new URL('https://api.open-meteo.com/v1/forecast');
    url.searchParams.append('latitude', lat.toString());
    url.searchParams.append('longitude', lon.toString());
    url.searchParams.append('current', 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,pressure_msl,visibility,wind_speed_10m,weather_code');
    url.searchParams.append('hourly', 'temperature_2m,weather_code');
    url.searchParams.append('daily', 'weather_code,temperature_2m_max,temperature_2m_min');
    url.searchParams.append('temperature_unit', tempUnitParam);
    url.searchParams.append('wind_speed_unit', windUnitParam);
    url.searchParams.append('precipitation_unit', precipUnitParam);
    url.searchParams.append('timezone', 'auto');
    url.searchParams.append('forecast_days', '7');

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data = await response.json();

    // Safely extract current weather data
    const current = data.current || {};
    
    // Format current weather
    const currentWeatherCode = safeNumber(current.weather_code, 0);
    const currentIcon = weatherCodeMap[currentWeatherCode] || '/assets/images/icon-sunny.webp';

    // Format daily forecast
    const dailyTime = data.daily?.time || [];
    const dailyForecast = dailyTime.slice(0, 7).map((date: string, index: number) => {
      const day = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
      const weatherCode = safeNumber(data.daily?.weather_code?.[index], 0);
      const icon = weatherCodeMap[weatherCode] || '/assets/images/icon-sunny.webp';
      
      return {
        day,
        icon,
        highTemp: safeNumber(data.daily?.temperature_2m_max?.[index], 20 + index),
        lowTemp: safeNumber(data.daily?.temperature_2m_min?.[index], 15 + index),
      };
    });

    // Format hourly forecast (next 8 hours)
    const now = new Date();
    const hourlyTime = data.hourly?.time || [];
    const hourlyForecast = hourlyTime
      .map((time: string, index: number) => {
        const hourTime = new Date(time);
        const hoursDiff = Math.floor((hourTime.getTime() - now.getTime()) / (1000 * 60 * 60));
        
        // Only show next 24 hours
        if (hoursDiff >= 0 && hoursDiff <= 24) {
          const hour = hourTime.getHours();
          const period = hour >= 12 ? 'PM' : 'AM';
          const displayHour = hour % 12 || 12;
          const weatherCode = safeNumber(data.hourly?.weather_code?.[index], 0);
          const icon = weatherCodeMap[weatherCode] || '/assets/images/icon-sunny.webp';
          
          return {
            time: `${displayHour} ${period}`,
            icon,
            temp: safeNumber(data.hourly?.temperature_2m?.[index], 20),
          };
        }
        return null;
      })
      .filter((hour: any) => hour !== null)
      .slice(0, 8);

    return {
      location: locationName,
      current: {
        temperature: Math.round(safeNumber(current.temperature_2m, 20)),
        feelsLike: Math.round(safeNumber(current.apparent_temperature, 18)),
        humidity: Math.round(safeNumber(current.relative_humidity_2m, 50)),
        windSpeed: Math.round(safeNumber(current.wind_speed_10m, 10)),
        precipitation: safeNumber(current.precipitation, 0),
        pressure: Math.round(safeNumber(current.pressure_msl, 1013)),
        visibility: Math.round(safeNumber(current.visibility, 10000)),
        weatherCode: currentWeatherCode,
        description: 'Clear sky', // You can add descriptions if needed
      },
      daily: dailyForecast,
      hourly: hourlyForecast.length > 0 ? hourlyForecast : [
        { time: "3 PM", icon: currentIcon, temp: safeNumber(current.temperature_2m, 20) },
        { time: "4 PM", icon: currentIcon, temp: safeNumber(current.temperature_2m, 20) },
        { time: "5 PM", icon: currentIcon, temp: safeNumber(current.temperature_2m, 20) },
        { time: "6 PM", icon: currentIcon, temp: safeNumber(current.temperature_2m, 19) },
        { time: "7 PM", icon: currentIcon, temp: safeNumber(current.temperature_2m, 18) },
        { time: "8 PM", icon: currentIcon, temp: safeNumber(current.temperature_2m, 18) },
        { time: "9 PM", icon: currentIcon, temp: safeNumber(current.temperature_2m, 17) },
        { time: "10 PM", icon: currentIcon, temp: safeNumber(current.temperature_2m, 17) },
      ]
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    // Return default data on error
    return {
      location: locationName,
      current: {
        temperature: 20,
        feelsLike: 18,
        humidity: 50,
        windSpeed: 10,
        precipitation: 0,
        pressure: 1013,
        visibility: 10000,
        weatherCode: 0,
        description: 'Clear sky'
      },
      daily: [
        { day: "Mon", icon: "/assets/images/icon-sunny.webp", highTemp: 22, lowTemp: 15 },
        { day: "Tue", icon: "/assets/images/icon-partly-cloudy.webp", highTemp: 21, lowTemp: 14 },
        { day: "Wed", icon: "/assets/images/icon-overcast.webp", highTemp: 19, lowTemp: 13 },
        { day: "Thu", icon: "/assets/images/icon-drizzle.webp", highTemp: 18, lowTemp: 12 },
        { day: "Fri", icon: "/assets/images/icon-rain.webp", highTemp: 17, lowTemp: 11 },
        { day: "Sat", icon: "/assets/images/icon-fog.webp", highTemp: 20, lowTemp: 13 },
        { day: "Sun", icon: "/assets/images/icon-storm.webp", highTemp: 21, lowTemp: 14 },
      ],
      hourly: [
        { time: "3 PM", icon: "/assets/images/icon-sunny.webp", temp: 20 },
        { time: "4 PM", icon: "/assets/images/icon-sunny.webp", temp: 20 },
        { time: "5 PM", icon: "/assets/images/icon-partly-cloudy.webp", temp: 19 },
        { time: "6 PM", icon: "/assets/images/icon-partly-cloudy.webp", temp: 18 },
        { time: "7 PM", icon: "/assets/images/icon-overcast.webp", temp: 17 },
        { time: "8 PM", icon: "/assets/images/icon-overcast.webp", temp: 16 },
        { time: "9 PM", icon: "/assets/images/icon-drizzle.webp", temp: 15 },
        { time: "10 PM", icon: "/assets/images/icon-drizzle.webp", temp: 15 },
      ]
    };
  }
};