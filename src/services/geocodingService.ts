interface GeocodingResult {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

export const geocodeLocation = async (locationName: string): Promise<GeocodingResult> => {
  try {
    // Using Open-Meteo's geocoding API (free, no API key required)
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(locationName)}&count=1&language=en&format=json`
    );
    
    if (!response.ok) {
      throw new Error('Geocoding API error');
    }
    
    const data = await response.json();
    
    if (!data.results || data.results.length === 0) {
      throw new Error('Location not found');
    }
    
    const result = data.results[0];
    return {
      name: result.name,
      country: result.country,
      lat: result.latitude,
      lon: result.longitude,
    };
  } catch (error) {
    console.error('Geocoding error:', error);
    
   
    try {
      const fallbackResponse = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationName)}&format=json&limit=1`
      );
      
      if (!fallbackResponse.ok) {
        throw new Error('Fallback geocoding failed');
      }
      
      const fallbackData = await fallbackResponse.json();
      
      if (!fallbackData || fallbackData.length === 0) {
        throw new Error('Location not found');
      }
      
      const result = fallbackData[0];
      return {
        name: result.display_name.split(',')[0],
        country: result.display_name.split(',').pop()?.trim() || '',
        lat: parseFloat(result.lat),
        lon: parseFloat(result.lon),
      };
    } catch (fallbackError) {
      console.error('Fallback geocoding error:', fallbackError);
      throw new Error(`Could not find location: ${locationName}`);
    }
  }
};