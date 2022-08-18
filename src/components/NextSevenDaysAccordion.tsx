import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@store';
import { Details } from '../../interface';
import { formatTemp } from '@utilities/format';
import isBetween from 'dayjs/plugin/isBetween';
import dayjs from 'dayjs';
import WeatherDetails from '@components/WeatherDetails';
import { Accordion } from '@mantine/core';
import { AccordionItemProps } from '@mantine/core';
dayjs.extend(isBetween);

type NextSevenDaysAccordionProps = AccordionItemProps & Details;

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
  ...accordionItemProps
}: NextSevenDaysAccordionProps) => {
  const selectedTemp = useSelector(
    (state: RootState) => state.settingsSlice.tempPreference
  );

  return (
    <Accordion.Item {...accordionItemProps}>
      <Accordion.Control>
        {dayjs(dt).format('dddd, MMMM D')}
        <h2>
          {description.charAt(0).toUpperCase() + description.slice(1)}
        </h2>{' '}
        <h2>{formatTemp[selectedTemp](temp.max)}°</h2>
        <p>{formatTemp[selectedTemp](temp.min)}°</p>
      </Accordion.Control>
      <Accordion.Panel className="text-gray-900">
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
      </Accordion.Panel>
    </Accordion.Item>
  );
};
