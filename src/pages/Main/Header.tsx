import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import { RootState } from '@store';
import { LinkWithIcon } from '@components/LinkWithIcon';
import clsx from 'clsx';

export const Header = () => {
  const { selectedWeather } = useSelector(
    (state: RootState) => state.weatherSlice
  );

  const { address, geolocation } = selectedWeather;

  return (
    <header className="sticky inset-x-0 top-0 z-10 flex items-center bg-white p-3 shadow-sm dark:bg-stone-900 dark:shadow-none">
      <span
        className={clsx({ 'flex-none': address, 'ml-auto mr-2': !address })}
      >
        <LinkWithIcon to="/search" icon="tabler:search" />
      </span>

      {address && (
        <span className="flex grow items-center justify-center gap-x-2">
          <h5 className="text text-xl font-medium">{address}</h5>
          {geolocation && (
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
