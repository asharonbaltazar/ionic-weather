import { StateWeather } from '@functions/types';
import { Icon } from '@iconify/react';

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
    <div className="flex items-center justify-center gap-x-2 lg:col-start-2 lg:justify-start lg:bg-white lg:px-3 lg:py-4 lg:shadow-sm lg:dark:bg-stone-900 lg:dark:shadow-none">
      <h5 className="text text-xl font-medium">{selectedWeather.address}</h5>
      {selectedWeather.isGeolocation && (
        <Icon className="text-sm text-blue-600" icon="tabler:location" />
      )}
    </div>
  );
};
