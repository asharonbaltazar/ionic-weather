import { DailyWeather } from '@functions/types';

interface DailyForecastProps {
  weekly: DailyWeather;
}

export const DailyForecast = ({ weekly }: DailyForecastProps) => {
  return <li>{weekly.dt}</li>;
};
