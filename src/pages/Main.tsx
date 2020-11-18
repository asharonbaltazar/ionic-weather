import React from "react";
import {
  IonContent,
  IonPage,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/react";
import Toolbar from "../components/Toolbar";
import MainContent from "../components/MainContent";
import MainPagePlaceholder from "../components/MainPagePlaceholder";
import AlertModal from "../components/AlertModal";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store";
import { RootState } from "../store";
import { refreshWeatherData } from "../slices/weatherSlice";
import "../css/main.css";
import Toast from "../components/Toast";

const Main = () => {
  const dispatch = useAppDispatch();

  const weather = useSelector((state: RootState) => state.weatherSlice);

  // refresher function
  const refreshWeather = (e: CustomEvent) => {
    dispatch(refreshWeatherData());
    e.detail.complete();
  };
  return (
    <IonPage className="main">
      <Toolbar address={weather.selectedWeather.address} />
      <IonContent>
        {weather.selectedWeather?.weather ? (
          <>
            <IonRefresher slot="fixed" onIonRefresh={e => refreshWeather(e)}>
              <IonRefresherContent />
            </IonRefresher>
            <MainContent />
          </>
        ) : (
          <MainPagePlaceholder />
        )}
        <AlertModal />
        {weather.errors.map((element, index) => (
          <Toast key={index} error={element} time={3000} slice="weather" />
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Main;
