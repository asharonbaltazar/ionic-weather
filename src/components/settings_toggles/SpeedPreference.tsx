import React from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store";
import { RootState } from "../../store";
import { IonItem, IonLabel, IonSelectOption, IonSelect } from "@ionic/react";
import { changeWindSpeedPreference } from "../../slices/settingsSlice";

const SpeedPreference = () => {
  const windSpeedPreference = useSelector(
    (state: RootState) => state.settingsSlice.windSpeedPreference
  );

  const dispatch = useAppDispatch();

  return (
    <IonItem>
      <IonLabel>Wind Speed:</IonLabel>
      <IonSelect
        interface="alert"
        interfaceOptions={{
          header: "Units",
        }}
        value={windSpeedPreference}
        onIonChange={e => dispatch(changeWindSpeedPreference(e.detail.value))}
      >
        <IonSelectOption value="kilometers">Kilometers</IonSelectOption>
        <IonSelectOption value="miles">Miles</IonSelectOption>
      </IonSelect>
    </IonItem>
  );
};

export default SpeedPreference;
