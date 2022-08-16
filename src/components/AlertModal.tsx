import React, { useContext } from 'react';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useSelector } from 'react-redux';
import { RootState } from '@store';
import { AppContext } from '@context/app-context';
import AlertInfo from './AlertInfo';

const AlertModal = () => {
  const { alertModalState, toggleAlertModal } = useContext(AppContext);
  const weather = useSelector(
    (state: RootState) => state.weatherSlice.selectedWeather.weather
  );

  return (
    <IonModal
      isOpen={alertModalState}
      onDidDismiss={() => toggleAlertModal(false)}
      swipeToClose={true}
    >
      <IonHeader className="ion-no-border">
        <IonToolbar color="danger">
          <IonTitle>Alerts</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => toggleAlertModal(false)}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {weather?.alerts?.map((element, index) => (
          <AlertInfo
            key={index}
            sender={element.sender_name}
            event={element.event}
            start={element.start}
            end={element.end}
            description={element.description}
          />
        ))}
      </IonContent>
    </IonModal>
  );
};

export default AlertModal;
