import React, { useState } from "react";
import { IonCol, IonGrid, IonItem, IonRow, IonText } from "@ionic/react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import "../css/next-week-card.css";
import { formatTemp } from "../utilities/format";
import isBetween from "dayjs/plugin/isBetween";
import dayjs from "dayjs";
import WeatherDetails from "./WeatherDetails";
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
  compass?: string;
}

const NextWeekCard = ({
  dt,
  sunrise,
  sunset,
  temp,
  humidity,
  pressure,
  wind_speed,
  pop,
  weather: [{ description }],
  compass,
}: IProps) => {
  // Expand-to-show-more-details state
  const [pressed, setPressed] = useState(false);

  const selectedTemp = useSelector(
    (state: RootState) => state.settings.tempPreference
  );

  return (
    <IonItem
      className="next-week-item"
      button
      detail={false}
      slot="start"
      lines="full"
      onClick={() => setPressed(prevState => !prevState)}
    >
      <IonGrid className="ion-no-padding">
        <IonRow>
          <IonCol>
            <IonText>
              <h5 className="next-week-title">
                {dayjs(dt).format("dddd, MMMM D")}
              </h5>
            </IonText>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonText className="ion-text-nowrap">
              <h2>
                {description.charAt(0).toUpperCase() + description.slice(1)}
              </h2>
            </IonText>
          </IonCol>
          <IonCol>
            <IonText className="next-week-item-temps">
              <h2>{formatTemp[selectedTemp](temp.max)}°</h2>
              <p>{formatTemp[selectedTemp](temp.min)}°</p>
            </IonText>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <WeatherDetails
              class_name={`bottom-row${pressed ? " pressed" : ""}`}
              sunrise={sunrise}
              sunset={sunset}
              humidity={humidity}
              pressure={pressure}
              wind_speed={wind_speed}
              pop={pop}
              compass={compass}
            />
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonItem>
  );
};

export default NextWeekCard;
