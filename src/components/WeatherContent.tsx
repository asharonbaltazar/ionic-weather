import React from "react";
import { IonGrid, IonRow } from "@ionic/react";
import MainWeatherCard from "./MainWeatherCard";
import DaysSegment from "./DaysSegment";

const WeatherContent = () => {
  return (
    <IonGrid className="ion-no-margin">
      <IonRow>
        <MainWeatherCard />
      </IonRow>
      <IonRow>
        <DaysSegment />
      </IonRow>
    </IonGrid>
  );
};

export default WeatherContent;
