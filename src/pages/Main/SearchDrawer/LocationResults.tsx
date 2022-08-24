import React from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@store';
import { getWeatherByGeolocation } from '@slices/weatherSlice';
import { Result } from '@pages/Main/SearchDrawer/Result';
import Toast from '@components/Toast';
import { Button } from '@mantine/core';
import { Icon } from '@iconify/react';

export const LocationResults = () => {
  const dispatch = useAppDispatch();

  const { errors } = useSelector((state: RootState) => state.searchSlice);

  const getLocation = () => dispatch(getWeatherByGeolocation());

  return (
    <div className="mt-5 flex-grow">
      <Button
        className="p-0 text-xl text-blue-500"
        onClick={getLocation}
        leftIcon={<Icon className="text-3xl" icon="tabler:current-location" />}
        variant="white"
      >
        Use your current location
      </Button>
      <Result />
      {errors.map((element, index) => (
        <Toast key={index} error={element} time={2000} slice={'search'} />
      ))}
    </div>
  );
};
