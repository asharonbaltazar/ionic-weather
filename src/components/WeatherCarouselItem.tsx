import React, { useContext } from "react";
import {
  IonSlide,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import { AppContext } from "../context/app-context";
import { format } from "../utilities/format";
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
  const { tempActionSheetUnit } = useContext(AppContext);

  return (
    <IonSlide className="carousel-item">
      <IonCard color="primary">
        <IonCardHeader>
          <IonCardSubtitle>{dayjs(time).format("hh:mm a")}</IonCardSubtitle>
          <IonCardTitle>{format[tempActionSheetUnit](temp)}°</IonCardTitle>
          <IonCardSubtitle>
            {description.charAt(0).toUpperCase() + description.slice(1)}
          </IonCardSubtitle>
        </IonCardHeader>
      </IonCard>
    </IonSlide>
  );
};

export default WeatherCarouselItem;
