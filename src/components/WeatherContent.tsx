import React, { useContext } from "react";
import { useSelector, RootStateOrAny } from "react-redux";
import { IonGrid, IonRow } from "@ionic/react";
import MainWeatherCard from "./MainWeatherCard";
import WeatherCarousel from "./WeatherCarousel";
import { AppContext } from "../context/app-context";
import AdditionalInfo from "./AdditionalInfo";
import DaysSegment from "./DaysSegment";

const WeatherContent = () => {
  const { segmentCarouselOption } = useContext(AppContext);
  const { details, hourly } = useSelector(
    (state: RootStateOrAny) =>
      state.weather.selectedWeather.weather[segmentCarouselOption]
  );

  return (
    <IonGrid className="ion-no-margin">
      <IonRow>
        <MainWeatherCard details={details} />
      </IonRow>
      <IonRow>
        <DaysSegment />
        <WeatherCarousel key={segmentCarouselOption} hourly={hourly} />
      </IonRow>
      <IonRow>
        <AdditionalInfo />
      </IonRow>
    </IonGrid>
  );
};

export default WeatherContent;
