import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

// Compass directions
const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

export const formatTemp = {
  celsius: (value: number) => Math.ceil(value - 273.15),
  fahrenheit: (value: number) => Math.ceil((value - 273.15) * 1.8 + 32),
  kelvin: (value: number) => Math.ceil(value),
};

export const formatSpeed = {
  miles: (value: number) => Math.ceil(value / 1.609),
  kilometers: (value: number) => value,
};

export const formatIconTime = (day: boolean): string => {
  return day ? "day" : "night";
};

export const timeIsWithinTimes = (
  time: string,
  times: { sunrise: string; sunset: string }[]
): boolean =>
  times.some(element => dayjs(time).isBetween(element.sunrise, element.sunset));

export const getDirection = (angle: number): string => {
  const index = Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8;
  return directions[index];
};
