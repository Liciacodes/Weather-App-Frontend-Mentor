import { createContext, useContext, useState } from 'react';
import type { ReactNode, Dispatch, SetStateAction } from 'react';

export type TemperatureUnit = 'celsius' | 'fahrenheit';
export type WindUnit = 'kmh' | 'mph';
export type PrecipitationUnit = 'mm' | 'inch';

interface Units {
  temperature: TemperatureUnit;
  wind: WindUnit;
  precipitation: PrecipitationUnit;
}

interface UnitsContextType {
  units: Units;
  setUnits: Dispatch<SetStateAction<Units>>;
  updateTemperature: (unit: TemperatureUnit) => void;
  updateWind: (unit: WindUnit) => void;
  updatePrecipitation: (unit: PrecipitationUnit) => void;
}

const UnitsContext = createContext<UnitsContextType | undefined>(undefined);

export const UnitsProvider = ({ children }: { children: ReactNode }) => {
  const [units, setUnits] = useState<Units>({
    temperature: 'celsius',
    wind: 'kmh',
    precipitation: 'mm'
  });

  const updateTemperature = (unit: TemperatureUnit) => {
    setUnits(prev => ({ ...prev, temperature: unit }));
  };

  const updateWind = (unit: WindUnit) => {
    setUnits(prev => ({ ...prev, wind: unit }));
  };

  const updatePrecipitation = (unit: PrecipitationUnit) => {
    setUnits(prev => ({ ...prev, precipitation: unit }));
  };

  return (
    <UnitsContext.Provider value={{ 
      units, 
      setUnits, 
      updateTemperature, 
      updateWind, 
      updatePrecipitation 
    }}>
      {children}
    </UnitsContext.Provider>
  );
};

export const useUnits = () => {
  const context = useContext(UnitsContext);
  if (context === undefined) {
    throw new Error('useUnits must be used within a UnitsProvider');
  }
  return context;
};