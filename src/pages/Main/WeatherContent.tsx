import React from 'react';
import { Tabs } from '@mantine/core';
import { WeatherTimeline } from '@components/WeatherTimeline';
import { NextSevenDays } from '@components/NextSevenDays';
import { MainPlaceholder } from '@pages/main/MainPagePlaceholder';
import { useSelector } from 'react-redux';
import { RootState } from '@store';

export const WeatherContent = () => {
  const weather = useSelector((state: RootState) => state.weatherSlice);

  if (!weather?.selectedWeather?.weather) {
    return <MainPlaceholder />;
  }

  return (
    <Tabs
      className="px-3 mt-14"
      variant="pills"
      radius="xl"
      defaultValue="today"
    >
      <Tabs.List>
        <Tabs.Tab value="today">Today</Tabs.Tab>
        <Tabs.Tab value="tomorrow">Tomorrow</Tabs.Tab>
        <Tabs.Tab className="ml-auto" value="nextSevenDays">
          Next 7 Days
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="today">
        <WeatherTimeline day="today" />
      </Tabs.Panel>

      <Tabs.Panel value="tomorrow">
        <WeatherTimeline day="tomorrow" />
      </Tabs.Panel>

      <Tabs.Panel value="nextSevenDays">
        <NextSevenDays />
      </Tabs.Panel>
    </Tabs>
  );
};
