import { useState } from "react";

const Hero = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const cities = [
    'Berlin, Germany', 'London, UK', 'Paris, France', 'Tokyo, Japan', 'New York, USA', 
  ]

  return (
    <div className="text-center mt-16">
      <h1 className="text-white text-5xl font-semibold mb-10 font-bricolage">
        How's the sky looking today?
      </h1>

      <div className="flex items-center justify-center gap-4">
        
        {/* Search Input Container */}
        <div className="flex-1 relative max-w-lg">
          
          {/* Search Input */}
          <div className="flex items-center bg-[hsl(243,27%,20%)] px-4 py-3 rounded-lg shadow-lg cursor-pointer">
            <img
              src="/assets/images/icon-search.svg"
              alt="Search icon"
              className="w-5 h-5 opacity-80 mr-3"
            />
            <input
              type="search"
              placeholder="Search for a place..."
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value)
                setIsDropdownOpen(true)
              }}
               onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
              onFocus={() => setIsDropdownOpen(true)}
              className="flex-1 bg-transparent text-white placeholder:text-white placeholder:opacity-60 focus:outline-none text-lg"
            />
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-[hsl(243,27%,20%)] rounded-lg shadow-lg z-10 overflow-hidden">
              {cities
                .filter((city) =>
                  city.toLowerCase().includes(searchValue.toLowerCase())
                )
                .map((city) => (
                  <button
                    key={city}
                    onClick={() => {
                      setSearchValue(city);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 text-gray-300 hover:bg-[hsl(243,27%,25%)] hover:rounded-sm transition-colors text-sm  border-[hsl(243,27%,25%)] last:border-b-0"
                  >
                    {city}
                  </button>
                ))}
            </div>
          )}
        </div>

        {/* Search Button */}
        <button className="bg-[hsl(248,70%,36%)] hover:bg-[hsl(248,70%,40%)] px-6 py-3 rounded-lg text-[hsl(240,6%,70%)] font-semibold transition-colors cursor-pointer shadow-lg">
          Search
        </button>
      </div>
    </div>
  );
};

export default Hero;