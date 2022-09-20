import { Fragment } from 'react';
import { Header } from '@pages/home/Header';
import { WeatherContent } from '@pages/home/WeatherContent';
import { HourlyForecasts } from '@pages/hourly/HourlyForecasts';
import { WeeklyForecasts } from '@pages/weekly/WeeklyForecasts';
import { MediaQuery } from '@components/MediaQuery';

export const MainPage = () => (
  <Fragment>
    <Header />
    <main className="pb-4 lg:contents lg:pb-0">
      <WeatherContent />
      <MediaQuery>
        <HourlyForecasts />
        <WeeklyForecasts />
      </MediaQuery>
    </main>
  </Fragment>
);
