import React, { useContext } from "react";
import {
  IonContent,
  IonModal,
  IonToolbar,
  IonButtons,
  IonButton,
  IonList,
} from "@ionic/react";
import TempPreference from "./settings_toggles/TempPreference";
import { AppContext } from "../context/app-context";

const SettingsModal: React.FC = () => {
  const { settingsModal, toggleSettingsModal } = useContext(AppContext);

  return (
    <IonModal isOpen={settingsModal} backdropDismiss={false}>
      <IonToolbar>
        <IonButtons slot="end">
          <IonButton onClick={() => toggleSettingsModal()}>CLOSE</IonButton>
        </IonButtons>
      </IonToolbar>

      <IonContent>
        <IonList>
          <TempPreference />
        </IonList>
      </IonContent>
    </IonModal>
  );
};

export default SettingsModal;
