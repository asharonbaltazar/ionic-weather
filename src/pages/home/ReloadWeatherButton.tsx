import { Icon } from '@iconify/react';
import { getWeather } from '@slices/weatherSlice.thunks';
import { getGeolocationGeocode } from '@slices/searchSlice.thunks';
import { useAppDispatch } from '@store';
import { useSearch } from '@utilities/hooks';
import { unwrapResult } from '@reduxjs/toolkit';

export const ReloadWeatherButton = () => {
  const { selectedLocation } = useSearch();
  const dispatch = useAppDispatch();

  if (!selectedLocation) {
    return null;
  }

  const onReload = async () => {
    if (selectedLocation.isGeolocation) {
      const geolocationGeocode = unwrapResult(
        await dispatch(getGeolocationGeocode())
      );

      return dispatch(getWeather(geolocationGeocode));
    }

    return dispatch(getWeather(selectedLocation));
  };

  return (
    <button
      className="text items-center gap-x-2 rounded font-medium dark:hover:bg-slate-700"
      onClick={onReload}
      title="Reload"
    >
      <Icon
        className="m-1 text-2xl text-blue-500 dark:text-slate-400 md:text-3xl"
        icon="tabler:reload"
      />
    </button>
  );
};
