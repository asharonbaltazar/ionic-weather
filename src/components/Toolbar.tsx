import React, { useContext } from "react";
import {
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonTitle,
  IonHeader,
} from "@ionic/react";
import { searchSharp, search, settings, settingsSharp } from "ionicons/icons";
import { AppContext } from "../context/app-context";

const Toolbar = () => {
  const { toggleSettingsModal, toggleSearchModal } = useContext(AppContext);

  return (
    <IonHeader translucent={true}>
      <IonToolbar>
        {/* <IonButtons slot="start">
          <IonButton onClick={() => toggleSettingsModal()}>
            <IonIcon slot="icon-only" md={settingsSharp} ios={settings} />
          </IonButton>
        </IonButtons> */}
        <IonTitle>Ionic Weather</IonTitle>
        <IonButtons slot="end">
          <IonButton onClick={() => toggleSearchModal()}>
            <IonIcon slot="icon-only" md={searchSharp} ios={search} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Toolbar;
