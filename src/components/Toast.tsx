import React from 'react';
import { dismissSearchErrors } from '@slices/searchSlice';
import { dismissWeatherErrors } from '@slices/weatherSlice';
import { useDispatch } from 'react-redux';
import { Notification } from '@mantine/core';

interface IProps {
  error: string;
  time: number;
  slice?: 'search' | 'weather';
}

const dismissErrorsMap = {
  search: dismissSearchErrors,
  weather: dismissWeatherErrors,
};

const Toast = ({ error, slice }: IProps) => {
  const dispatch = useDispatch();

  return (
    <Notification
      title={error}
      onClose={() => slice && dispatch(dismissErrorsMap[slice]())}
    />
  );
};

export default Toast;
