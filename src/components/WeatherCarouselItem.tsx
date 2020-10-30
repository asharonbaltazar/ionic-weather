import React from "react";
import { useSelector, RootStateOrAny } from "react-redux";
import { IonSlide } from "@ionic/react";
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
  weather: [{ id }],
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
      <div>
        <div>
          <h4>{formatTemp[selectedTemp](temp)}°</h4>
          <i className={`wi wi-owm-${icon}-${id} weather-icon`}></i>
        </div>
        <div>
          <p>{dayjs(time).format("hh:mm a")}</p>
        </div>
      </div>
    </IonSlide>
  );
};

export default WeatherCarouselItem;
