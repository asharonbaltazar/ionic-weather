import React from 'react';
import { Tabs } from '@mantine/core';
import { WeatherTimeline } from '@components/WeatherTimeline';
import { NextSevenDays } from '@components/NextSevenDays';

export const Content = () => (
  <Tabs className="px-3 mt-14" variant="pills" radius="xl" defaultValue="today">
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
