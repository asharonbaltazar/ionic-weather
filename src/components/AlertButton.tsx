import React, { useContext } from 'react';
import { IonIcon, IonItem, IonLabel } from '@ionic/react';
import {
  alertCircleOutline,
  alertCircleSharp,
  closeOutline,
  closeSharp,
} from 'ionicons/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { AppContext } from '../context/app-context';
import '../css/alert.css';

const AlertButton = () => {
  // hidden alert state
  const weather = useSelector(
    (state: RootState) => state.weatherSlice.selectedWeather.weather
  );
  const { toggleAlertModal, toggleAlertButton, alertButtonState } =
    useContext(AppContext);

  const closeAlert = (e: React.MouseEvent<HTMLIonIconElement, MouseEvent>) => {
    toggleAlertButton();
    e.stopPropagation();
  };

  return (
    <>
      {weather?.alerts && alertButtonState && (
        <IonItem
          color="danger"
          button
          detail={false}
          onClick={() => toggleAlertModal(true)}
        >
          <IonIcon
            slot="start"
            md={alertCircleSharp}
            ios={alertCircleOutline}
          />
          <IonLabel>
            {weather.alerts[0].sender_name}{' '}
            {weather.alerts.length > 1
              ? `and ${weather.alerts.length - 1} more`
              : ''}
          </IonLabel>
          <IonIcon
            md={closeSharp}
            ios={closeOutline}
            onClick={(e) => closeAlert(e)}
          />
        </IonItem>
      )}
    </>
  );
};

export default AlertButton;
