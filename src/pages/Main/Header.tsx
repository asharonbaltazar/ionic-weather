import React from 'react';
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
    <header className="flex items-center p-3 sticky top-0 inset-x-0 bg-white dark:bg-stone-900 z-10 shadow-sm dark:shadow-none">
      <span className={clsx({ 'flex-0': address, 'ml-auto mr-2': !address })}>
        <LinkWithIcon to="/search" icon="tabler:search" />
      </span>

      {address && (
        <span className="flex items-center flex-grow justify-center gap-x-2">
          <h5 className="font-medium text-xl text">{address}</h5>
          {geolocation && (
            <Icon className="text-sm text-blue-600" icon="tabler:location" />
          )}
        </span>
      )}

      <span className="flex-0">
        <LinkWithIcon to="/settings" icon="tabler:settings" />
      </span>
    </header>
  );
};
