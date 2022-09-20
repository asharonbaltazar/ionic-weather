import { Fragment } from 'react';
import { Header } from '@pages/main/Header';
import { WeatherContent } from '@pages/main/WeatherContent';
import { HourlyForecasts } from '@pages/hourly/HourlyForecasts';
import { WeeklyForecasts } from '@pages/weekly/WeeklyForecasts';
import { MediaQuery } from '@components/MediaQuery';

export const MainPage = () => (
  <Fragment>
    <Header />
    <main className="lg:contents">
      <WeatherContent />
      <MediaQuery>
        <HourlyForecasts />
        <WeeklyForecasts />
      </MediaQuery>
    </main>
  </Fragment>
);
