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
  onLocationSelect?: (location: string, hasResults: boolean) => void; // Optional
}

const Hero = ({ setNoResults, onLocationSelect }: HeroProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [hasApiError, setHasApiError] = useState(false);

  const cities = [
    'Berlin, Germany', 'London, UK', 'Paris, France', 'Tokyo, Japan', 'New York, USA', 
  ];

  useEffect(() => {
    // If search is empty, show all cities immediately
    if (searchValue.trim() === '') {
      setFilteredCities(cities);
      setIsSearching(false);
      return;
    }

    // Start searching
    setIsSearching(true);
    
    const searchTimeout = setTimeout(() => {
      const filtered = cities.filter(city => 
        city.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredCities(filtered);
      setIsSearching(false);
    }, 500);

    return () => clearTimeout(searchTimeout);
  }, [searchValue]);

  if (hasApiError) {
    return <ErrorState/>;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    
    // Open dropdown when typing
    if (!isDropdownOpen) {
      setIsDropdownOpen(true);
    }
    
    // If there's text, ensure dropdown is open
    if (value.trim() !== '') {
      setIsDropdownOpen(true);
    }
  };

  // Handle city selection from dropdown
  const handleCitySelect = (city: string) => {
    setSearchValue(city);
    setIsDropdownOpen(false);
    setNoResults(false); 
    
    // If you want to pass the location up to App
    if (onLocationSelect) {
      onLocationSelect(city, true);
    }
  };

  // Handle search button click
  const handleSearchClick = () => {
    if (searchValue.trim() === '') return;
    
    setIsSearching(true);
    
    // Simulate API call/search
    setTimeout(() => {
      const hasResults = cities.some(city => 
        city.toLowerCase().includes(searchValue.toLowerCase())
      );
      
      if (hasResults) {
        // If results found, select the first matching city
        const matchedCity = cities.find(city => 
          city.toLowerCase().includes(searchValue.toLowerCase())
        );
        if (matchedCity) {
          setSearchValue(matchedCity);
          setNoResults(false);
          if (onLocationSelect) {
            onLocationSelect(matchedCity, true);
          }
        }
      } else {
        // No results found
        setNoResults(true);
        if (onLocationSelect) {
          onLocationSelect(searchValue, false);
        }
      }
      
      setIsSearching(false);
      setIsDropdownOpen(false);
    }, 800);
  };

  return (
    <div className="text-center mt-16">
      <h1 className="text-white text-5xl font-semibold mb-10 font-bricolage">
        How's the sky looking today?
      </h1>

      <div className="flex items-center justify-center gap-4">
        
        <div className="flex-1 relative max-w-lg">
          
          <div className={`flex items-center bg-[hsl(243,27%,20%)] px-4 py-3 rounded-lg shadow-lg cursor-pointer transition-all duration-200 ${isInputFocused ? 'ring-2 ring-white ring-opacity-50' : ''}`}>
            <img
              src="/assets/images/icon-search.svg"
              alt="Search icon"
              className="w-5 h-5 opacity-80 mr-3"
            />
            <input
              type="search"
              placeholder="Search for a place..."
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
              className="flex-1 bg-transparent text-white placeholder:text-white placeholder:opacity-60 focus:outline-none text-lg"
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
                className="absolute top-full left-0 right-0 mt-2 bg-[hsl(243,27%,20%)] rounded-lg shadow-lg z-10 overflow-hidden min-h-20"
              >
                {/* SHOW SPINNER WHEN SEARCHING */}
                {isSearching ? (
                  <div className="px-4 flex items-center p-4">
                    <div className="w-4 h-4 border-4 border-dotted border-[hsl(250,6%,84%)] border-t-transparent rounded-full animate-spin mr-3"></div>
                    <p className="text-white text-sm font-medium">Searching...</p>
                  </div>
                ) : filteredCities.length > 0 ? (
                  // SHOW FILTERED RESULTS WHEN NOT SEARCHING
                  filteredCities.map((city, index) => (
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
                  ))
                ) : searchValue.trim() === '' ? (
                  // SHOW ALL CITIES WHEN NO SEARCH
                  cities.map((city, index) => (
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
                  ))
                ) : (
                
                  <div className="py-6 text-center">
                    <p className="text-gray-400 text-sm">No places found for "{searchValue}"</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button 
          onClick={handleSearchClick}
          className={`bg-[hsl(248,70%,36%)] hover:bg-[hsl(248,70%,40%)] px-6 py-3 rounded-lg text-white font-semibold transition-colors cursor-pointer shadow-lg ${isInputFocused ? 'ring-2 ring-[hsl(233,67%,56%)] ring-opacity-50' : ''} ${isSearching ? 'opacity-70 cursor-not-allowed' : ''}`}
          disabled={isSearching}
        >
          {isSearching ? 'Searching...' : 'Search'}
        </button>
      </div>
    </div>
  );
};

export default Hero;