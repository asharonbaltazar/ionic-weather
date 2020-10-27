import React from "react";
import {
  IonContent,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonList,
  IonPage,
  IonBackButton,
  IonHeader,
  IonItemGroup,
  IonItemDivider,
} from "@ionic/react";
import TempPreference from "./settings_toggles/TempPreference";
import SpeedPreference from "./settings_toggles/SpeedPreference";

const SettingsModal = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
            <IonTitle>Settings</IonTitle>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList lines="none">
          <IonItemGroup>
            <IonItemDivider>Weather preferences: </IonItemDivider>
            <TempPreference />
            <SpeedPreference />
          </IonItemGroup>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default SettingsModal;
