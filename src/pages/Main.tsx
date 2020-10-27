import React from "react";
import { IonContent, IonIcon } from "@ionic/react";
import { searchSharp, search } from "ionicons/icons";
import { RootStateOrAny, useSelector } from "react-redux";
import WeatherContent from "../components/WeatherContent";
import "../css/main.css";

const Main = () => {
  const { selectedWeather } = useSelector(
    (state: RootStateOrAny) => state.weather
  );
  return (
    <IonContent>
      {selectedWeather.hasOwnProperty("weather") ? (
        <WeatherContent />
      ) : (
        <>
          <div className="empty-placeholder">
            <i className="wi wi-day-cloudy"></i>
            <h2>Welcome to Ionic Weather</h2>
            <h3>
              To begin, tap the <IonIcon md={searchSharp} ios={search} /> to
              search
            </h3>
          </div>
        </>
      )}
    </IonContent>
  );
};

export default Main;
