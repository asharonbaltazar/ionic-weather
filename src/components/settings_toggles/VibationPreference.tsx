import React from "react";
import { IonItem, IonLabel, IonToggle } from "@ionic/react";
import { useAppDispatch } from "../../store";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { changeVibrationPreference } from "../../slices/settingsSlice";

const VibationPreference = () => {
  const dispatch = useAppDispatch();
  const vibrationOption = useSelector(
    (state: RootState) => state.settingsSlice.vibrationPreference
  );
  return (
    <IonItem>
      <IonLabel>Vibrate when weather loads:</IonLabel>
      <IonToggle
        checked={vibrationOption}
        value={vibrationOption ? "on" : "off"}
        onIonChange={() => dispatch(changeVibrationPreference())}
      />
    </IonItem>
  );
};

export default VibationPreference;
