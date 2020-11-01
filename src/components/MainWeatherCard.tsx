import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { formatTemp, formatSpeed } from "../utilities/format";
import "../css/weather-card.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(relativeTime);
dayjs.extend(isBetween);

interface IProps {
  details: {
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
    wind_deg: number;
    weather: [
      {
        id: number;
        main: string;
        description: string;
        icon: string;
      }
    ];
    clouds: number;
    pop: number;
    rain: number;
    uvi: number;
  };
}

const MainWeatherCard = ({
  details: {
    dt,
    sunrise,
    sunset,
    temp,
    feels_like,
    humidity,
    pressure,
    wind_speed,
    wind_deg,
    weather: [{ id, description }],
  },
}: IProps) => {
  // Temperature unit from settings
  const selectedTemp = useSelector(
    (state: RootState) => state.settings.tempPreference
  );
  // Windspeed unit from settings
  const selectedSpeed = useSelector(
    (state: RootState) => state.settings.windSpeedPreference
  );
  // Icon string
  const icon = dayjs(dt).isBetween(sunrise, sunset) ? "day" : "night";

  return (
    <div className="card ion-margin-start ion-margin-end">
      <h5>{dayjs(dt).format("dddd, MMMM DD")}</h5>
      <div className="card-div">
        <div className="i-row">
          <i
            className={`wi wi-owm-${icon}-${id} weather-icon`}
            color="primary"
          ></i>
        </div>

        <div className="top-row">
          <h1 className="temp-title">{formatTemp[selectedTemp](temp.day)}°</h1>
          <h4 className="temp-subtitle">
            feels like {formatTemp[selectedTemp](feels_like.day)}°
          </h4>
          <h1 className="desc-title">
            {description.charAt(0).toUpperCase() + description.slice(1)}
          </h1>
        </div>
        <div className="bottom-row">
          <div>
            <h5>Humidity</h5>
            <h5>{humidity}%</h5>
          </div>
          <div>
            <h5>Pressure</h5>
            <h5>{pressure}</h5>
          </div>
          <div>
            <h5>Wind Speed</h5>
            <h5>
              {formatSpeed[selectedSpeed](wind_speed)}
              {selectedSpeed === "kilometers" ? "km/h" : "mph"}
              <p>
                <i className={`wi wi-wind towards-${wind_deg}-deg`}></i>
              </p>
            </h5>
          </div>
        </div>
      </div>
      <div className="details-div"></div>
    </div>
  );
};

// {pop && pop > 0 ? (
//   <p className="pop">{Math.floor(pop * 100)}%</p>
// ) : (
//   <div className="pop"></div>
// )}

export default MainWeatherCard;
