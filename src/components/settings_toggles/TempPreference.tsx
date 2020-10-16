import React, { useContext } from "react";
import { IonItem, IonLabel, IonSelectOption, IonSelect } from "@ionic/react";
import { AppContext } from "../../context/app-context";

const TempPreference = () => {
  const { toggleTempActionSheet } = useContext(AppContext);
  return (
    <IonItem>
      <IonLabel>Temperature Unit:</IonLabel>
      <IonSelect
        interface="action-sheet"
        value="Celsius"
        onClick={() => toggleTempActionSheet()}
      >
        <IonSelectOption value="metric">Celsius</IonSelectOption>
        <IonSelectOption value="imperial">Fahrenheit</IonSelectOption>
        <IonSelectOption value="">Kelvin</IonSelectOption>
      </IonSelect>
    </IonItem>
  );
};

export default TempPreference;
