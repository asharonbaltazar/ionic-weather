import React, { useContext } from "react";
import { IonModal } from "@ionic/react";
import { AppContext } from "../context/app-context";

const SettingsModal = () => {
  const appContext = useContext(AppContext);
  const { settingsModal } = appContext;

  return <IonModal isOpen={settingsModal}></IonModal>;
};

export default SettingsModal;
