import { Fragment } from 'react';
import { HeaderWithBackButton } from '@components/HeaderWithBackButton';
import { HourlyForecasts } from '@pages/hourly/HourlyForecasts';
import { MediaQuery } from '@components/MediaQuery';
import { Navigate } from 'react-router-dom';

export const Hourly = () => (
  <MediaQuery>
    {(matches) =>
      matches ? (
        <Navigate to="/" />
      ) : (
        <Fragment>
          <HeaderWithBackButton title="Hourly" />
          <main>
            <HourlyForecasts />
          </main>
        </Fragment>
      )
    }
  </MediaQuery>
);
