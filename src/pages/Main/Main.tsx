import { Fragment } from 'react';
import { Header } from 'src/pages/Main/Header';
import { WeatherContent } from 'src/pages/Main/WeatherContent';

export const Main = () => (
  <Fragment>
    <Header />
    <WeatherContent />
  </Fragment>
);
