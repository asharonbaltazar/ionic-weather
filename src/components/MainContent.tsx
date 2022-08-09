import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { IonGrid, IonRow } from '@ionic/react';
import WeatherCard from './WeatherCard';
import Carousel from './Carousel';
import { AppContext } from '../context/app-context';
import DaysSegment from './DaysSegment';
import RainChip from './RainChip';

const MainContent = () => {
  const { segmentCarouselOption } = useContext(AppContext);
  const { details, hourly } = useSelector(
    (state: RootState) =>
      state.weatherSlice.selectedWeather.weather[segmentCarouselOption]
  );

  return (
    <IonGrid>
      <IonRow className="ion-margin-start ion-margin-end">
        <WeatherCard details={details} />
      </IonRow>
      <IonRow>
        <RainChip pop={details.pop} />
      </IonRow>
      <IonRow>
        <DaysSegment />
        <Carousel key={segmentCarouselOption} hourly={hourly} />
      </IonRow>
    </IonGrid>
  );
};

export default MainContent;
