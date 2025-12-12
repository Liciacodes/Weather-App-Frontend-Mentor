import { useEffect, useState } from "react";
import { AnimatePresence, motion } from 'motion/react';
import ErrorState from "./ErrorState";

// Motion v11 variants
const dropdownVariants = {
  hidden: { opacity: 0, y: -10, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -10, scale: 0.95 }
};

// Define props interface
interface HeroProps {
  setNoResults: (value: boolean) => void;
  onLocationSelect: (location: string, hasResults: boolean) => void;
}

const Hero = ({ setNoResults, onLocationSelect }: HeroProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [hasApiError, setHasApiError] = useState(false);
  const [geocodeSuggestions, setGeocodeSuggestions] = useState<string[]>([]);
  const [isGeocoding, setIsGeocoding] = useState(false);

  const cities = [
    'Berlin, Germany', 'London, UK', 'Paris, France', 'Tokyo, Japan', 'New York, USA', 
  ];

 
  const fetchGeocodeSuggestions = async (query: string) => {
    if (!query.trim()) return [];
    
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`
      );
      
      if (!response.ok) return [];
      
      const data = await response.json();
      
      if (!data.results || data.results.length === 0) return [];
      
    
      return data.results.map((result: any) => {
        return result.country ? `${result.name}, ${result.country}` : result.name;
      });
    } catch (error) {
      console.error('Geocoding suggestion error:', error);
      return [];
    }
  };

  useEffect(() => {
    if (searchValue.trim() === '') {
      setFilteredCities(cities);
      setGeocodeSuggestions([]);
      setIsSearching(false);
      setIsGeocoding(false);
      return;
    }


    setIsSearching(true);
    
    const searchTimeout = setTimeout(async () => {
      const filtered = cities.filter(city => 
        city.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredCities(filtered);
      setIsSearching(false);
      
      if (filtered.length === 0 && searchValue.length >= 2) {
        setIsGeocoding(true);
        const suggestions = await fetchGeocodeSuggestions(searchValue);
        setGeocodeSuggestions(suggestions);
        setIsGeocoding(false);
      } else {
        setGeocodeSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [searchValue]);

  if (hasApiError) {
    return <ErrorState/>;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    
  
    if (!isDropdownOpen) {
      setIsDropdownOpen(true);
    }
    
    
    if (value.trim() !== '') {
      setIsDropdownOpen(true);
    }
  };


  const handleCitySelect = (city: string) => {
    setSearchValue(city);
    setIsDropdownOpen(false);
    setNoResults(false); 
    
  
    onLocationSelect(city, true);
  };

 
  const handleSearchClick = () => {
    const searchTerm = searchValue.trim();
    if (!searchTerm) return;
    
    setIsDropdownOpen(false);
    setNoResults(false);
    
  
    const isPredefinedCity = cities.some(city => 
      city.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (isPredefinedCity) {
      const matchedCity = cities.find(city => 
        city.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (matchedCity) {
        setSearchValue(matchedCity);
        onLocationSelect(matchedCity, true);
      }
    } else {
    
      onLocationSelect(searchTerm, true);
    }
  };

 
  const getDropdownContent = () => {
   
    if (isSearching) {
      return (
        <div className="px-4 flex items-center p-4">
          <div className="w-4 h-4 border-4 border-dotted border-[hsl(250,6%,84%)] border-t-transparent rounded-full animate-spin mr-3"></div>
          <p className="text-white text-sm font-medium">Searching...</p>
        </div>
      );
    }

    
    if (filteredCities.length === 0 && searchValue.trim() !== '') {
      if (isGeocoding) {
        return (
          <div className="px-4 flex items-center p-4">
            <div className="w-4 h-4 border-4 border-dotted border-[hsl(250,6%,84%)] border-t-transparent rounded-full animate-spin mr-3"></div>
            <p className="text-white text-sm font-medium">Finding locations...</p>
          </div>
        );
      }

      if (geocodeSuggestions.length > 0) {
        return (
          <>
            <div className="px-4 py-2 border-b border-[hsl(243,27%,25%)]">
              <p className="text-gray-400 text-sm font-medium">Suggestions</p>
            </div>
            {geocodeSuggestions.map((suggestion, index) => (
              <motion.button
                key={`${suggestion}-${index}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
                onClick={() => handleCitySelect(suggestion)}
                className="w-full text-left px-4 py-3 text-gray-300 hover:bg-[hsl(243,27%,25%)] hover:rounded-sm transition-colors text-sm border-[hsl(243,27%,25%)] last:border-b-0 flex items-center gap-2"
              >
                <span>{suggestion}</span>
              </motion.button>
            ))}
           
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => {
                setIsDropdownOpen(false);
                handleSearchClick();
              }}
              className="w-full text-left px-4 py-3 text-white hover:bg-[hsl(243,27%,25%)] hover:rounded-sm transition-colors text-sm last:border-b-0 flex items-center gap-2 border-t border-[hsl(243,27%,25%)]"
            >
              <img src="/assets/images/icon-search.svg" alt="Search" className="w-4 h-4 opacity-80" />
              <span>Search for "{searchValue}"</span>
            </motion.button>
          </>
        );
      }

   
      return (
        <>
          <div className="px-4 py-2 border-b border-[hsl(243,27%,25%)]">
            <p className="text-gray-400 text-sm font-medium">No exact matches</p>
          </div>
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => {
              setIsDropdownOpen(false);
              handleSearchClick();
            }}
            className="w-full text-left px-4 py-3 text-white hover:bg-[hsl(243,27%,25%)] hover:rounded-sm transition-colors text-sm border-[hsl(243,27%,25%)] last:border-b-0 flex items-center gap-2"
          >
            <img src="/assets/images/icon-search.svg" alt="Search" className="w-4 h-4 opacity-80" />
            <span>Search for "{searchValue}"</span>
          </motion.button>
        </>
      );
    }

  
    if (filteredCities.length > 0) {
      return filteredCities.map((city, index) => (
        <motion.button
          key={city}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05, duration: 0.2 }}
          onClick={() => handleCitySelect(city)}
          className="w-full text-left px-4 py-3 text-gray-300 hover:bg-[hsl(243,27%,25%)] hover:rounded-sm transition-colors text-sm border-[hsl(243,27%,25%)] last:border-b-0"
        >
          {city}
        </motion.button>
      ));
    }

   
    return cities.map((city, index) => (
      <motion.button
        key={city}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05, duration: 0.2 }}
        onClick={() => handleCitySelect(city)}
        className="w-full text-left px-4 py-3 text-gray-300 hover:bg-[hsl(243,27%,25%)] hover:rounded-sm transition-colors text-sm border-[hsl(243,27%,25%)] last:border-b-0"
      >
        {city}
      </motion.button>
    ));
  };

  return (
    <div className="text-center mt-16 px-4 sm:px-0">
      <h1 className="text-white text-6xl sm:text-5xl font-semibold mb-16 sm:mb-10 font-bricolage">
        How's the <span className="block sm:inline">sky looking</span> <span className="block sm:inline">today?</span>
      </h1>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-3xl mx-auto w-full">
        
        <div className="w-full relative max-w-lg">
          
          <div className={`flex items-center bg-[hsl(243,27%,20%)] px-4 py-3 rounded-lg shadow-lg cursor-pointer transition-all duration-200 w-full ${isInputFocused ? 'ring-2 ring-white ring-opacity-50' : ''}`}>
            <img
              src="/assets/images/icon-search.svg"
              alt="Search icon"
              className="w-5 h-5 opacity-80 mr-3"
            />
            <input
              type="search"
              placeholder="Search for a country, city, or place..."
              value={searchValue}
              onChange={handleInputChange}
              onBlur={() => {
                setTimeout(() => setIsDropdownOpen(false), 200);
                setIsInputFocused(false);
              }}
              onFocus={() => {
                setIsDropdownOpen(true);
                setIsInputFocused(true);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearchClick();
                }
              }}
              className="flex-1 bg-transparent text-white placeholder:text-white placeholder:opacity-60 focus:outline-none text-lg w-full"
            />
          </div>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div 
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ 
                  duration: 0.2
                }}
                className="absolute top-full left-0 right-0 mt-2 bg-[hsl(243,27%,20%)] rounded-lg shadow-lg z-10 overflow-hidden max-h-96 overflow-y-auto"
              >
                {getDropdownContent()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button 
          onClick={handleSearchClick}
          className={`bg-[hsl(248,70%,36%)] hover:bg-[hsl(248,70%,40%)] px-6 py-3 rounded-lg text-white font-semibold transition-colors cursor-pointer shadow-lg w-full sm:w-auto ${isInputFocused ? 'ring-2 ring-[hsl(233,67%,56%)] ring-opacity-50' : ''} ${isSearching || isGeocoding ? 'opacity-70 cursor-not-allowed' : ''}`}
          disabled={isSearching || isGeocoding}
        >
          {(isSearching || isGeocoding) ? 'Searching...' : 'Search'}
        </button>
      </div>
    </div>
  );
};

export default Hero;