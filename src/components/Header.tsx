// components/Header.tsx
import { useState, useRef, useEffect } from 'react';
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
      <header className="flex justify-between items-center py-6 px-4 sm:px-20">
        <img src="/assets/images/logo.svg" alt="Logo" />

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-2 bg-[#2C2F48] text-white rounded-lg px-4 py-2.5 hover:bg-[#363A54] transition-colors"
          >
            <img src="/assets/images/icon-units.svg" alt="Units icon" />
            <span className="text-sm font-medium">Units</span>
            <svg
              className={`w-3 h-3 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isDropdownOpen && (
            <div 
              className="absolute right-0 top-full mt-2 bg-[hsl(243,23%,24%)] rounded-xl shadow-2xl z-50 w-72 border border-[#3A3E5C] overflow-hidden"
              onClick={handleClickInside}
            >
              <div className="px-4 py-3 border-b border-[#3A3E5C]">
                <h3 className="text-white font-medium text-sm">Units of measurement</h3>
              </div>

              {/* Temperature */}
              <div className="px-4 py-3 border-b border-[#3A3E5C]">
                <div className="text-xs text-gray-400 mb-2">Temperature</div>
                <div className="space-y-2">
                  <button
                    onClick={() => updateTemperature('celsius')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                      units.temperature === 'celsius' ? 'bg-[#3A3E5C]' : 'hover:bg-[#2C2F48]'
                    }`}
                  >
                    <span className={units.temperature === 'celsius' ? 'text-white' : 'text-gray-300'}>
                      Celsius (°C)
                    </span>
                    {units.temperature === 'celsius' && <CheckIcon />}
                  </button>
                  <button
                    onClick={() => updateTemperature('fahrenheit')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                      units.temperature === 'fahrenheit' ? 'bg-[#3A3E5C]' : 'hover:bg-[#2C2F48]'
                    }`}
                  >
                    <span className={units.temperature === 'fahrenheit' ? 'text-white' : 'text-gray-300'}>
                      Fahrenheit (°F)
                    </span>
                    {units.temperature === 'fahrenheit' && <CheckIcon />}
                  </button>
                </div>
              </div>

              {/* Wind Speed */}
              <div className="px-4 py-3 border-b border-[#3A3E5C]">
                <div className="text-xs text-gray-400 mb-2">Wind Speed</div>
                <div className="space-y-2">
                  <button
                    onClick={() => updateWind('kmh')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                      units.wind === 'kmh' ? 'bg-[#3A3E5C]' : 'hover:bg-[#2C2F48]'
                    }`}
                  >
                    <span className={units.wind === 'kmh' ? 'text-white' : 'text-gray-300'}>
                      km/h
                    </span>
                    {units.wind === 'kmh' && <CheckIcon />}
                  </button>
                  <button
                    onClick={() => updateWind('mph')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                      units.wind === 'mph' ? 'bg-[#3A3E5C]' : 'hover:bg-[#2C2F48]'
                    }`}
                  >
                    <span className={units.wind === 'mph' ? 'text-white' : 'text-gray-300'}>
                      mph
                    </span>
                    {units.wind === 'mph' && <CheckIcon />}
                  </button>
                </div>
              </div>

              {/* Precipitation */}
              <div className="px-4 py-3">
                <div className="text-xs text-gray-400 mb-2">Precipitation</div>
                <div className="space-y-2">
                  <button
                    onClick={() => updatePrecipitation('mm')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                      units.precipitation === 'mm' ? 'bg-[#3A3E5C]' : 'hover:bg-[#2C2F48]'
                    }`}
                  >
                    <span className={units.precipitation === 'mm' ? 'text-white' : 'text-gray-300'}>
                      mm
                    </span>
                    {units.precipitation === 'mm' && <CheckIcon />}
                  </button>
                  <button
                    onClick={() => updatePrecipitation('inch')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                      units.precipitation === 'inch' ? 'bg-[#3A3E5C]' : 'hover:bg-[#2C2F48]'
                    }`}
                  >
                    <span className={units.precipitation === 'inch' ? 'text-white' : 'text-gray-300'}>
                      in
                    </span>
                    {units.precipitation === 'inch' && <CheckIcon />}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

const CheckIcon = () => (
  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

export default Header;