import { Icon } from '@iconify/react';
import { LinkWithIcon } from '@components/LinkWithIcon';
import { useWeather } from '@utilities/hooks';
import clsx from 'clsx';

export const Header = () => {
  const { selectedWeather } = useWeather();

  return (
    <header className="sticky inset-x-0 top-0 z-10 flex items-center bg-white p-3 shadow-sm dark:bg-stone-900 dark:shadow-none">
      <span
        className={clsx({
          'flex-none': selectedWeather,
          'ml-auto mr-2': !selectedWeather,
        })}
      >
        <LinkWithIcon to="/search" icon="tabler:search" />
      </span>

      {selectedWeather && (
        <span className="flex grow items-center justify-center gap-x-2">
          <h5 className="text text-xl font-medium">
            {selectedWeather.address}
          </h5>
          {selectedWeather.isGeolocation && (
            <Icon className="text-sm text-blue-600" icon="tabler:location" />
          )}
        </span>
      )}

      <span className="flex-none">
        <LinkWithIcon to="/settings" icon="tabler:settings" />
      </span>
    </header>
  );
};
