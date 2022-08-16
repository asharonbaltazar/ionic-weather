import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
} from '@ionic/react';
import NextWeek from '@components/NextWeek';

const Week = () => (
  <IonPage>
    <IonHeader className="ion-no-border">
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/" />
        </IonButtons>
        <IonTitle>Next 7 Days</IonTitle>
      </IonToolbar>
    </IonHeader>
    <NextWeek />
  </IonPage>
);

export default Week;
