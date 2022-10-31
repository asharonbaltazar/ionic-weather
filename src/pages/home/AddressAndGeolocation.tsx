import { StateWeather } from '@functions/types';
import { Icon } from '@iconify/react';
import { ReloadWeatherButton } from '@pages/home/ReloadWeatherButton';

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
    <div className="flex grow items-center truncate lg:col-start-2 lg:bg-white lg:p-3 lg:shadow-sm lg:dark:bg-stone-900 lg:dark:shadow-none">
      <span className="flex grow items-center justify-center gap-x-2 truncate pl-5 lg:justify-start lg:pl-0">
        <h5 className="text truncate text-xl font-medium">
          {selectedWeather.address}
        </h5>
        {selectedWeather.isGeolocation && (
          <Icon className="text-sm text-blue-600" icon="tabler:location" />
        )}
      </span>
      <ReloadWeatherButton selectedWeather={selectedWeather} />
    </div>
  );
};
