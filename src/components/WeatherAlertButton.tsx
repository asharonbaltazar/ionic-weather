import React, { useState } from "react";
import { IonIcon, IonItem, IonLabel } from "@ionic/react";
import {
  alertCircleOutline,
  alertCircleSharp,
  closeOutline,
  closeSharp,
} from "ionicons/icons";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import "../css/alert.css";

const WeatherAlert = () => {
  // hidden alert state
  const [alertDisplay, setAlertDisplay] = useState(false);
  const weather = useSelector(
    (state: RootState) => state.weatherSlice.selectedWeather.weather
  );

  return (
    <>
      {weather?.alerts && (
        <IonItem
          className={alertDisplay ? "alert-hidden" : ""}
          color="danger"
          button
          detail={false}
        >
          <IonIcon
            slot="start"
            md={alertCircleSharp}
            ios={alertCircleOutline}
          />
          <IonLabel>{weather.alerts[0].sender_name}</IonLabel>
          <IonIcon
            md={closeSharp}
            ios={closeOutline}
            onClick={() => setAlertDisplay(prevState => !prevState)}
          />
        </IonItem>
      )}
    </>
  );
};

export default WeatherAlert;
