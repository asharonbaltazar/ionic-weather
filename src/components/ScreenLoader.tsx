import React from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '@store';
import { LoadingOverlay } from '@mantine/core';

const ScreenLoader = () => {
  const { loading } = useSelector((state: RootState) => state.weatherSlice);

  return <LoadingOverlay visible={loading} overlayBlur={2} />;
};

export default ScreenLoader;
