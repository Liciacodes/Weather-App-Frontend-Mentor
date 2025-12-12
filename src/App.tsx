// App.tsx - UPDATED WITH SOUNDS
import { useState, useEffect } from 'react';
import { UnitsProvider, useUnits } from './context/UnitsContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Content from './components/Content';
import LoadingSkeleton from './components/LoadingSkeleton';
import NoResults from './components/NoResult';
import ErrorState from './components/ErrorState';
import SimpleSoundPlayer from './components/SimpleSoundPlayer'; // NEW IMPORT
import { fetchWeatherData } from './services/weatherServices';
import type { WeatherData } from './services/weatherServices';

interface Location {
  lat: number;
  lon: number;
  name: string;
}

// Geocoding function
const geocodeLocation = async (locationName: string): Promise<{name: string; country: string; lat: number; lon: number}> => {
  try {
    console.log(`Attempting to geocode: ${locationName}`);
    
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(locationName)}&count=5&language=en&format=json`
    );
    
    console.log('Geocoding response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`Geocoding API error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Geocoding API response:', data);
    
    if (!data.results || data.results.length === 0) {
      console.log('No results from Open-Meteo, trying fallback...');
      throw new Error('Location not found in Open-Meteo');
    }
    
    const result = data.results[0];
    console.log('Selected result:', result);
    
    return {
      name: result.name,
      country: result.country || result.country_code || '',
      lat: result.latitude,
      lon: result.longitude,
    };
  } catch (error) {
    console.error('Open-Meteo geocoding error:', error);
    
    // Fallback to Nominatim
    try {
      console.log('Trying Nominatim fallback...');
      const fallbackResponse = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationName)}&format=json&limit=1&addressdetails=1`
      );
      
      console.log('Nominatim response status:', fallbackResponse.status);
      
      if (!fallbackResponse.ok) {
        throw new Error(`Nominatim error: ${fallbackResponse.status}`);
      }
      
      const fallbackData = await fallbackResponse.json();
      console.log('Nominatim response:', fallbackData);
      
      if (!fallbackData || fallbackData.length === 0) {
        throw new Error('Location not found in Nominatim either');
      }
      
      const result = fallbackData[0];
      return {
        name: result.display_name.split(',')[0],
        country: result.address?.country || result.address?.state || '',
        lat: parseFloat(result.lat),
        lon: parseFloat(result.lon),
      };
    } catch (fallbackError) {
      console.error('Fallback geocoding error:', fallbackError);
      throw new Error(`Could not find location: ${locationName}`);
    }
  }
};

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
  const [location, setLocation] = useState<Location>(DEFAULT_LOCATIONS['Berlin, Germany']);
  const [showNoResults, setShowNoResults] = useState(false);
  const [hasApiError, setHasApiError] = useState(false);

  // Fetch weather data
  useEffect(() => {
    const loadWeatherData = async () => {
      setIsLoading(true);
      setError(null);
      setShowNoResults(false);
      setHasApiError(false);
      
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
        
        // Check if it's an API error (404, 500, etc.)
        if (err instanceof Error && err.message.includes('Weather API error')) {
          setHasApiError(true);
          setError('Weather service is currently unavailable. Please try again later.');
          // Don't try to get default data for API errors
        } else {
          // For other errors (network, parsing), show error but try default
          setError('Failed to load weather data. Please try again.');
          
          try {
            // Try to get default data as fallback
            const defaultData = await fetchWeatherData(
              location.lat,
              location.lon,
              units.temperature,
              units.wind,
              units.precipitation,
              location.name
            );
            setWeatherData(defaultData);
          } catch (defaultError) {
            console.error('Failed to load default weather data:', defaultError);
            // If default also fails, show API error
            setHasApiError(true);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadWeatherData();
  }, [location, units]);

  const handleLocationSelect = async (selectedLocation: string, hasResults: boolean = true) => {
    console.log('handleLocationSelect called with:', selectedLocation, 'hasResults:', hasResults);
    
    // Reset states
    setError(null);
    setShowNoResults(false);
    setHasApiError(false);
    
    if (!hasResults) {
      setError(`No weather data found for "${selectedLocation}"`);
      setShowNoResults(true);
      return;
    }

    setIsLoading(true);
    
    try {
      let locationData: Location;
      
      const normalizedLocation = selectedLocation.trim();
      console.log('Normalized location:', normalizedLocation);
      
      if (DEFAULT_LOCATIONS[normalizedLocation]) {
        console.log('Using predefined location');
        locationData = DEFAULT_LOCATIONS[normalizedLocation];
      } else {
        console.log('Attempting to geocode new location');
        const geocoded = await geocodeLocation(normalizedLocation);
        console.log('Geocoded result:', geocoded);
        
        locationData = {
          lat: geocoded.lat,
          lon: geocoded.lon,
          name: geocoded.country ? `${geocoded.name}, ${geocoded.country}` : geocoded.name
        };
        
        console.log('Final location data:', locationData);
      }
      
      setLocation(locationData);
    } catch (err) {
      console.error('Location error:', err);
      setError(`Could not find "${selectedLocation}". Try a different location.`);
      setShowNoResults(true);
      setIsLoading(false);
    }
  };

  // Function to retry fetching weather data
  const handleRetry = () => {
    setHasApiError(false);
    // Trigger a reload by updating location state
    setLocation(prev => ({ ...prev }));
  };

  // If there's an API error, show only Header and ErrorState
  if (hasApiError) {
    return (
      <div className="min-h-screen bg-[#0B0F2F]">
        <Header />
        <ErrorState onRetry={handleRetry} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F2F]">
      <Header />
      
      
      {weatherData && !isLoading && (
      <SimpleSoundPlayer 
        weatherCode={weatherData.current.weatherCode}   
      />
    )}
    

      <Hero 
        onLocationSelect={handleLocationSelect}
        setNoResults={(hasNoResults) => {
          if (hasNoResults) {
            setError('No results found for your search.');
            setShowNoResults(true);
          }
        }}
      />
      
   
     

    
      {showNoResults && <NoResults />}

      {/* Loading or Content */}
      {isLoading ? (
        <LoadingSkeleton />
      ) : weatherData && !showNoResults ? (
        <Content 
          weatherData={{
            location: weatherData.location,
            current: {
              temperature: weatherData.current.temperature,
              feelsLike: weatherData.current.feelsLike,
              humidity: weatherData.current.humidity,
              windSpeed: weatherData.current.windSpeed,
              precipitation: weatherData.current.precipitation,
              pressure: weatherData.current.pressure,
              visibility: weatherData.current.visibility,
              description: weatherData.current.description,
              icon: weatherData.current.icon,
            },
            daily: weatherData.daily,
            hourly: weatherData.hourly,
          }}
          isLoading={isLoading}
        />
      ) : !showNoResults ? (
        <div className="mx-auto px-4 sm:px-20 mt-10 text-center">
          <p className="text-white">No weather data available. Please try searching for a location.</p>
        </div>
      ) : null}
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