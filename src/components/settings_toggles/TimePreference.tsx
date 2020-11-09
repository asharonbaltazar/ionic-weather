import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { IonItem, IonLabel, IonToggle } from "@ionic/react";
import { changeTimePreference } from "../../slices/settingsSlice";

const TempPreference = () => {
  const timePreference = useSelector(
    (state: RootState) => state.settingsSlice.timePreference
  );
  const dispatch = useDispatch();

  const checked = timePreference === "HH:mm";

  return (
    <IonItem>
      <IonLabel>24 hour format: </IonLabel>
      <IonToggle
        checked={checked}
        value={checked ? "on" : "off"}
        onIonChange={() =>
          dispatch(changeTimePreference(checked ? "h a" : "HH:mm"))
        }
      />
    </IonItem>
  );
};

export default TempPreference;
