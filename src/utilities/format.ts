import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

export const formatTemp = {
  celsius: (value: number) => Math.ceil(value - 273.15),
  fahrenheit: (value: number) => Math.ceil((value - 273.15) * 1.8 + 32),
  kelvin: (value: number) => Math.ceil(value),
};

export const formatIconTime = (day: boolean): string => {
  return day ? "day" : "night";
};

export const timeIsWithinTimes = (
  time: any,
  times: { sunrise: string; sunset: string }[]
): boolean =>
  times.some(element => dayjs(time).isBetween(element.sunrise, element.sunset));
