import { skipToken } from '@reduxjs/toolkit/dist/query';
import { formatSpeed, formatTemp } from '@utilities/format';
import dayjs from 'dayjs';
import { useWeatherQuery } from '@slices/weather';
import { useAppSelector } from '@store';

export const useFormatting = () => {
  const { temperature, windSpeed, time } = useAppSelector((state) => state.app);

  return {
    formatTemp: (temp: number) =>
      `${formatTemp(temperature, temp)}°${temperature.toUpperCase()}`,
    formatWindSpeed: (speed: number) =>
      `${formatSpeed(windSpeed, speed)} ${windSpeed}`,
    formatTime: (dateAndTime: string) => dayjs(dateAndTime).format(time),
  };
};

export const useWeather = () => {
  const { selectedLocation } = useAppSelector((state) => state.app);

  const weatherObj = useWeatherQuery(
    selectedLocation ? selectedLocation : skipToken
  );

  return weatherObj;
};
