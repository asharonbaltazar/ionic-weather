import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { IonItem, IonLabel, IonSelectOption, IonSelect } from "@ionic/react";
import { changeTempPreference } from "../../slices/settingsSlice";

const TempPreference = () => {
  const selectedTemp = useSelector(
    (state: RootState) => state.settingsSlice.tempPreference
  );

  const dispatch = useDispatch();

  return (
    <IonItem>
      <IonLabel>Temperature:</IonLabel>
      <IonSelect
        interface="alert"
        interfaceOptions={{
          header: "Units",
        }}
        value={selectedTemp}
        onIonChange={e => dispatch(changeTempPreference(e.detail.value))}
      >
        <IonSelectOption value="celsius">Celsius</IonSelectOption>
        <IonSelectOption value="fahrenheit">Fahrenheit</IonSelectOption>
        <IonSelectOption value="kelvin">Kelvin</IonSelectOption>
      </IonSelect>
    </IonItem>
  );
};

export default TempPreference;
