import React from 'react';
import { IonToast } from '@ionic/react';
import { dismissSearchErrors } from '../slices/searchSlice';
import { dismissWeatherErrors } from '../slices/weatherSlice';
import { useDispatch } from 'react-redux';

interface IProps {
  error: string;
  time: number;
  slice?: 'search' | 'weather';
}

const dismissErrorsMap = {
  search: dismissSearchErrors,
  weather: dismissWeatherErrors,
};

const Toast = ({ error, time, slice }: IProps) => {
  const dispatch = useDispatch();
  return (
    <IonToast
      isOpen={true}
      onDidDismiss={() => slice && dispatch(dismissErrorsMap[slice]())}
      position="bottom"
      duration={time}
      message={error}
    />
  );
};

export default Toast;
