import React from 'react';
import WeatherDetails from '@components/WeatherDetails';
import { useSelector } from 'react-redux';
import { RootState } from '@store';
import { formatTemp } from '@utilities/format';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { RainChip } from '@components/RainChip';
import { Timeline } from '@mantine/core';
import { TimelineItemProps } from '@mantine/core';
dayjs.extend(isBetween);

interface MainWeatherProps extends TimelineItemProps {
  day: 'today' | 'tomorrow';
}

export const CurrentWeatherTimelineItem = ({
  day,
  ...timelineItemProps
}: MainWeatherProps) => {
  const selectedTemp = useSelector(
    (state: RootState) => state.settingsSlice.tempPreference
  );

  const { details } = useSelector(
    (state: RootState) => state.weatherSlice.selectedWeather.weather[day]
  );

  const {
    dt,
    sunrise,
    sunset,
    temp,
    feels_like,
    dew_point,
    humidity,
    pressure,
    uvi,
    weather,
  } = details;

  const icon = dayjs(dt).isBetween(sunrise, sunset) ? 'day' : 'night';

  return (
    <Timeline.Item
      className="text-gray-800 relative flex flex-col justify-between mt-4 pt-2"
      title="Right now"
      active
      {...timelineItemProps}
    >
      <i
        className={`wi wi-owm-${icon}-${weather[0].id} weather-icon opacity-50 text-8xl lg:text-9xl text-blue-400 absolute top-7 right-0`}
      />

      <h1 className="text-7xl">{formatTemp[selectedTemp](temp.day)}°</h1>
      <h4 className="mt-1">
        feels like {formatTemp[selectedTemp](feels_like.day)}°
      </h4>
      <h2 className="text-4xl mt-7 first-letter:capitalize">
        {weather[0].description}
      </h2>

      <WeatherDetails
        humidity={humidity}
        pressure={pressure}
        uvi={uvi}
        dew_point={dew_point}
      />

      <RainChip day={day} />
    </Timeline.Item>
  );
};
