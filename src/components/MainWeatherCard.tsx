import React from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
} from "@ionic/react";
import { RootStateOrAny, useSelector } from "react-redux";
import { formatTemp, formatSpeed } from "../utilities/format";
import "../css/weather-card.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const MainWeatherCard = () => {
  // Temperature unit from settings
  const selectedTemp: "celsius" | "fahrenheit" | "kelvin" = useSelector(
    (state: RootStateOrAny) => state.settings.tempPreference
  );
  const selectedSpeed: "miles" | "kilometers" = useSelector(
    (state: RootStateOrAny) => state.settings.windSpeedPreference
  );

  const {
    dt,
    sunrise,
    sunset,
    temp,
    feels_like,
    pressure,
    humidity,
    wind_speed,
    updated,
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
          <div className="additional-details">
            <h3>Humidity</h3>
            <h3>{humidity}%</h3>
          </div>
          <div className="additional-details">
            <h3>Pressure</h3>
            <h3>{pressure}</h3>
          </div>
          <div className="additional-details">
            <h3>Wind Speed</h3>
            <h3>
              {formatSpeed[selectedSpeed](wind_speed)}{" "}
              {selectedSpeed === "kilometers" ? "km/h" : "mph"}
            </h3>
          </div>
          <h6>Updated: {dayjs(updated).fromNow()}</h6>
        </IonCardContent>
      </div>
    </IonCard>
  );
};

export default MainWeatherCard;
