import React, { useContext } from "react";
import { IonItem, IonLabel, IonSelectOption, IonSelect } from "@ionic/react";
import { AppContext } from "../../context/app-context";

const TempPreference = () => {
  const { tempActionSheetUnit, toggleTempActionSheet } = useContext(AppContext);
  return (
    <IonItem>
      <IonLabel>Temperature:</IonLabel>
      <IonSelect
        interface="action-sheet"
        interfaceOptions={{
          header: "Units",
        }}
        value={tempActionSheetUnit}
        onIonChange={e => toggleTempActionSheet(e.detail.value)}
      >
        <IonSelectOption value="celsius">Celsius</IonSelectOption>
        <IonSelectOption value="fahrenheit">Fahrenheit</IonSelectOption>
        <IonSelectOption value="kelvin">Kelvin</IonSelectOption>
      </IonSelect>
    </IonItem>
  );
};

export default TempPreference;
