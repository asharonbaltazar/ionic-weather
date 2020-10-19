import React from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonIcon,
  IonCardTitle,
  IonCardSubtitle,
} from "@ionic/react";
import { cloud } from "ionicons/icons";
import { RootStateOrAny, useSelector } from "react-redux";
import "../css/weather-card.css";
import dayjs from "dayjs";

const MainWeatherCard = () => {
  const {
    dt,
    temp,
    feels_like,
    weather: [{ description }],
  } = useSelector(
    (state: RootStateOrAny) => state.weather.selectedWeather.weather.current
  );

  return (
    <IonCard className="card" color="primary">
      <IonCardSubtitle className="date">
        {dayjs().format("dddd, MMMM D")}
      </IonCardSubtitle>
      <div className="card-div">
        <IonCardHeader className="desc">
          <IonCardTitle>
            <IonIcon className="desc-icon" icon={cloud} />
          </IonCardTitle>
          <IonCardTitle className="desc-title">
            {description.charAt(0).toUpperCase() + description.slice(1)}
          </IonCardTitle>
        </IonCardHeader>
        <IonCardHeader className="temp">
          <IonCardTitle className="temp-title">{temp}°</IonCardTitle>
          <IonCardSubtitle className="temp-subtitle">
            feels like {feels_like}°
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
