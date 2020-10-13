import React from "react";
import { useDispatch } from "react-redux";
import { setRecentQuery } from "../slices/searchSlice";
import { IonItem, IonLabel, IonIcon, IonNote } from "@ionic/react";
import { locationSharp, locationOutline } from "ionicons/icons";

interface IProps {
  text: text;
  id: string;
}
interface text {
  main_text: string;
  secondary_text: string;
}

const SearchResult: React.FC<IProps> = ({ text, id }) => {
  const dispatch = useDispatch();
  const getLatLong = () => {
    dispatch(setRecentQuery({ text, id }));
  };

  return (
    <IonItem button onClick={getLatLong}>
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
