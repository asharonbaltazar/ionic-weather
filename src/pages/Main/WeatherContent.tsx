import React from 'react';
import { Tab } from '@headlessui/react';
import { WeatherTimeline } from '@components/WeatherTimeline';
import { MainPlaceholder } from '@pages/main/MainPagePlaceholder';
import { useSelector } from 'react-redux';
import { RootState } from '@store';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

export const WeatherContent = () => {
  const weather = useSelector((state: RootState) => state.weatherSlice);

  if (!weather?.selectedWeather?.weather) {
    return <MainPlaceholder />;
  }

  return (
    <Tab.Group as="main">
      <Tab.List className="flex items-center justify-between px-3 mt-4">
        <div className="flex items-center gap-x-2">
          <Tab className="btn">Today</Tab>
          <Tab className="btn">Tomorrow</Tab>
        </div>
        <Link className="btn flex items-center gap-x-2" to="/week">
          Next Week
          <Icon
            className="text-xl md:text-2xl text-blue-500 dark:text-slate-400"
            icon="tabler:arrow-narrow-right"
          />
        </Link>
      </Tab.List>
      <Tab.Panels className="px-3">
        <Tab.Panel>
          <WeatherTimeline day="today" />
        </Tab.Panel>
        <Tab.Panel>
          <WeatherTimeline day="tomorrow" />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};
