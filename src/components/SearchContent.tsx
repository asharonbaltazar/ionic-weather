import React from 'react';
import {
  IonItem,
  IonIcon,
  IonLabel,
  IonContent,
  IonItemDivider,
} from '@ionic/react';
import { useHistory } from 'react-router';
import SkeletonResults from './SkeletonResults';
import SearchResult from './SearchResult';
import { locateOutline, locateSharp } from 'ionicons/icons';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store';
import { getWeatherByGeolocation } from '../slices/weatherSlice';
import Toast from './Toast';

const SearchContent = () => {
  const dispatch = useAppDispatch();

  const { queries, recentQueries, errors } = useSelector(
    (state: RootState) => state.searchSlice
  );

  const loading: boolean = useSelector(
    (state: RootState) => state.searchSlice.loading
  );

  const history = useHistory();

  const getLocation = () => {
    dispatch(getWeatherByGeolocation());
    history.goBack();
  };

  const SearchItems = () => {
    if (queries.length) {
      return (
        <>
          {queries.map((element: any) => (
            <SearchResult
              key={element.place_id}
              id={element.place_id}
              text={element.text}
            />
          ))}
        </>
      );
    } else if (recentQueries.length && !loading) {
      return (
        <>
          <IonItemDivider>Recent searches</IonItemDivider>
          {recentQueries.map((element: any) => (
            <SearchResult
              key={element.id}
              id={element.id}
              text={element.text}
            />
          ))}
        </>
      );
    }
    return loading ? <SkeletonResults /> : null;
  };

  return (
    <IonContent>
      <IonItem
        className="ion-margin-top ion-margin-bottom"
        button
        onClick={() => getLocation()}
        detail={false}
      >
        <IonIcon
          color={'primary'}
          ios={locateOutline}
          md={locateSharp}
          slot="start"
        />
        <IonLabel>Use your current location</IonLabel>
      </IonItem>
      <SearchItems />
      {errors.map((element, index) => (
        <Toast key={index} error={element} time={2000} slice={'search'} />
      ))}
    </IonContent>
  );
};

export default SearchContent;
