import React from 'react';
import WeatherDetails from '@components/WeatherDetails';
import AlertButton from '@components/AlertButton';
import { useSelector } from 'react-redux';
import { RootState } from '@store';
import { formatTemp } from '@utilities/format';
import { Details } from '../../interface';
import '../css/weather-card.css';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

interface IProps {
  details: Details;
}

const WeatherCard = ({
  details: {
    dt,
    sunrise,
    sunset,
    temp,
    feels_like,
    humidity,
    uvi,
    pressure,
    dew_point,
    weather: [{ id, description }],
  },
}: IProps) => {
  // Temperature unit from settings
  const selectedTemp = useSelector(
    (state: RootState) => state.settingsSlice.tempPreference
  );
  // Icon string
  const icon = dayjs(dt).isBetween(sunrise, sunset) ? 'day' : 'night';

  return (
    <div className="card">
      <AlertButton />
      <h5>{dayjs(dt).format('dddd, MMMM D')}</h5>
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
          className={'bottom-row'}
          humidity={humidity}
          pressure={pressure}
          uvi={uvi}
          dew_point={dew_point}
        />
      </div>
    </div>
  );
};

export default WeatherCard;
