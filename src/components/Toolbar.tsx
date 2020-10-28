import React from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import {
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonTitle,
  IonHeader,
} from "@ionic/react";
import { searchSharp, search, settings, settingsSharp } from "ionicons/icons";

const Toolbar = () => {
  const { address } = useSelector(
    (state: RootStateOrAny) => state.weather.selectedWeather
  );

  return (
    <IonHeader className="ion-no-border">
      <IonToolbar>
        {address && <IonTitle>{address}</IonTitle>}
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
    </IonHeader>
  );
};

export default Toolbar;
