import { DailyWeather } from '@functions/types';
import { Disclosure, Transition } from '@headlessui/react';
import { Badge } from '@components/Badge';
import { formatUviIndex } from '@utilities/format';
import { useFormatting } from '@utilities/hooks';

interface DailyDetailsProps {
  daily: DailyWeather;
}

export const DailyDetails = ({ daily }: DailyDetailsProps) => {
  const { formatWindSpeed, formatTemp } = useFormatting();

  const { humidity, wind, uvi, pressure, pop, dewPoint } = daily;

  return (
    <Transition
      enter="transition duration-100 ease-in-out"
      enterFrom="transform -translate-y-6 opacity-0"
      enterTo="transform translate-y-0 opacity-100"
      leave="transition duration-75 ease-in-out"
      leaveFrom="transform translate-y-0 opacity-100"
      leaveTo="transform -translate-y-6 opacity-0"
    >
      <Disclosure.Panel className="flex flex-wrap gap-2 rounded-b-3xl p-3">
        <Badge bgColor="bg-slate-500">Humidity: {humidity}%</Badge>
        <Badge bgColor="bg-zinc-500">Pressure: {pressure}</Badge>
        <Badge textColor="text-gray-900" bgColor="bg-yellow-500">
          UVI: {formatUviIndex(uvi)}
        </Badge>
        <Badge bgColor="bg-emerald-500">
          Wind Speed: {formatWindSpeed(wind.speed)}
        </Badge>
        <Badge bgColor="bg-blue-500">Dew Point: {formatTemp(dewPoint)}</Badge>
        <Badge bgColor="bg-sky-500">
          Chance of Rain: {Math.floor(pop * 100)}
        </Badge>
      </Disclosure.Panel>
    </Transition>
  );
};
