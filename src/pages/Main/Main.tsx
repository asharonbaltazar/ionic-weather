import React, { Fragment } from 'react';
import { Header } from '@pages/Main/Header';
import { WeatherContent } from '@pages/Main/WeatherContent';

export const Main = () => (
  <Fragment>
    <Header />
    <WeatherContent />
  </Fragment>
);
