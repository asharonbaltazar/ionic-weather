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

interface HourlyWeatherTimelineItemsProps extends TimelineItemProps {
  day: 'today' | 'tomorrow';
}

export const HourlyWeatherTimelineItems = ({
  day,
  ...timelineItemProps
}: HourlyWeatherTimelineItemsProps) => {
  const { weather } = useSelector(
    (state: RootState) => state.weatherSlice.selectedWeather
  );

  const { hourly } = weather[day];

  const selectedTemp = useSelector(
    (state: RootState) => state.settingsSlice.tempPreference
  );

  const selectedTime = useSelector(
    (state: RootState) => state.settingsSlice.timePreference
  );

  const { iconTimes } = useSelector(
    (state: RootState) => state.weatherSlice.selectedWeather
  );

  return (
    <>
      {hourly.map(({ weather, temp, dt }, index) => (
        <Timeline.Item
          key={index}
          className="text-gray-900"
          title={dayjs(dt).format(selectedTime)}
          bullet={
            <i
              className={`wi wi-owm-${formatIconTime(
                timeIsWithinTimes(dt, iconTimes)
              )}-${weather[0].id} weather-icon text-blue-500`}
            />
          }
          {...timelineItemProps}
        >
          <span className="text-gray-400">
            {formatTemp[selectedTemp](temp)}°
          </span>
        </Timeline.Item>
      ))}
    </>
  );
};
