import React, { useContext } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import {
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonTitle,
} from "@ionic/react";
import { searchSharp, search, settings, settingsSharp } from "ionicons/icons";
import { AppContext } from "../context/app-context";

const Toolbar = () => {
  const { address } = useSelector(
    (state: RootStateOrAny) => state.weather.selectedWeather
  );

  const { toggleSettingsModal, toggleSearchModal } = useContext(AppContext);

  return (
    <IonToolbar>
      <IonTitle>{address ? address : "Ionic Weather"}</IonTitle>
      <IonButtons slot="end">
        <IonButton onClick={() => toggleSearchModal()}>
          <IonIcon slot="icon-only" md={searchSharp} ios={search} />
        </IonButton>
        <IonButton onClick={() => toggleSettingsModal()}>
          <IonIcon slot="icon-only" md={settingsSharp} ios={settings} />
        </IonButton>
      </IonButtons>
    </IonToolbar>
  );
};

export default Toolbar;
