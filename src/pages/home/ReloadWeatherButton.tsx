import { Icon } from '@iconify/react';
import { useAppSelector } from '@store';
import { useLazyGeocodeByCoordsQuery } from '@slices/location';
import { useLazyWeatherQuery } from '@slices/weather';

export const ReloadWeatherButton = () => {
  const { selectedLocation } = useAppSelector((state) => state.app);
  const [getGeocode] = useLazyGeocodeByCoordsQuery();
  const [getWeather] = useLazyWeatherQuery();

  if (!selectedLocation) {
    return null;
  }

  const onReload = async () => {
    if (selectedLocation.isGeolocation) {
      const { data: geocodeLocation, isSuccess } = await getGeocode({
        isGeolocation: true,
      });

      if (isSuccess) {
        getWeather(geocodeLocation);
      }
    } else {
      getWeather(selectedLocation);
    }
  };

  return (
    <button
      className="text items-center gap-x-2 rounded font-medium hover:bg-slate-200 dark:hover:bg-slate-700"
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
