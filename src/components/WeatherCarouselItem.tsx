import React from "react";
import { useSelector, RootStateOrAny } from "react-redux";
import { IonSlide, IonCard } from "@ionic/react";
import {
  formatTemp,
  formatIconTime,
  timeIsWithinTimes,
} from "../utilities/format";
import dayjs from "dayjs";
import "../css/carousel-item.css";

interface IProps {
  time: string;
  temp: number;
  weather: { description: string; id: string }[];
  pop?: number;
}

const WeatherCarouselItem = ({
  time,
  temp,
  weather: [{ description, id }],
  pop,
}: IProps) => {
  // Temperature unit from settings
  const selectedTemp: "celsius" | "fahrenheit" | "kelvin" = useSelector(
    (state: RootStateOrAny) => state.settings.tempPreference
  );

  // Sunrise and sunset times for icon
  const { icon_times } = useSelector(
    (state: RootStateOrAny) => state.weather.selectedWeather
  );

  // Icon string
  const icon = formatIconTime(timeIsWithinTimes(time, icon_times));

  return (
    <IonSlide className="carousel-item">
      <IonCard color="primary">
        <div>
          <p>{dayjs(time).format("hh:mm a")}</p>
          <p>{dayjs(time).format("dddd")}</p>
        </div>
        <div>
          <h1>{formatTemp[selectedTemp](temp)}°</h1>
          <i className={`wi wi-owm-${icon}-${id} weather-icon`}></i>
        </div>
        <div>
          {pop && pop > 0 ? (
            <p className="pop">{Math.floor(pop * 100)}%</p>
          ) : (
            <div className="pop"></div>
          )}
          <p>{description.charAt(0).toUpperCase() + description.slice(1)}</p>
        </div>
      </IonCard>
    </IonSlide>
  );
};

export default WeatherCarouselItem;
