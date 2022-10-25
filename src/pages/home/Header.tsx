import { LinkWithIcon } from '@components/LinkWithIcon';
import { MediaQuery } from '@components/MediaQuery';
import { useWeather } from '@utilities/hooks';
import { AddressAndGeolocation } from '@pages/home/AddressAndGeolocation';
import clsx from 'clsx';

export const Header = () => {
  const { selectedWeather } = useWeather();

  return (
    <header className="sticky inset-x-0 top-0 z-10 flex items-center bg-white p-3 shadow-sm dark:bg-stone-900 dark:shadow-none lg:col-span-3 lg:contents">
      <MediaQuery show>
        <span
          className={clsx({
            'flex-none': selectedWeather,
            'ml-auto mr-2': !selectedWeather,
          })}
        >
          <LinkWithIcon to="/search" icon="tabler:search" />
        </span>
      </MediaQuery>

      <AddressAndGeolocation selectedWeather={selectedWeather} />

      {selectedWeather && (
        <MediaQuery>
          <h5 className="text bg-white text-xl font-medium shadow-sm dark:bg-stone-900 dark:shadow-none lg:px-3 lg:py-4">
            Hourly
          </h5>
          <h5 className="text bg-white text-xl font-medium shadow-sm dark:bg-stone-900 dark:shadow-none lg:px-3 lg:py-4">
            Daily
          </h5>
        </MediaQuery>
      )}

      <MediaQuery show>
        <span className="flex-none">
          <LinkWithIcon to="/settings" icon="tabler:settings" />
        </span>
      </MediaQuery>
    </header>
  );
};