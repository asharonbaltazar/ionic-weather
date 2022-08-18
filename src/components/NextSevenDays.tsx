import React from 'react';
import { NextSevenDaysAccordion } from '@components/NextSevenDaysAccordion';
import { useSelector } from 'react-redux';
import { RootState } from '@store';
import { Accordion } from '@mantine/core';
import dayjs from 'dayjs';

export const NextSevenDays = () => {
  const nextWeeksWeather = useSelector(
    (state: RootState) => state.weatherSlice.selectedWeather.weather.nextWeek
  );

  return (
    <Accordion className="mt-4" variant="separated" radius="md" multiple>
      {nextWeeksWeather.map((element: any) => (
        <NextSevenDaysAccordion
          value={dayjs(element.dt).format('dddd, MMMM D')}
          key={element.dt}
          dt={element.dt}
          sunrise={element.sunrise}
          sunset={element.sunset}
          temp={element.temp}
          feels_like={element.feels_like}
          pressure={element.pressure}
          humidity={element.humidity}
          wind_speed={element.wind_speed}
          weather={element.weather}
          compass={element.compass}
          pop={element.pop}
          uvi={element.uvi}
        />
      ))}
    </Accordion>
  );
};
