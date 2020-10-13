import React, { useContext } from "react";
import { IonToolbar, IonButtons, IonButton, IonIcon } from "@ionic/react";
import { searchSharp, search, settings, settingsSharp } from "ionicons/icons";
import { AppContext } from "../context/app-context";

const Toolbar = () => {
  const { toggleSettingsModal, toggleSearchModal } = useContext(AppContext);

  return (
    <IonToolbar>
      <IonButtons slot="primary">
        <IonButton onClick={() => toggleSearchModal()}>
          <IonIcon slot="icon-only" md={searchSharp} ios={search} />
        </IonButton>
      </IonButtons>
      <IonButtons>
        <IonButton onClick={() => toggleSettingsModal()}>
          <IonIcon slot="icon-only" md={settingsSharp} ios={settings} />
        </IonButton>
      </IonButtons>
    </IonToolbar>
  );
};

export default Toolbar;
