import { HourlyWeather } from '@functions/types';

type HourlyForecastProps = HourlyWeather;

export const HourlyForecast = ({ details }: HourlyForecastProps) => (
  <li className="rounded-3xl bg-slate-100 px-3 py-6 dark:bg-zinc-800">
    {details.description}
  </li>
);
