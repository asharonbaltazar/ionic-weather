import React from 'react';

import { Timeline } from '@mantine/core';
import { HourlyWeatherTimelineItems } from '@components/HourlyWeatherTimelineItems';
import { CurrentWeatherTimelineItem } from '@components/CurrentWeatherTimelineItem';

interface WeatherTimelineProps {
  day: 'today' | 'tomorrow';
}

export const WeatherTimeline = ({ day }: WeatherTimelineProps) => {
  return (
    <Timeline bulletSize={30}>
      <CurrentWeatherTimelineItem day={day} />
      <HourlyWeatherTimelineItems day={day} />
    </Timeline>
  );
};
