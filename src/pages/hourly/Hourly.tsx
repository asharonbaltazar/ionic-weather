import { Fragment } from 'react';
import { HeaderWithBackButton } from '@components/HeaderWithBackButton';
import { HourlyForecasts } from '@pages/hourly/HourlyForecasts';

export const Hourly = () => (
  <Fragment>
    <HeaderWithBackButton title="Hourly" />
    <HourlyForecasts />
  </Fragment>
);
