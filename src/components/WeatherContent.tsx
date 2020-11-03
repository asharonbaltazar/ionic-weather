import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { IonGrid, IonRow } from "@ionic/react";
import MainWeatherCard from "./MainWeatherCard";
import WeatherCarousel from "./WeatherCarousel";
import { AppContext } from "../context/app-context";
import DaysSegment from "./DaysSegment";

const WeatherContent = () => {
  const { segmentCarouselOption } = useContext(AppContext);
  const { details, hourly } = useSelector(
    (state: RootState) =>
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
    </IonGrid>
  );
};

export default WeatherContent;
