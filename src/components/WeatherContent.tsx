import React from "react";
import { IonGrid, IonRow } from "@ionic/react";
import MainWeatherCard from "./MainWeatherCard";
import DaysSegment from "./DaysSegment";
import WeatherCarousel from "./WeatherCarousel";
import AdditionalInfo from "./AdditionalInfo";

const WeatherContent = () => {
  return (
    <IonGrid className="ion-no-margin">
      <IonRow>
        <MainWeatherCard />
      </IonRow>
      <IonRow>
        <DaysSegment />
        <WeatherCarousel />
      </IonRow>
      <IonRow>
        <AdditionalInfo />
      </IonRow>
    </IonGrid>
  );
};

export default WeatherContent;
