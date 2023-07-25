import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { Temperature, WindSpeed } from '@slices/app';
dayjs.extend(isBetween);

const DIRECTIONS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

export const formatTemp = (tempUnit: Temperature, temp: number) => {
  switch (tempUnit) {
    case 'c':
      return Math.ceil(temp - 273.15);
    case 'f':
      return Math.ceil((temp - 273.15) * 1.8 + 32);
    default:
      // kelvin
      return Math.ceil(temp);
  }
};

export const formatSpeed = (windSpeedUnit: WindSpeed, windSpeed: number) => {
  if (windSpeedUnit === 'kph') {
    return Math.ceil(windSpeed / 1.609);
  }

  return windSpeed;
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
