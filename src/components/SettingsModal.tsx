import React, { useContext } from "react";
import {
  IonContent,
  IonModal,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
} from "@ionic/react";
import { AppContext } from "../context/app-context";

const SettingsModal: React.FC = () => {
  const { settingsModal, toggleSettingsModal } = useContext(AppContext);

  return (
    <IonModal isOpen={settingsModal} backdropDismiss={false}>
      <IonContent>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
          <IonButtons slot="secondary">
            <IonButton onClick={() => toggleSettingsModal()}>CLOSE</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonContent>
    </IonModal>
  );
};

export default SettingsModal;
