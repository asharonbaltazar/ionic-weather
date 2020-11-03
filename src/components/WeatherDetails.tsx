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
  wind_speed: number;
  wind_deg?: number;
  pop?: number;
}

const WeatherDetails = ({
  class_name,
  sunrise,
  sunset,
  humidity,
  pressure,
  wind_speed,
  wind_deg,
  pop,
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
  const exact_time = selectedTime === "h a" ? "h:mm a" : "HH:mm";

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
      <div>
        <h5>Wind</h5>
        <h5>
          {formatSpeed[selectedSpeed](wind_speed)}
          {selectedSpeed === "kilometers" ? "km/h" : "mph"}
          <p>
            <i className={`wi wi-wind towards-${wind_deg}-deg`}></i>
          </p>
        </h5>
      </div>
      {pop && pop > 0 ? (
        <div>
          <h5>Chance of rain</h5>
          <h5 className="pop">{Math.floor(pop * 100)}%</h5>
        </div>
      ) : null}
      {sunrise && sunset ? (
        <div>
          <h5>Sunrise/sunset</h5>
          <h5>{`${dayjs(sunrise).format(exact_time)}, ${dayjs(sunset).format(
            exact_time
          )}`}</h5>
        </div>
      ) : null}
    </div>
  );
};

export default WeatherDetails;
