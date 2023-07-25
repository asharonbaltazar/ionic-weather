import { LinkWithIcon } from '@components/LinkWithIcon';
import { MediaQuery } from '@components/MediaQuery';
import { AddressAndGeolocation } from '@pages/home/AddressAndGeolocation';
import clsx from 'clsx';
import { useWeather } from '@utilities/hooks';

export const Header = () => {
  const { data: weather } = useWeather();

  return (
    <header className="sticky inset-x-0 top-0 z-10 flex items-center bg-white p-3 shadow-sm dark:bg-stone-900 dark:shadow-none lg:col-span-3 lg:contents">
      <MediaQuery show>
        <span
          className={clsx({
            'flex-none': weather,
            'ml-auto mr-2': !weather,
          })}
        >
          <LinkWithIcon to="/search" icon="tabler:search" title="Search" />
        </span>
      </MediaQuery>

      {weather && <AddressAndGeolocation />}

      {weather && (
        <MediaQuery>
          <div className="bg-white shadow-sm backdrop-blur-md dark:bg-stone-900 dark:shadow-none">
            <h5 className="text text-xl font-medium lg:px-3 lg:py-4">Hourly</h5>
          </div>
          <div className="bg-white shadow-sm backdrop-blur-md dark:bg-stone-900 dark:shadow-none">
            <h5 className="text text-xl font-medium lg:px-3 lg:py-4">Daily</h5>
          </div>
        </MediaQuery>
      )}

      <MediaQuery show>
        <span className="flex-none">
          <LinkWithIcon
            to="/settings"
            icon="tabler:settings"
            title="Settings"
          />
        </span>
      </MediaQuery>
    </header>
  );
};
