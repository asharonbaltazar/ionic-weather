import React from 'react';
import { MainPlaceholder } from '@pages/main/MainPagePlaceholder';
import { useSelector } from 'react-redux';
import { RootState } from '@store';
import { CurrentWeatherTimelineItem } from './MainWeatherForecast';
import { LinkButtonWithIcon } from 'src/components/LInkButtonWithIcon';

export const WeatherContent = () => {
  const weather = useSelector((state: RootState) => state.weatherSlice);

  if (!weather?.selectedWeather?.weather) {
    return <MainPlaceholder />;
  }

  return (
    <main className="px-3 mt-4 space-y-5">
      <CurrentWeatherTimelineItem day="today" />
      <div className="space-y-2">
        <LinkButtonWithIcon icon="tabler:clock-hour-3" to="/hourly">
          Hourly Forecast
        </LinkButtonWithIcon>
        <LinkButtonWithIcon icon="tabler:calendar-event" to="/weekly">
          Weekly Forecast
        </LinkButtonWithIcon>
      </div>
    </main>
  );
};
