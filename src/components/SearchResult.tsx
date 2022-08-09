import React from 'react';
import { IonItem, IonLabel, IonIcon, IonNote } from '@ionic/react';
import { locationSharp, locationOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../store';
import { setRecentQuery } from '../slices/searchSlice';
import { getWeather } from '../slices/weatherSlice';

interface Text {
  mainText: string;
  secondaryText: string;
}
interface IProps {
  text: Text;
  id: string;
}

const SearchResult = ({ text, id }: IProps) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const getLatLong = () => {
    // timeout so the setRecentQuery filtering doesn't happen on-screen
    setTimeout(() => {
      dispatch(setRecentQuery({ text, id }));
    }, 200);
    dispatch(getWeather(id));
    history.goBack();
  };

  return (
    <IonItem button onClick={getLatLong} detail={false}>
      <IonIcon
        color={'primary'}
        ios={locationOutline}
        md={locationSharp}
        slot="start"
      />
      <IonLabel>
        {text.mainText}
        <br />
        <IonNote>{text.secondaryText}</IonNote>
      </IonLabel>
    </IonItem>
  );
};

export default SearchResult;
