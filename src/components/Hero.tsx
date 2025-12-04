import { useState } from "react";
import { AnimatePresence, motion } from 'motion/react';

// Motion v11 variants - NO transition inside variants
const dropdownVariants = {
  hidden: { opacity: 0, y: -10, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -10, scale: 0.95 }
};

const Hero = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const cities = [
    'Berlin, Germany', 'London, UK', 'Paris, France', 'Tokyo, Japan', 'New York, USA', 
  ];

  return (
    <div className="text-center mt-16">
      <h1 className="text-white text-5xl font-semibold mb-10 font-bricolage">
        How's the sky looking today?
      </h1>

      <div className="flex items-center justify-center gap-4">
        
        <motion.div className="flex-1 relative max-w-lg">
          
 <div className={`flex items-center bg-[hsl(243,27%,20%)] px-4 py-3 rounded-lg shadow-lg cursor-pointer transition-all duration-200 ${isInputFocused ? 'focus:ring ring-2 ring-white ring-opacity-50' : ''}`}>
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
                setSearchValue(e.target.value);
                setIsDropdownOpen(true);
              }}
              onBlur={() => {setTimeout(() => setIsDropdownOpen(false), 200)
                setIsInputFocused(false)
              }}
              onFocus={() => {
                setIsDropdownOpen(true);
                setIsInputFocused(true);
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
                // Transition goes HERE, not inside variants
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  duration: 0.2
                }}
                className="absolute top-full left-0 right-0 mt-2 bg-[hsl(243,27%,20%)] rounded-lg shadow-lg z-10 overflow-hidden"
              >
                {cities
                  .filter((city) =>
                    city.toLowerCase().includes(searchValue.toLowerCase())
                  )
                  .map((city, index) => (
                    <motion.button
                      key={city}
                      // Inline animations for items (simpler)
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08, duration: 0.8 }}
                      onClick={() => {
                        setSearchValue(city);
                        setIsDropdownOpen(false);
                      }}
                      
                      className="w-full text-left px-4 py-3 text-gray-300 hover:bg-[hsl(243,27%,25%)] hover:rounded-sm transition-colors text-sm border-[hsl(243,27%,25%)] last:border-b-0"
                    >
                      {city}
                    </motion.button>
                  ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <button className={`bg-[hsl(248,70%,36%)] hover:bg-[hsl(248,70%,40%)] px-6 py-3 rounded-lg text-white font-semibold transition-colors cursor-pointer shadow-lg ${isInputFocused ? 'ring-2 ring-[hsl(233,67%,56%)] ring-opacity-50' : ''}`}>
          Search
        </button>
      </div>
    </div>
  );
};

export default Hero;