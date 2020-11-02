import React from "react";
import { IonItem, IonLabel, IonText } from "@ionic/react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import "../css/next-week-card.css";
import { formatTemp } from "../utilities/format";
import isBetween from "dayjs/plugin/isBetween";
import dayjs from "dayjs";
dayjs.extend(isBetween);

interface IProps {
  dt: string;
  sunrise: string;
  sunset: string;
  temp: {
    [key: string]: number;
  };
  feels_like: {
    [key: string]: number;
  };
  pressure: number;
  humidity: number;
  wind_speed: number;
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  pop: number;
  uvi: number;
}

const NextWeekCard = ({
  dt,
  sunrise,
  sunset,
  temp,
  feels_like,
  weather: [{ id, description }],
}: IProps) => {
  const selectedTemp = useSelector(
    (state: RootState) => state.settings.tempPreference
  );
  // Windspeed unit from settings
  // const selectedSpeed = useSelector(
  //   (state: RootState) => state.settings.windSpeedPreference
  // );

  // Icon string
  const icon = dayjs(dt).isBetween(sunrise, sunset) ? "day" : "night";

  return (
    <>
      <h6 className="next-week-title">{dayjs(dt).format("dddd, MMMM D")}</h6>
      <IonItem
        className="next-week-item ion-no-padding"
        button
        detail={false}
        slot="start"
        lines="full"
      >
        <IonLabel slot="start">
          <IonText>
            {description.charAt(0).toUpperCase() + description.slice(1)}
          </IonText>
        </IonLabel>

        <IonLabel className="ion-text-wrap">
          <div className="next-week-item-temps">
            <p>
              <b>{formatTemp[selectedTemp](temp.max)}°</b>
            </p>
            <p>{formatTemp[selectedTemp](temp.min)}°</p>
          </div>
          <i className={`wi wi-fw wi-owm-${icon}-${id} weather-icon`}></i>
        </IonLabel>
      </IonItem>
    </>
  );
};

export default NextWeekCard;
