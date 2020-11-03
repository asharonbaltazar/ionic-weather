import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { formatSpeed } from "../utilities/format";
import dayjs from "dayjs";

interface IProps {
  class_name: string;
  sunrise?: string;
  sunset?: string;
  humidity: number;
  pressure: number;
  wind_speed?: number;
  pop?: number;
  compass?: string;
}

const WeatherDetails = ({
  class_name,
  sunrise,
  sunset,
  humidity,
  pressure,
  wind_speed,
  pop,
  compass,
}: IProps) => {
  // Windspeed unit from settings
  const selectedSpeed = useSelector(
    (state: RootState) => state.settings.windSpeedPreference
  );
  // Time unit from settings
  const selectedTime = useSelector(
    (state: RootState) => state.settings.timePreference
  );
  // Special time formatting for <WeatherDetails />
  const exactTime = selectedTime === "h a" ? "h:mm a" : "HH:mm";

  return (
    <div className={class_name}>
      <div>
        <h5>Humidity</h5>
        <h5>{humidity}%</h5>
      </div>
      <div>
        <h5>Pressure</h5>
        <h5>{pressure}</h5>
      </div>
      {wind_speed ? (
        <div>
          <h5>Wind</h5>
          <h5>
            {formatSpeed[selectedSpeed](wind_speed)}
            {`${selectedSpeed === "kilometers" ? "km/h" : "mph"} ${compass}`}
          </h5>
        </div>
      ) : null}
      {pop && pop > 0 ? (
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
