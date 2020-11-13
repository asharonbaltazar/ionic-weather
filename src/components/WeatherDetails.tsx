import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { formatSpeed, formatTemp, getUviIndex } from "../utilities/format";
import dayjs from "dayjs";
import "../css/weather-details.css";

interface IProps {
  className: string;
  sunrise?: string;
  sunset?: string;
  humidity: number;
  pressure: number;
  dew_point?: number;
  uvi?: number;
  wind_speed?: number;
  pop?: number;
  compass?: string;
}

const WeatherDetails = ({
  className,
  sunrise,
  sunset,
  humidity,
  dew_point,
  pressure,
  uvi,
  wind_speed,
  pop,
  compass,
}: IProps) => {
  // Windspeed unit from settings
  const selectedSpeed = useSelector(
    (state: RootState) => state.settingsSlice.windSpeedPreference
  );
  // Temperature unit from settings
  const selectedTemp = useSelector(
    (state: RootState) => state.settingsSlice.tempPreference
  );
  // Time unit from settings
  const selectedTime = useSelector(
    (state: RootState) => state.settingsSlice.timePreference
  );
  // Special time formatting for <WeatherDetails />
  const exactTime = selectedTime === "h a" ? "h:mm a" : "HH:mm";

  return (
    <div className={className}>
      <div>
        <h5>Humidity</h5>
        <h5>{humidity}%</h5>
      </div>
      <div>
        <h5>Pressure</h5>
        <h5>{pressure} mBar</h5>
      </div>
      {dew_point ? (
        <div>
          <h5>Dew point</h5>
          <h5>{formatTemp[selectedTemp](dew_point)}°</h5>
        </div>
      ) : null}
      {uvi ? (
        <div>
          <h5>UVI index</h5>
          <h5>{`${getUviIndex(uvi)}, ${Math.ceil(uvi)}`}</h5>
        </div>
      ) : null}
      {wind_speed ? (
        <div>
          <h5>Wind</h5>
          <h5>
            {formatSpeed[selectedSpeed](wind_speed)}
            {`${selectedSpeed === "kilometers" ? "km/h" : "mph"} ${compass}`}
          </h5>
        </div>
      ) : null}
      {pop && pop > 0.1 ? (
        <div>
          <h5>Chance of rain</h5>
          <h5 className="pop">{Math.floor(pop * 100)}%</h5>
        </div>
      ) : null}
      {sunrise && sunset ? (
        <div>
          <h5>Sunrise/sunset</h5>
          <h5>{`${dayjs(sunrise).format(exactTime)}, ${dayjs(sunset).format(
            exactTime
          )}`}</h5>
        </div>
      ) : null}
    </div>
  );
};

export default WeatherDetails;
