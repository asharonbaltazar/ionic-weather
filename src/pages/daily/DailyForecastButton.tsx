import { DailyWeather } from '@functions/types';
import { BaseDetails } from '@functions/types';
import { Disclosure } from '@headlessui/react';
import { WeatherIcon } from '@components/WeatherIcon';
import { DailyTemp } from '@pages/daily/DailyTemp';
import clsx from 'clsx';

interface DailyForecastButtonProps {
  details: BaseDetails;
  temp: DailyWeather['temp'];
}

export const DailyForecastButton = ({
  details,
  temp,
}: DailyForecastButtonProps) => (
  <Disclosure.Button className="block w-full ">
    {({ open }) => (
      <div
        className={clsx(
          'flex items-center justify-between px-3 lg:hover:dark:bg-zinc-700',
          {
            'rounded-t-3xl py-3': open,
            'rounded-3xl py-6': !open,
          }
        )}
      >
        <div className="relative">
          <span className="absolute -top-1 left-1">
            <WeatherIcon
              className="text-3xl text-blue-400/90 dark:text-blue-200/90"
              icon={details.icon}
            />
          </span>
          <p className="text whitespace-nowrap pl-16 text-xl first-letter:capitalize">
            {details.description}
          </p>
        </div>

        <DailyTemp open={open} temp={temp} />
      </div>
    )}
  </Disclosure.Button>
);
