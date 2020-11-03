import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { formatTemp } from "../utilities/format";
import "../css/weather-card.css";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import WeatherDetails from "./WeatherDetails";
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
  // Icon string
  const icon = dayjs(dt).isBetween(sunrise, sunset) ? "day" : "night";

  return (
    <div className="card ion-margin-start ion-margin-end">
      <h5>{dayjs(dt).format("dddd, MMMM D")}</h5>
      <div className="card-div">
        <div className="i-row">
          <i className={`wi wi-owm-${icon}-${id} weather-icon`}></i>
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
        <WeatherDetails
          class_name={"bottom-row"}
          humidity={humidity}
          pressure={pressure}
          wind_speed={wind_speed}
          wind_deg={wind_deg}
        />
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
