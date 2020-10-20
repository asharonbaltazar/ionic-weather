import React from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { IonContent } from "@ionic/react";
import WeatherContent from "../components/WeatherContent";

const Main = () => {
  const { selectedWeather } = useSelector(
    (state: RootStateOrAny) => state.weather
  );
  return selectedWeather.hasOwnProperty("weather") ? (
    <IonContent>
      <WeatherContent />
    </IonContent>
  ) : (
    <></>
  );
};

export default Main;
