import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import Toolbar from "../components/Toolbar";
import MainWeatherContent from "../components/MainWeatherContent";
import MainPagePlaceholder from "../components/MainPagePlaceholder";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import "../css/main.css";

const Main = () => {
  const { selectedWeather } = useSelector((state: RootState) => state.weather);
  return (
    <IonPage className="main">
      <Toolbar address={selectedWeather.address} />
      <IonContent>
        {selectedWeather.hasOwnProperty("weather") ? (
          <MainWeatherContent />
        ) : (
          <MainPagePlaceholder />
        )}
      </IonContent>
    </IonPage>
  );
};

export default Main;
