import React from 'react';
import { ActionIcon, Header as MantineHeader, Title } from '@mantine/core';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import { RootState } from '@store';

export const Header = () => {
  const { selectedWeather } = useSelector(
    (state: RootState) => state.weatherSlice
  );

  const { address, geolocation } = selectedWeather;

  return (
    <MantineHeader
      className="flex items-center py-2 px-3 justify-between"
      height="auto"
    >
      {address && (
        <div className="flex items-center justify-center gap-x-2">
          <Title className="text-gray-900 font-medium" order={5}>
            {address}
          </Title>
          {geolocation && (
            <Icon className="text-sm text-blue-600" icon="tabler:location" />
          )}
        </div>
      )}
      <div className="flex items-center gap-x-3">
        <Link to="/search">
          <ActionIcon>
            <Icon className="text-xl text-gray-900" icon="tabler:search" />
          </ActionIcon>
        </Link>
        <Link to="/settings">
          <ActionIcon>
            <Icon className="text-xl text-gray-900" icon="tabler:settings" />
          </ActionIcon>
        </Link>
      </div>
    </MantineHeader>
  );
};
