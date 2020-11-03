import React, { useState } from "react";
import {
  IonCol,
  IonGrid,
  IonItem,
  IonLabel,
  IonRow,
  IonText,
} from "@ionic/react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import "../css/next-week-card.css";
import { formatTemp, formatSpeed } from "../utilities/format";
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
  humidity,
  pressure,
  wind_speed,
  pop,
  weather: [{ id, description }],
}: IProps) => {
  const [pressed, setPressed] = useState(false);

  const selectedTemp = useSelector(
    (state: RootState) => state.settings.tempPreference
  );
  const selectedSpeed = useSelector(
    (state: RootState) => state.settings.windSpeedPreference
  );

  // Icon string
  // const icon = dayjs(dt).isBetween(sunrise, sunset) ? "day" : "night";

  return (
    <>
      <h6 className="next-week-title">{dayjs(dt).format("dddd, MMMM D")}</h6>
      <IonItem
        className="next-week-item ion-no-padding"
        button
        detail={false}
        slot="start"
        lines="full"
        onClick={() => setPressed(prevState => !prevState)}
      >
        <IonGrid className="ion-no-padding">
          <IonRow>
            <IonCol>
              <IonLabel className="first-label">
                <IonText>
                  <h2>
                    {description.charAt(0).toUpperCase() + description.slice(1)}
                  </h2>
                </IonText>
              </IonLabel>
            </IonCol>
            <IonCol>
              <IonLabel className="second-label">
                <IonText className="next-week-item-temps">
                  <h1>{formatTemp[selectedTemp](temp.max)}°</h1>
                  <p>{formatTemp[selectedTemp](temp.min)}°</p>
                </IonText>
              </IonLabel>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <div className={`bottom-row${pressed ? " pressed" : ""}`}>
                <div>
                  <h5>Humidity</h5>
                  <h5>{humidity}%</h5>
                </div>
                <div>
                  <h5>Pressure</h5>
                  <h5>{pressure}</h5>
                </div>
                <div>
                  <h5>Wind</h5>
                  <h5>
                    {formatSpeed[selectedSpeed](wind_speed)}
                    {selectedSpeed === "kilometers" ? "km/h" : "mph"}
                  </h5>
                </div>
                {pop && pop > 0 ? (
                  <div>
                    <h5>Chance of rain</h5>
                    <h5 className="pop">{Math.floor(pop * 100)}%</h5>
                  </div>
                ) : null}
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonItem>
    </>
  );
};

//<i className={`wi wi-fw wi-owm-${icon}-${id} weather-icon`}></i>

export default NextWeekCard;
