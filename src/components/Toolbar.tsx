import React from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import {
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonTitle,
} from "@ionic/react";
import { searchSharp, search, settings, settingsSharp } from "ionicons/icons";

const Toolbar = () => {
  const { address } = useSelector(
    (state: RootStateOrAny) => state.weather.selectedWeather
  );

  return (
    <IonToolbar>
      <IonTitle>{address && address}</IonTitle>
      <IonButtons slot="end">
        <IonButton routerLink="/search">
          <IonIcon
            slot="icon-only"
            md={searchSharp}
            ios={search}
            color="primary"
          />
        </IonButton>
        <IonButton routerLink="/settings">
          <IonIcon
            slot="icon-only"
            md={settingsSharp}
            ios={settings}
            color="primary"
          />
        </IonButton>
      </IonButtons>
    </IonToolbar>
  );
};

export default Toolbar;
