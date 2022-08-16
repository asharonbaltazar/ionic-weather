import React from 'react';
import { IonLoading } from '@ionic/react';
import { useSelector } from 'react-redux';
import { RootState } from '@store';

const ScreenLoader = () => {
  const loading = useSelector((state: RootState) => state.weatherSlice.loading);

  return (
    <IonLoading
      isOpen={loading}
      message="Loading your weather..."
      translucent={false}
    />
  );
};

export default ScreenLoader;
