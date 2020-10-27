import React from "react";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { IonItem, IonLabel, IonSelectOption, IonSelect } from "@ionic/react";
import { changeWindSpeedPreference } from "../../slices/settingsSlice";

const SpeedPreference = () => {
  const windSpeedPreference = useSelector(
    (state: RootStateOrAny) => state.settings.windSpeedPreference
  );

  const dispatch = useDispatch();

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
