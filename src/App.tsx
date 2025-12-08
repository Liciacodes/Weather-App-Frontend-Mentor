// App.tsx - FINAL VERSION
import { useState, useEffect } from 'react';
import { UnitsProvider, useUnits } from './context/UnitsContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Content from './components/Content';
import LoadingSkeleton from './components/LoadingSkeleton';
import { fetchWeatherData } from './services/weatherServices';
import type { WeatherData } from './services/weatherServices';

// Define location type
interface Location {
  lat: number;
  lon: number;
  name: string;
}

// Default locations
const DEFAULT_LOCATIONS: Record<string, Location> = {
  'Berlin, Germany': { lat: 52.52, lon: 13.41, name: 'Berlin, Germany' },
  'London, UK': { lat: 51.51, lon: -0.13, name: 'London, UK' },
  'Paris, France': { lat: 48.85, lon: 2.35, name: 'Paris, France' },
  'Tokyo, Japan': { lat: 35.68, lon: 139.76, name: 'Tokyo, Japan' },
  'New York, USA': { lat: 40.71, lon: -74.01, name: 'New York, USA' },
};

// Main App Component
const AppContent = () => {
  const { units } = useUnits();
  const [isLoading, setIsLoading] = useState(true);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<Location>(DEFAULT_LOCATIONS['London, UK']);

  // Fetch weather data
  useEffect(() => {
    const loadWeatherData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        console.log('Fetching weather for:', location.name);
        const data = await fetchWeatherData(
          location.lat,
          location.lon,
          units.temperature,
          units.wind,
          units.precipitation,
          location.name
        );
        
        console.log('Weather data received:', data);
        setWeatherData(data);
      } catch (err) {
        console.error('Failed to load weather data:', err);
        setError('Failed to load weather data. Please try again.');
        // Even on error, fetchWeatherData returns default data
        const defaultData = await fetchWeatherData(
          location.lat,
          location.lon,
          units.temperature,
          units.wind,
          units.precipitation,
          location.name
        );
        setWeatherData(defaultData);
      } finally {
        setIsLoading(false);
      }
    };

    loadWeatherData();
  }, [location, units]);

  const handleLocationSelect = (selectedLocation: string, hasResults: boolean = true) => {
    if (!hasResults) {
      setError(`No weather data found for "${selectedLocation}"`);
      return;
    }

    // Check if it's a known location
    if (DEFAULT_LOCATIONS[selectedLocation]) {
      setLocation(DEFAULT_LOCATIONS[selectedLocation]);
      setError(null);
    } else {
      // Try to find a matching location
      const foundLocation = Object.keys(DEFAULT_LOCATIONS).find(
        loc => loc.toLowerCase().includes(selectedLocation.toLowerCase())
      );
      
      if (foundLocation) {
        setLocation(DEFAULT_LOCATIONS[foundLocation]);
        setError(null);
      } else {
        setError(`Location "${selectedLocation}" not found. Try Berlin, London, Paris, Tokyo, or New York.`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F2F]">
      <Header />
      <Hero 
        onLocationSelect={handleLocationSelect}
        setNoResults={(hasNoResults) => {
          if (hasNoResults) {
            setError('No results found for your search.');
          }
        }}
      />
      
      {/* Error Message */}
      {error && (
        <div className="mx-auto px-4 sm:px-20 mt-4">
          <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 px-4 py-3 rounded-lg">
            {error}
          </div>
        </div>
      )}

      {/* Loading or Content */}
      {isLoading ? (
        <LoadingSkeleton />
      ) : weatherData ? (
        // In App.tsx, update the Content component call
<Content 
  weatherData={{
    location: weatherData.location, // Pass location
    current: {
      temperature: weatherData.current.temperature,
      feelsLike: weatherData.current.feelsLike,
      humidity: weatherData.current.humidity,
      windSpeed: weatherData.current.windSpeed,
      precipitation: weatherData.current.precipitation,
      pressure: weatherData.current.pressure,
      visibility: weatherData.current.visibility,
      description: weatherData.current.description,
      icon: weatherData.daily[0]?.icon || "/assets/images/icon-sunny.webp", // Use first day's icon or default
    },
    daily: weatherData.daily,
    hourly: weatherData.hourly,
  }}
  isLoading={isLoading}
/>
      ) : (
        <div className="mx-auto px-4 sm:px-20 mt-10 text-center">
          <p className="text-white">No weather data available. Please try searching for a location.</p>
        </div>
      )}
    </div>
  );
};

// App wrapper with Providers
function App() {
  return (
    <UnitsProvider>
      <AppContent />
    </UnitsProvider>
  );
}

export default App;