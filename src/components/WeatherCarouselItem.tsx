import React from "react";
import {
  IonSlide,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import "../css/carousel-item.css";

const WeatherCarouselItem = () => {
  return (
    <IonSlide className="carousel-item">
      <IonCard color="primary">
        <IonCardHeader>
          <IonCardSubtitle>10:10pm</IonCardSubtitle>
          <IonCardTitle>21</IonCardTitle>
          <IonCardSubtitle>Cloudy</IonCardSubtitle>
        </IonCardHeader>
      </IonCard>
    </IonSlide>
  );
};

export default WeatherCarouselItem;
