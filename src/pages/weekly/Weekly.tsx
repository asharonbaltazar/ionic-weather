import { Fragment } from 'react';
import { HeaderWithBackButton } from '@components/HeaderWithBackButton';
import { WeeklyForecasts } from '@pages/weekly/WeeklyForecasts';
import { MediaQuery } from '@components/MediaQuery';
import { Redirect } from 'react-router';

export const Weekly = () => (
  <MediaQuery>
    {(matches) =>
      matches ? (
        <Redirect to="/" />
      ) : (
        <Fragment>
          <HeaderWithBackButton title="Weekly" />
          <WeeklyForecasts />
        </Fragment>
      )
    }
  </MediaQuery>
);
