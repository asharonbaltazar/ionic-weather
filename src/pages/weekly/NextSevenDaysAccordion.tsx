import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@store';
import { Details } from '../../../interface';
import { formatTemp } from '@utilities/format';
import isBetween from 'dayjs/plugin/isBetween';
import dayjs from 'dayjs';
import { WeatherDetails } from '@components/WeatherDetails';
import { Accordion } from '@components/Accordion';

dayjs.extend(isBetween);

export const NextSevenDaysAccordion = ({
  dt,
  sunrise,
  sunset,
  temp,
  humidity,
  uvi,
  pressure,
  wind_speed,
  pop,
  weather: [{ description }],
  compass,
}: Details) => {
  const selectedTemp = useSelector(
    (state: RootState) => state.settingsSlice.tempPreference
  );

  return (
    <Accordion
      buttonChildren={
        <Fragment>
          {dayjs(dt).format('dddd, MMMM D')}
          <h2>{description.charAt(0).toUpperCase() + description.slice(1)}</h2>
          <h2>{formatTemp[selectedTemp](temp.max)}°</h2>
          <p>{formatTemp[selectedTemp](temp.min)}°</p>
        </Fragment>
      }
    >
      <WeatherDetails
        sunrise={sunrise}
        sunset={sunset}
        humidity={humidity}
        pressure={pressure}
        wind_speed={wind_speed}
        pop={pop}
        uvi={uvi}
        compass={compass}
      />
    </Accordion>
  );
};
