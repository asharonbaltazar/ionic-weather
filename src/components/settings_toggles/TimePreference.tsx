import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { IonItem, IonLabel, IonSelectOption, IonSelect } from "@ionic/react";
import { changeTimePreference } from "../../slices/settingsSlice";

const TempPreference = () => {
  const timePreference = useSelector(
    (state: RootState) => state.settings.timePreference
  );

  const dispatch = useDispatch();

  return (
    <IonItem>
      <IonLabel>Time standard:</IonLabel>
      <IonSelect
        interface="alert"
        interfaceOptions={{
          header: "Units",
        }}
        value={timePreference}
        onIonChange={e => dispatch(changeTimePreference(e.detail.value))}
      >
        <IonSelectOption value="h a">12 hour</IonSelectOption>
        <IonSelectOption value="HH:mm">24 hour</IonSelectOption>
      </IonSelect>
    </IonItem>
  );
};

export default TempPreference;
