import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { IonGrid, IonRow, IonChip } from "@ionic/react";
import MainWeatherCard from "./MainWeatherCard";
import WeatherCarousel from "./WeatherCarousel";
import { AppContext } from "../context/app-context";
import DaysSegment from "./DaysSegment";

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
        {details.pop && details.pop > 0 ? (
          <IonChip
            className="pop-chip ion-padding-start ion-padding-end"
            color="primary"
          >
            <h5>Chance of rain</h5>
            <h5>{Math.floor(details.pop * 100)}%</h5>
          </IonChip>
        ) : (
          <div style={{ height: "32px", margin: "10px 0" }}></div>
        )}
      </IonRow>
      <IonRow>
        <DaysSegment />
        <WeatherCarousel key={segmentCarouselOption} hourly={hourly} />
      </IonRow>
    </IonGrid>
  );
};

export default WeatherContent;
