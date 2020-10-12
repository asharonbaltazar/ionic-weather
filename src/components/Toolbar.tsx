import React from "react";
import { IonToolbar, IonButtons, IonButton, IonIcon } from "@ionic/react";
import { searchSharp, search, settings, settingsSharp } from "ionicons/icons";

const Toolbar = () => {
  return (
    <IonToolbar>
      <IonButtons slot="primary">
        <IonButton>
          <IonIcon slot="icon-only" md={searchSharp} ios={search} />
        </IonButton>
      </IonButtons>
      <IonButtons>
        <IonButton>
          <IonIcon slot="icon-only" md={settingsSharp} ios={settings} />
        </IonButton>
      </IonButtons>
    </IonToolbar>
  );
};

export default Toolbar;
