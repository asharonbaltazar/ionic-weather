import React from "react";
import { IonItem, IonLabel, IonToggle } from "@ionic/react";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { changeVibrationPreference } from "../../slices/settingsSlice";

const VibationPreference = () => {
  const dispatch = useDispatch();
  const vibrationOption = useSelector(
    (state: RootStateOrAny) => state.settings.vibrationPreference
  );
  return (
    <IonItem>
      <IonLabel>Vibrate when weather loads:</IonLabel>
      <IonToggle
        checked={vibrationOption}
        value={vibrationOption}
        onIonChange={() => dispatch(changeVibrationPreference())}
      />
    </IonItem>
  );
};

export default VibationPreference;
