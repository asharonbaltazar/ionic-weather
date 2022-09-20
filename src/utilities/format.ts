import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { Temperature, WindSpeed } from '@slices/settingsSlice';
dayjs.extend(isBetween);

const DIRECTIONS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

export const formatTemp: { [key in Temperature]: (temp: number) => number } = {
  c: (temp: number) => Math.ceil(temp - 273.15),
  f: (temp: number) => Math.ceil((temp - 273.15) * 1.8 + 32),
  k: (temp: number) => Math.ceil(temp),
};

export const formatSpeed: {
  [key in WindSpeed]: (windSpeed: number) => number;
} = {
  mph: (windSpeed: number) => Math.ceil(windSpeed / 1.609),
  kph: (windSpeed: number) => windSpeed,
};

export const getDirection = (angle: number) =>
  DIRECTIONS[Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8];

export const formatUviIndex = (uvi: number): string => {
  switch (true) {
    case uvi >= 0 && uvi <= 2:
      return 'Low';
    case uvi >= 2 && uvi <= 4:
      return 'Moderate';
    case uvi >= 4 && uvi <= 8:
      return 'High';
    case uvi >= 8 && uvi <= 10:
      return 'Very high';
    case uvi >= 10:
      return 'Extreme';
    default:
      return '';
  }
};
