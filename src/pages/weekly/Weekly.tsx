import { Fragment } from 'react';
import { HeaderWithBackButton } from '@components/HeaderWithBackButton';
import { WeeklyForecasts } from '@pages/weekly/WeeklyForecasts';
import { MediaQuery } from '@components/MediaQuery';
import { Navigate } from 'react-router-dom';

export const Weekly = () => (
  <MediaQuery>
    {(matches) =>
      matches ? (
        <Navigate to="/" />
      ) : (
        <Fragment>
          <HeaderWithBackButton title="Weekly" />
          <WeeklyForecasts />
        </Fragment>
      )
    }
  </MediaQuery>
);
