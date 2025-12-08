// utils/unitConverter.ts
import type { TemperatureUnit, WindUnit, PrecipitationUnit } from '../context/UnitsContext';

// Temperature conversions
export const convertTemperature = (value: number, from: TemperatureUnit, to: TemperatureUnit): number => {
  if (from === to) return value;
  
  if (from === 'celsius' && to === 'fahrenheit') {
    return (value * 9/5) + 32;
  } else {
    return (value - 32) * 5/9;
  }
};

export const formatTemperature = (value: number, unit: TemperatureUnit): string => {
  const rounded = Math.round(value);
  return unit === 'celsius' ? `${rounded}°C` : `${rounded}°F`;
};

// Wind speed conversions
export const convertWindSpeed = (value: number, from: WindUnit, to: WindUnit): number => {
  if (from === to) return value;
  
  if (from === 'kmh' && to === 'mph') {
    return value * 0.621371;
  } else {
    return value / 0.621371;
  }
};

export const formatWindSpeed = (value: number, unit: WindUnit): string => {
  const rounded = Math.round(value);
  return unit === 'kmh' ? `${rounded} km/h` : `${rounded} mph`;
};

// Precipitation conversions
export const convertPrecipitation = (value: number, from: PrecipitationUnit, to: PrecipitationUnit): number => {
  if (from === to) return value;
  
  if (from === 'mm' && to === 'inch') {
    return value * 0.0393701;
  } else {
    return value / 0.0393701;
  }
};

export const formatPrecipitation = (value: number, unit: PrecipitationUnit): string => {
  if (unit === 'mm') {
    return `${Math.round(value)} mm`;
  } else {
    return `${value.toFixed(1)} in`;
  }
};