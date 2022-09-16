import { Fragment } from 'react';
import { HeaderWithBackButton } from '@components/HeaderWithBackButton';
import { HourlyForecasts } from '@pages/hourly/HourlyForecasts';
import { MediaQuery } from '@components/MediaQuery';
import { Redirect } from 'react-router';

export const Hourly = () => (
  <MediaQuery>
    {(matches) =>
      matches ? (
        <Redirect to="/" />
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
