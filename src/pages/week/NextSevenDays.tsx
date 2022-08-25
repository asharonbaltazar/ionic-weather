import React from 'react';
import { NextSevenDaysAccordion } from 'src/pages/week/NextSevenDaysAccordion';
import { useSelector } from 'react-redux';
import { RootState } from '@store';

import { HeaderWithBackButton } from 'src/components/HeaderWithBackButton';

export const NextSevenDays = () => {
  const { nextWeek } = useSelector(
    (state: RootState) => state.weatherSlice.selectedWeather.weather
  );

  return (
    <main className="h-screen">
      <HeaderWithBackButton title="Week" />

      <div className="px-3 space-y-3 mt-4">
        {nextWeek.map((element: any) => (
          <NextSevenDaysAccordion
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
      </div>
    </main>
  );
};
