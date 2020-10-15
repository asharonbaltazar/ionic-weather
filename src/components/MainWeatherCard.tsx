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
import "../css/weather-card.css";

const MainWeatherCard = () => {
  return (
    <IonCard className="card" color="primary">
      <IonCardSubtitle className="date">
        Wednesday, October 14th
      </IonCardSubtitle>
      <div className="card-div">
        <IonCardHeader className="desc">
          <IonCardTitle>
            <IonIcon className="desc-icon" icon={cloud} />
          </IonCardTitle>
          <IonCardTitle className="desc-title">Cloudy</IonCardTitle>
        </IonCardHeader>
        <IonCardHeader className="temp">
          <IonCardTitle className="temp-title">21°</IonCardTitle>
          <IonCardSubtitle className="temp-subtitle">
            feels like 19°
          </IonCardSubtitle>
        </IonCardHeader>
      </div>
      <div className="details-div">
        <IonCardContent>
          <h3>Humidity</h3>
          <h3>Pressure</h3>
          <h3>Wind Speed</h3>
        </IonCardContent>
      </div>
    </IonCard>
  );
};

export default MainWeatherCard;
