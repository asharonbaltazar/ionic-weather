import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@store';
import { Timeline } from '@mantine/core';
import {
  formatTemp,
  formatIconTime,
  timeIsWithinTimes,
} from '@utilities/format';
import dayjs from 'dayjs';
import { TimelineItemProps } from '@mantine/core';

interface WeatherTimelineItemProps extends TimelineItemProps {
  time: string;
  temp: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  pop?: number;
}

export const WeatherTimelineItem = ({
  time,
  temp,
  weather: [{ id }],
  pop,
  ...rest
}: WeatherTimelineItemProps) => {
  const selectedTemp = useSelector(
    (state: RootState) => state.settingsSlice.tempPreference
  );

  const selectedTime = useSelector(
    (state: RootState) => state.settingsSlice.timePreference
  );

  const { iconTimes } = useSelector(
    (state: RootState) => state.weatherSlice.selectedWeather
  );

  const icon = formatIconTime(timeIsWithinTimes(time, iconTimes));

  return (
    <Timeline.Item
      className="text-gray-400"
      title={dayjs(time).format(selectedTime)}
      bullet={
        <i className={`wi wi-owm-${icon}-${id} weather-icon text-blue-500`} />
      }
      {...rest}
    >
      <span className="text-gray-400">{formatTemp[selectedTemp](temp)}°</span>
    </Timeline.Item>
  );
};
