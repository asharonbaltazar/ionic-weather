import { useSelector } from 'react-redux';
import { RootState } from '@store';

export const useWeather = () =>
  useSelector((state: RootState) => state.weatherSlice);

export const useSettings = () =>
  useSelector((state: RootState) => state.settingsSlice);

export const useSearch = () =>
  useSelector((state: RootState) => state.searchSlice);
