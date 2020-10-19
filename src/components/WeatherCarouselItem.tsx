import React from "react";
import {
  IonSlide,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import dayjs from "dayjs";
import "../css/carousel-item.css";

interface IProps {
  time: string;
  temp: number;
  weather: { description: string }[];
}

const WeatherCarouselItem = ({
  time,
  temp,
  weather: [{ description }],
}: IProps) => {
  return (
    <IonSlide className="carousel-item">
      <IonCard color="primary">
        <IonCardHeader>
          <IonCardSubtitle>{dayjs(time).format("hh:mm a")}</IonCardSubtitle>
          <IonCardTitle>{temp}°</IonCardTitle>
          <IonCardSubtitle>
            {description.charAt(0).toUpperCase() + description.slice(1)}
          </IonCardSubtitle>
        </IonCardHeader>
      </IonCard>
    </IonSlide>
  );
};

export default WeatherCarouselItem;
