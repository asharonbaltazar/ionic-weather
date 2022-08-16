import React from 'react';
import { IonContent, IonRefresher, IonRefresherContent } from '@ionic/react';
import { Header } from 'src/pages/Main/Header';
import MainContent from '@components/MainContent';
import MainPagePlaceholder from '@components/MainPagePlaceholder';
import AlertModal from '@components/AlertModal';
import { useSelector } from 'react-redux';
import { useAppDispatch, RootState } from '@store';
import { refreshWeatherData } from '@slices/weatherSlice';
import '../css/main.css';
import { AppShell } from '@mantine/core';

const Main = () => {
  const dispatch = useAppDispatch();

  const { selectedWeather } = useSelector(
    (state: RootState) => state.weatherSlice
  );

  // refresher function
  const refreshWeather = (e: CustomEvent) => {
    dispatch(refreshWeatherData());
    e.detail.complete();
  };

  return (
    <AppShell>
      <Header
        address={selectedWeather.address}
        geolocation={selectedWeather.geolocation}
      />
      <IonContent>
        {selectedWeather?.weather ? (
          <>
            <IonRefresher slot="fixed" onIonRefresh={(e) => refreshWeather(e)}>
              <IonRefresherContent />
            </IonRefresher>
            <MainContent />
          </>
        ) : (
          <MainPagePlaceholder />
        )}
        <AlertModal />
      </IonContent>
    </AppShell>
  );
};

export default Main;
