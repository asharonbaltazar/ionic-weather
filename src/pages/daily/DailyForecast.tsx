import { DailyWeather } from '@functions/types';
import { Disclosure } from '@headlessui/react';
import dayjs from 'dayjs';
import { WeatherIcon } from '@components/WeatherIcon';
import { DailyTemp } from './DailyTemp';
import { DailyFeelsLike } from './DailyFeelsLike';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(advancedFormat);

interface DailyForecastProps {
  daily: DailyWeather;
}

export const DailyForecast = ({ daily }: DailyForecastProps) => {
  const { dt, feelsLike, temp, details } = daily;

  return (
    <li className="space-y-1">
      <span className="pl-2 text-sm text-gray-900/50 dark:text-stone-200/70">
        {dayjs(dt).format('dddd, MMMM D')}
      </span>
      <Disclosure>
        <Disclosure.Button className="block w-full space-y-1 rounded-3xl bg-slate-100 px-3 py-6 dark:bg-zinc-800 hover:dark:bg-zinc-700">
          {({ open }) => (
            <div className="flex items-center justify-between">
              <div className="relative">
                <span className="absolute -top-1 left-1">
                  <WeatherIcon
                    className="text-2xl text-blue-400/90 dark:text-blue-200/90"
                    icon={details.icon}
                  />
                </span>
                <p className="text whitespace-nowrap pl-12 text-xl first-letter:capitalize">
                  {details.description}
                </p>
              </div>

              <div className="text-right">
                <DailyTemp open={open} temp={temp} />
                <DailyFeelsLike open={open} feelsLike={feelsLike} />
              </div>
            </div>
          )}
        </Disclosure.Button>
      </Disclosure>
    </li>
  );
};
