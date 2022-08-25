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
    <header className="flex items-center py-2 px-3 md:p-3 justify-between sticky top-0 inset-x-0 dark:bg-stone-900 z-10">
      {address && (
        <div className="flex items-center justify-center gap-x-2">
          <h5 className="font-medium text">{address}</h5>
          {geolocation && (
            <Icon className="text-sm text-blue-600" icon="tabler:location" />
          )}
        </div>
      )}

      <div className="ml-auto flex items-center gap-x-3">
        <LinkWithIcon to="/search" icon="tabler:search" />
        <LinkWithIcon to="/settings" icon="tabler:settings" />
      </div>
    </header>
  );
};
