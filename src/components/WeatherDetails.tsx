import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@store';
import { formatSpeed, formatTemp, getUviIndex } from '@utilities/format';
import dayjs from 'dayjs';

interface IProps {
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
  const selectedSpeed = useSelector(
    (state: RootState) => state.settingsSlice.windSpeedPreference
  );

  const selectedTemp = useSelector(
    (state: RootState) => state.settingsSlice.tempPreference
  );

  const selectedTime = useSelector(
    (state: RootState) => state.settingsSlice.timePreference
  );

  const exactTime = selectedTime === 'h a' ? 'h:mm a' : 'HH:mm';

  return (
    <div className="grid grid-cols-2 gap-y-1">
      <h5>Humidity</h5>
      <h5 className="place-self-end">{humidity}%</h5>
      <h5>Pressure</h5>
      <h5 className="place-self-end">{pressure} mBar</h5>
      {dew_point && (
        <>
          <h5>Dew point</h5>
          <h5 className="place-self-end">
            {formatTemp[selectedTemp](dew_point)}°
          </h5>
        </>
      )}
      {typeof uvi === 'number' && (
        <>
          <h5>UVI index</h5>
          <h5 className="place-self-end">{`${getUviIndex(uvi)}, ${Math.ceil(
            uvi
          )}`}</h5>
        </>
      )}
      {wind_speed && (
        <>
          <h5>Wind</h5>
          <h5 className="place-self-end">
            {formatSpeed[selectedSpeed](wind_speed)}
            {`${selectedSpeed === 'kilometers' ? 'km/h' : 'mph'} ${compass}`}
          </h5>
        </>
      )}
      {pop && pop > 0.1 ? (
        <>
          <h5>Chance of rain</h5>
          <h5 className="place-self-end">{Math.floor(pop * 100)}%</h5>
        </>
      ) : null}
      {sunrise && sunset && (
        <>
          <h5>Sunrise/sunset</h5>
          <h5 className="place-self-end">{`${dayjs(sunrise).format(
            exactTime
          )}, ${dayjs(sunset).format(exactTime)}`}</h5>
        </>
      )}
    </div>
  );
};

export default WeatherDetails;
