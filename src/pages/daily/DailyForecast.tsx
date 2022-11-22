import { DailyWeather } from '@functions/types';
import { Disclosure } from '@headlessui/react';
import { DailyDetails } from '@pages/daily/DailyDetails';
import { DailyForecastButton } from '@pages/daily/DailyForecastButton';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(advancedFormat);

interface DailyForecastProps {
  daily: DailyWeather;
}

export const DailyForecast = ({ daily }: DailyForecastProps) => {
  const { dt, temp, details } = daily;

  return (
    <li className="space-y-1">
      <span className="pl-2 text-sm text-gray-900/50 dark:text-stone-200/70">
        {dayjs(dt).format('dddd, MMMM D')}
      </span>
      <Disclosure
        as="div"
        className="space-y-1 rounded-3xl bg-slate-100 dark:bg-zinc-800 "
      >
        <DailyForecastButton details={details} temp={temp} />
        <DailyDetails daily={daily} />
      </Disclosure>
    </li>
  );
};
