import { Icon } from '@iconify/react';
import { useWeather } from '@utilities/hooks';

export const AddressAndGeolocation = () => {
  const { selectedWeather } = useWeather();

  if (!selectedWeather) {
    return null;
  }

  return (
    <div className="flex grow items-center justify-center gap-x-2 lg:block lg:bg-white lg:p-3 lg:shadow-sm lg:dark:bg-stone-900 lg:dark:shadow-none">
      <h5 className="text text-xl font-medium">{selectedWeather.address}</h5>
      {selectedWeather.isGeolocation && (
        <Icon className="text-sm text-blue-600" icon="tabler:location" />
      )}
    </div>
  );
};