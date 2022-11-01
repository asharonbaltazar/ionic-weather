import { useSearch } from '@utilities/hooks';
import { ReloadWeatherButton } from '@pages/home/ReloadWeatherButton';
import { Icon } from '@iconify/react';

export const AddressAndGeolocation = () => {
  const { selectedLocationGeocode: selectedLocation } = useSearch();

  if (!selectedLocation) {
    return null;
  }

  return (
    <div className="flex grow items-center truncate lg:col-start-2 lg:bg-white lg:p-3 lg:shadow-sm lg:dark:bg-stone-900 lg:dark:shadow-none">
      <span className="flex grow items-center justify-center gap-x-2 truncate pl-5 lg:justify-start lg:pl-0">
        <h5 className="text truncate text-xl font-medium">
          {selectedLocation.address}
        </h5>
        {selectedLocation.isGeolocation && (
          <Icon className="text-sm text-blue-600" icon="tabler:location" />
        )}
      </span>
      <ReloadWeatherButton />
    </div>
  );
};
