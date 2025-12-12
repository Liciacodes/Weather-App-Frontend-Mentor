// components/Header.tsx
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUnits } from '../context/UnitsContext';
import type { MouseEvent } from 'react';

const Header = () => {
  const { units, updateTemperature, updateWind, updatePrecipitation } = useUnits();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside as any);
    return () => document.removeEventListener('mousedown', handleClickOutside as any);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickInside = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="bg-[#0B0F2F] text-white">
      <header className="flex justify-between items-center py-6 px-4 sm:px-20 md:px-10">
        <img src="/assets/images/logo.svg" alt="Logo" />

        <div className="relative" ref={dropdownRef}>
          <motion.button
            onClick={toggleDropdown}
            className="flex items-center gap-2 bg-[#2C2F48] text-white rounded-lg px-4 py-2.5 hover:bg-[#363A54] transition-colors"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
          >
            <img src="/assets/images/icon-units.svg" alt="Units icon" />
            <span className="text-sm font-medium">Units</span>
            <motion.svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              animate={{ rotate: isDropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <path d="M19 9l-7 7-7-7" />
            </motion.svg>
          </motion.button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div 
                className="absolute right-0 top-full mt-2 bg-[hsl(243,23%,24%)] rounded-xl shadow-2xl z-50 w-72 border border-[#3A3E5C] overflow-hidden"
                onClick={handleClickInside}
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ 
                  duration: 0.4,
                  ease: "easeOut"
                }}
              >
                <div className="px-4 py-3 border-b border-[#3A3E5C]">
                  <h3 className="text-white font-medium text-sm">Units of measurement</h3>
                </div>

                {/* Temperature */}
                <div className="px-4 py-3 border-b border-[#3A3E5C]">
                  <div className="text-xs text-gray-400 mb-2">Temperature</div>
                  <div className="space-y-2">
                    <motion.button
                      onClick={() => updateTemperature('celsius')}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                        units.temperature === 'celsius' ? 'bg-[#3A3E5C]' : 'hover:bg-[#2C2F48]'
                      }`}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 }}
                      whileHover={{ backgroundColor: 'hsl(243, 23%, 32%)' }}
                    >
                      <span className={units.temperature === 'celsius' ? 'text-white' : 'text-gray-300'}>
                        Celsius (°C)
                      </span>
                      {units.temperature === 'celsius' && (
                        <motion.svg 
                          className="w-4 h-4 text-white" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          viewBox="0 0 24 24"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        >
                          <path d="M5 13l4 4L19 7" />
                        </motion.svg>
                      )}
                    </motion.button>
                    <motion.button
                      onClick={() => updateTemperature('fahrenheit')}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                        units.temperature === 'fahrenheit' ? 'bg-[#3A3E5C]' : 'hover:bg-[#2C2F48]'
                      }`}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      whileHover={{ backgroundColor: 'hsl(243, 23%, 32%)' }}
                    >
                      <span className={units.temperature === 'fahrenheit' ? 'text-white' : 'text-gray-300'}>
                        Fahrenheit (°F)
                      </span>
                      {units.temperature === 'fahrenheit' && (
                        <motion.svg 
                          className="w-4 h-4 text-white" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          viewBox="0 0 24 24"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        >
                          <path d="M5 13l4 4L19 7" />
                        </motion.svg>
                      )}
                    </motion.button>
                  </div>
                </div>

                {/* Wind Speed */}
                <div className="px-4 py-3 border-b border-[#3A3E5C]">
                  <div className="text-xs text-gray-400 mb-2">Wind Speed</div>
                  <div className="space-y-2">
                    <motion.button
                      onClick={() => updateWind('kmh')}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                        units.wind === 'kmh' ? 'bg-[#3A3E5C]' : 'hover:bg-[#2C2F48]'
                      }`}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 }}
                      whileHover={{ backgroundColor: 'hsl(243, 23%, 32%)' }}
                    >
                      <span className={units.wind === 'kmh' ? 'text-white' : 'text-gray-300'}>
                        km/h
                      </span>
                      {units.wind === 'kmh' && (
                        <motion.svg 
                          className="w-4 h-4 text-white" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          viewBox="0 0 24 24"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        >
                          <path d="M5 13l4 4L19 7" />
                        </motion.svg>
                      )}
                    </motion.button>
                    <motion.button
                      onClick={() => updateWind('mph')}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                        units.wind === 'mph' ? 'bg-[#3A3E5C]' : 'hover:bg-[#2C2F48]'
                      }`}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      whileHover={{ backgroundColor: 'hsl(243, 23%, 32%)' }}
                    >
                      <span className={units.wind === 'mph' ? 'text-white' : 'text-gray-300'}>
                        mph
                      </span>
                      {units.wind === 'mph' && (
                        <motion.svg 
                          className="w-4 h-4 text-white" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          viewBox="0 0 24 24"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        >
                          <path d="M5 13l4 4L19 7" />
                        </motion.svg>
                      )}
                    </motion.button>
                  </div>
                </div>

                {/* Precipitation */}
                <div className="px-4 py-3">
                  <div className="text-xs text-gray-400 mb-2">Precipitation</div>
                  <div className="space-y-2">
                    <motion.button
                      onClick={() => updatePrecipitation('mm')}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                        units.precipitation === 'mm' ? 'bg-[#3A3E5C]' : 'hover:bg-[#2C2F48]'
                      }`}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 }}
                      whileHover={{ backgroundColor: 'hsl(243, 23%, 32%)' }}
                    >
                      <span className={units.precipitation === 'mm' ? 'text-white' : 'text-gray-300'}>
                        mm
                      </span>
                      {units.precipitation === 'mm' && (
                        <motion.svg 
                          className="w-4 h-4 text-white" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          viewBox="0 0 24 24"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        >
                          <path d="M5 13l4 4L19 7" />
                        </motion.svg>
                      )}
                    </motion.button>
                    <motion.button
                      onClick={() => updatePrecipitation('inch')}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                        units.precipitation === 'inch' ? 'bg-[#3A3E5C]' : 'hover:bg-[#2C2F48]'
                      }`}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      whileHover={{ backgroundColor: 'hsl(243, 23%, 32%)' }}
                    >
                      <span className={units.precipitation === 'inch' ? 'text-white' : 'text-gray-300'}>
                        in
                      </span>
                      {units.precipitation === 'inch' && (
                        <motion.svg 
                          className="w-4 h-4 text-white" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          viewBox="0 0 24 24"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        >
                          <path d="M5 13l4 4L19 7" />
                        </motion.svg>
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </div>
  );
};

export default Header;