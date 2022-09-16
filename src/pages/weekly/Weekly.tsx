import { Fragment } from 'react';
import { HeaderWithBackButton } from '@components/HeaderWithBackButton';
import { WeeklyForecasts } from './WeeklyForecasts';

export const Weekly = () => (
  <Fragment>
    <HeaderWithBackButton title="Weekly" />
    <WeeklyForecasts />
  </Fragment>
);
