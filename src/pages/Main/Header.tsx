import React from 'react';
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import { RootState } from '@store';
import { LinkWithIcon } from '@components/LinkWithIcon';

export const Header = () => {
  const { selectedWeather } = useSelector(
    (state: RootState) => state.weatherSlice
  );

  const { address, geolocation } = selectedWeather;

  return (
    <header className="flex items-center p-3 justify-between sticky top-0 inset-x-0 dark:bg-stone-900 z-10">
      {address && (
        <div className="flex items-center justify-center gap-x-2">
          <h5 className="text-gray-900 font-medium dark:text-stone-200">
            {address}
          </h5>
          {geolocation && (
            <Icon className="text-sm text-blue-600" icon="tabler:location" />
          )}
        </div>
      )}

      <div className="ml-auto flex items-center gap-x-3">
        <LinkWithIcon href="/search" icon="tabler:search" />
        <LinkWithIcon href="/settings" icon="tabler:settings" />
      </div>
    </header>
  );
};
