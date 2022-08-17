import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@store';
import { AppContext } from '@context/app-context';
import WeatherCard from '@components/WeatherCard';
import Carousel from '@components/Carousel';
import { DaysToggle } from 'src/components/DaysToggle';
import { RainChip } from '@components/RainChip';

export const Content = () => {
  const [day, setDay] = useState<'today' | 'tomorrow'>('today');
  const { segmentCarouselOption } = useContext(AppContext);

  const { details, hourly } = useSelector(
    (state: RootState) =>
      state.weatherSlice.selectedWeather.weather[segmentCarouselOption]
  );

  return (
    <div className="mt-16 px-3">
      <WeatherCard details={details} />
      <RainChip day={day} />
      <DaysToggle day={day} setDay={setDay} />
      <Carousel key={segmentCarouselOption} hourly={hourly} />
    </div>
  );
};
