import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
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
  const selectedTemp = useSelector(
    (state: RootState) => state.settings.tempPreference
  );
  // Time unit from settings
  const selectedTime = useSelector(
    (state: RootState) => state.settings.timePreference
  );
  // Sunrise and sunset times for icon
  const { icon_times } = useSelector(
    (state: RootState) => state.weather.selectedWeather
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
          <p>{dayjs(time).format(selectedTime)}</p>
        </div>
      </div>
    </IonSlide>
  );
};

export default WeatherCarouselItem;
