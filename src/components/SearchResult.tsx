import React, { useContext } from "react";
import { IonItem, IonLabel, IonIcon, IonNote } from "@ionic/react";
import { locationSharp, locationOutline } from "ionicons/icons";
import { AppContext } from "../context/app-context";
import { useDispatch } from "react-redux";
import { setRecentQuery } from "../slices/searchSlice";
import { getWeather } from "../slices/weatherSlice";

interface IProps {
  text: text;
  id: string;
}
interface text {
  main_text: string;
  secondary_text: string;
}

const SearchResult: React.FC<IProps> = ({ text, id }) => {
  const { toggleSearchModal } = useContext(AppContext);

  const dispatch = useDispatch();
  const getLatLong = () => {
    dispatch(setRecentQuery({ text, id }));
    dispatch(getWeather(id));
    toggleSearchModal();
  };

  return (
    <IonItem button onClick={getLatLong} detail={false}>
      <IonIcon
        color={"primary"}
        ios={locationOutline}
        md={locationSharp}
        slot="start"
      />
      <IonLabel>
        {text.main_text}
        <br />
        <IonNote>{text.secondary_text}</IonNote>
      </IonLabel>
    </IonItem>
  );
};

export default SearchResult;
