import { StateWeather } from '@functions/types';
import { Icon } from '@iconify/react';
import { ReloadWeatherButton } from './ReloadWeatherButton';

interface AddressAndGeolocationProps {
  selectedWeather: StateWeather | null;
}

export const AddressAndGeolocation = ({
  selectedWeather,
}: AddressAndGeolocationProps) => {
  if (!selectedWeather) {
    return null;
  }

  return (
    <div className="flex grow items-center justify-center gap-x-2 lg:col-start-2 lg:justify-between lg:bg-white lg:p-3 lg:shadow-sm lg:dark:bg-stone-900 lg:dark:shadow-none">
      <span className="grow">
        <h5 className="text text-xl font-medium">{selectedWeather.address}</h5>
        {selectedWeather.isGeolocation && (
          <Icon className="text-sm text-blue-600" icon="tabler:location" />
        )}
      </span>
      <ReloadWeatherButton />
    </div>
  );
};
