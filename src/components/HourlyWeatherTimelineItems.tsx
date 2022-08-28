import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@store';
import {
  formatTemp,
  formatIconTime,
  timeIsWithinTimes,
} from '@utilities/format';
import dayjs from 'dayjs';

interface HourlyWeatherTimelineItemsProps {
  day: 'today' | 'tomorrow';
}

export const HourlyWeatherTimelineItems = ({
  day,
}: HourlyWeatherTimelineItemsProps) => {
  const { weather } = useSelector(
    (state: RootState) => state.weatherSlice.selectedWeather
  );

  const { hourly } = weather[day];

  const { tempPreference, timePreference } = useSelector(
    (state: RootState) => state.settingsSlice
  );

  const { iconTimes } = useSelector(
    (state: RootState) => state.weatherSlice.selectedWeather
  );

  return (
    <>
      {hourly.map(({ weather, temp, dt }, index) => (
        <li key={index}>
          {dayjs(dt).format(timePreference)}
          <i
            className={`wi wi-owm-${formatIconTime(
              timeIsWithinTimes(dt, iconTimes)
            )}-${weather[0].id} weather-icon text-blue-500`}
          />
          <span className="text-gray-400">
            {formatTemp[tempPreference](temp)}°
          </span>
        </li>
      ))}
    </>
  );
};
