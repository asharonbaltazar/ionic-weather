import React, { useContext } from "react";
import { IonGrid, IonRow } from "@ionic/react";
import MainWeatherCard from "./MainWeatherCard";
import DaysSegment from "./DaysSegment";
import WeatherCarousel from "./WeatherCarousel";
import { AppContext } from "../context/app-context";
import AdditionalInfo from "./AdditionalInfo";

const WeatherContent = () => {
  const { segmentCarouselOption } = useContext(AppContext);

  return (
    <IonGrid className="ion-no-margin">
      <IonRow>
        <MainWeatherCard />
      </IonRow>
      <IonRow>
        <DaysSegment />
        <WeatherCarousel key={segmentCarouselOption} />
      </IonRow>
      <IonRow>
        <AdditionalInfo />
      </IonRow>
    </IonGrid>
  );
};

export default WeatherContent;
