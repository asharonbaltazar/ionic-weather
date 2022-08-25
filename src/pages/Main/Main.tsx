import React, { Fragment } from 'react';
import { Header } from '@pages/main/Header';
import { WeatherContent } from '@pages/main/WeatherContent';

export const Main = () => (
  <Fragment>
    <Header />
    <WeatherContent />
  </Fragment>
);
