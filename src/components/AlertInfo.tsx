import React from 'react';
import { IonCol, IonGrid, IonItem, IonRow } from '@ionic/react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import dayjs from 'dayjs';

interface IProps {
  sender: string;
  event: string;
  start: string;
  end: string;
  description: string;
}

const AlertInfo = ({ sender, event, start, end, description }: IProps) => {
  // Time unit from settings
  const selectedTime = useSelector(
    (state: RootState) => state.settingsSlice.timePreference
  );
  // Special time formatting for <WeatherDetails />
  const exactTime = selectedTime === 'h a' ? 'h:mm a' : 'HH:mm';

  return (
    <IonItem lines="none">
      <IonGrid>
        <IonRow>
          <IonCol>
            <b>{event}</b> <br />
            {dayjs(start).format(`MMM DD ${exactTime}`)} –{' '}
            {dayjs(end).format(`MMM DD ${exactTime}`)}
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>{description}</IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <small>{sender}</small>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonItem>
  );
};

export default AlertInfo;
