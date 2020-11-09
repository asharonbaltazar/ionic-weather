import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { IonGrid, IonRow } from "@ionic/react";
import MainWeatherCard from "./MainWeatherCard";
import WeatherCarousel from "./WeatherCarousel";
import { AppContext } from "../context/app-context";
import DaysSegment from "./DaysSegment";
import RainChip from "./RainChip";

const WeatherContent = () => {
  const { segmentCarouselOption } = useContext(AppContext);
  const { details, hourly } = useSelector(
    (state: RootState) =>
      state.weatherSlice.selectedWeather.weather[segmentCarouselOption]
  );

  return (
    <IonGrid>
      <IonRow>
        <MainWeatherCard details={details} />
        <RainChip pop={details.pop} />
      </IonRow>
      <IonRow>
        <DaysSegment />
        <WeatherCarousel key={segmentCarouselOption} hourly={hourly} />
      </IonRow>
    </IonGrid>
  );
};

export default WeatherContent;
