import { useSelector } from 'react-redux';
import { RootState } from '@store';
import { formatSpeed, formatTemp } from '@utilities/format';
import dayjs from 'dayjs';

export const useWeather = () =>
  useSelector((state: RootState) => state.weatherSlice);

export const useSettings = () =>
  useSelector((state: RootState) => state.settingsSlice);

export const useSearch = () =>
  useSelector((state: RootState) => state.searchSlice);

export const useFormatting = () => {
  const { temperature, windSpeed, time } = useSettings();

  return {
    formatTemp: (temp: number) =>
      `${formatTemp[temperature](temp)}°${temperature.toUpperCase()}`,
    formatWindSpeed: (speed: number) =>
      `${formatSpeed[windSpeed](speed)} ${windSpeed}`,
    formatTime: (dateAndTime: string) => dayjs(dateAndTime).format(time),
  };
};
