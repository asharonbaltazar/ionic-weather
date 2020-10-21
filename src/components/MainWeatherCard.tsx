import React from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
} from "@ionic/react";
import { RootStateOrAny, useSelector } from "react-redux";
import { formatTemp } from "../utilities/format";
import "../css/weather-card.css";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

const MainWeatherCard = () => {
  // Temperature unit from settings
  const selectedTemp: "celsius" | "fahrenheit" | "kelvin" = useSelector(
    (state: RootStateOrAny) => state.settings.tempPreference
  );

  const {
    dt,
    sunrise,
    sunset,
    temp,
    feels_like,
    weather: [{ description, id }],
  } = useSelector(
    (state: RootStateOrAny) => state.weather.selectedWeather.weather.current
  );

  // Icon string
  const icon = dayjs(dt).isBetween(sunrise, sunset) ? "day" : "night";

  return (
    <IonCard className="card" color="primary">
      <IonCardSubtitle className="date">
        {dayjs().format("dddd, MMMM D")}
      </IonCardSubtitle>
      <div className="card-div">
        <IonCardHeader className="desc">
          <IonCardTitle>
            <i className={`wi wi-owm-${icon}-${id} weather-icon`}></i>
          </IonCardTitle>
          <IonCardTitle className="desc-title">
            {description.charAt(0).toUpperCase() + description.slice(1)}
          </IonCardTitle>
        </IonCardHeader>
        <IonCardHeader className="temp">
          <IonCardTitle className="temp-title">
            {formatTemp[selectedTemp](temp)}°
          </IonCardTitle>
          <IonCardSubtitle className="temp-subtitle">
            feels like {formatTemp[selectedTemp](feels_like)}°
          </IonCardSubtitle>
        </IonCardHeader>
      </div>
      <div className="details-div">
        <IonCardContent>
          <h3>Humidity</h3>
          <h3>Pressure</h3>
          <h3>Wind Speed</h3>
          <h6>Updated on: {dayjs(dt).format("hh:mm a")}</h6>
        </IonCardContent>
      </div>
    </IonCard>
  );
};

export default MainWeatherCard;
