import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import Toolbar from "../components/Toolbar";
import WeatherContent from "../components/WeatherContent";
import MainPagePlaceholder from "../components/MainPagePlaceholder";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import "../css/main.css";

const Main = () => {
  const { selectedWeather } = useSelector((state: RootState) => state.weather);
  return (
    <IonPage>
      <Toolbar address={selectedWeather.address} />
      <IonContent>
        {selectedWeather.hasOwnProperty("weather") ? (
          <WeatherContent />
        ) : (
          <MainPagePlaceholder />
        )}
      </IonContent>
    </IonPage>
  );
};

export default Main;
