import React, { useContext } from "react";
import {
  IonContent,
  IonModal,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonList,
} from "@ionic/react";
import TempPreference from "./settings_toggles/TempPreference";
import SpeedPreference from "./settings_toggles/SpeedPreference";
import { AppContext } from "../context/app-context";

const SettingsModal: React.FC = () => {
  const { settingsModal, toggleSettingsModal } = useContext(AppContext);

  return (
    <IonModal isOpen={settingsModal} backdropDismiss={false}>
      <IonToolbar>
        <IonTitle>Settings</IonTitle>
        <IonButtons slot="end">
          <IonButton onClick={() => toggleSettingsModal()}>CLOSE</IonButton>
        </IonButtons>
      </IonToolbar>

      <IonContent>
        <IonList>
          <TempPreference />
          <SpeedPreference />
        </IonList>
      </IonContent>
    </IonModal>
  );
};

export default SettingsModal;
