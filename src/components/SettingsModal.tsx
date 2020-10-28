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
import VibationPreference from "./settings_toggles/VibationPreference";

const SettingsModal = () => {
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList lines="none">
          <IonItemGroup>
            <IonItemDivider>Weather preferences: </IonItemDivider>
            <TempPreference />
            <SpeedPreference />
          </IonItemGroup>
          <IonItemGroup>
            <IonItemDivider>Application preferences: </IonItemDivider>
            <VibationPreference />
          </IonItemGroup>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default SettingsModal;
