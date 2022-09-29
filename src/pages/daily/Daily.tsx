import { Fragment } from 'react';
import { HeaderWithBackButton } from '@components/HeaderWithBackButton';
import { DailyForecasts } from '@pages/daily/DailyForecasts';
import { MediaQuery } from '@components/MediaQuery';
import { Navigate } from 'react-router-dom';

export const Daily = () => (
  <MediaQuery>
    {(matches) =>
      matches ? (
        <Navigate to="/" />
      ) : (
        <Fragment>
          <HeaderWithBackButton title="Weekly" />
          <DailyForecasts />
        </Fragment>
      )
    }
  </MediaQuery>
);
