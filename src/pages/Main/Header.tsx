import React from 'react';
import { ActionIcon, Header as MantineHeader } from '@mantine/core';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import { RootState } from '@store';

interface HeaderProps {
  setDrawerState: (newDrawerState: boolean) => void;
}

export const Header = ({ setDrawerState }: HeaderProps) => {
  const { selectedWeather } = useSelector(
    (state: RootState) => state.weatherSlice
  );

  const { address, geolocation } = selectedWeather;

  return (
    <MantineHeader
      className="flex items-center p-3 justify-between"
      height="auto"
    >
      {address && (
        <div className="flex items-center justify-center gap-x-2">
          <h5 className="text-gray-900 font-medium">{address}</h5>
          {geolocation && (
            <Icon className="text-sm text-blue-600" icon="tabler:location" />
          )}
        </div>
      )}
      <div className="ml-auto flex items-center gap-x-5">
        <ActionIcon onClick={() => setDrawerState(true)}>
          <Icon className="text-3xl text-gray-900" icon="tabler:search" />
        </ActionIcon>
        <Link to="/settings">
          <ActionIcon>
            <Icon className="text-3xl text-gray-900" icon="tabler:settings" />
          </ActionIcon>
        </Link>
      </div>
    </MantineHeader>
  );
};
