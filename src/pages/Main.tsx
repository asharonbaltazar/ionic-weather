import React from "react";
import {
  IonContent,
  IonPage,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/react";
import Toolbar from "../components/Toolbar";
import MainWeatherContent from "../components/MainWeatherContent";
import MainPagePlaceholder from "../components/MainPagePlaceholder";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store";
import { RootState } from "../store";
import { refreshWeatherData } from "../slices/weatherSlice";
import "../css/main.css";

const Main = () => {
  const dispatch = useAppDispatch();

  const { selectedWeather } = useSelector(
    (state: RootState) => state.weatherSlice
  );

  // refresher function
  const refreshWeather = (e: CustomEvent) => {
    dispatch(refreshWeatherData());
    e.detail.complete();
  };
  return (
    <IonPage className="main">
      <Toolbar address={selectedWeather.address} />
      <IonContent>
        {"weather" in selectedWeather ? (
          <>
            <IonRefresher slot="fixed" onIonRefresh={e => refreshWeather(e)}>
              <IonRefresherContent />
            </IonRefresher>
            <MainWeatherContent />
          </>
        ) : (
          <MainPagePlaceholder />
        )}
      </IonContent>
    </IonPage>
  );
};

export default Main;
