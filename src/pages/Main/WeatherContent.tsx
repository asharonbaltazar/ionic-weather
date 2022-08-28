import React from 'react';
import { MainPlaceholder } from 'src/pages/Main/MainPagePlaceholder';
import { useSelector } from 'react-redux';
import { RootState } from '@store';
import { MainWeatherForecast } from 'src/pages/Main/MainWeatherForecast';
import { LinkButtonWithIcon } from '@components/LInkButtonWithIcon';

export const WeatherContent = () => {
  const weather = useSelector((state: RootState) => state.weatherSlice);

  if (!weather?.selectedWeather?.weather) {
    return <MainPlaceholder />;
  }

  return (
    <main className="px-3 mt-4 space-y-5">
      <MainWeatherForecast day="today" />
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
