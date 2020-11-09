import React from "react";
import {
  IonItem,
  IonIcon,
  IonLabel,
  IonContent,
  IonItemDivider,
} from "@ionic/react";
import { useHistory } from "react-router";
import SkeletonResults from "./SkeletonResults";
import SearchResult from "./SearchResult";
import { locateOutline, locateSharp } from "ionicons/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { getWeatherByGeolocation } from "../slices/weatherSlice";

const SearchModalContent = () => {
  const dispatch = useDispatch();
  const searchResults = useSelector(
    (state: RootState) => state.searchSlice.queries
  );
  const recentSearches = useSelector(
    (state: RootState) => state.searchSlice.recentQueries
  );

  const loading: boolean = useSelector(
    (state: RootState) => state.searchSlice.loading
  );

  const history = useHistory();

  const getLocation = () => {
    dispatch(getWeatherByGeolocation());
    history.goBack();
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
          color={"primary"}
          ios={locateOutline}
          md={locateSharp}
          slot="start"
        />
        <IonLabel>Use your current location</IonLabel>
      </IonItem>
      {searchResults.length ? (
        searchResults.map((element: any) => (
          <SearchResult
            key={element.place_id}
            id={element.place_id}
            text={element.text}
          />
        ))
      ) : (
        <>
          {recentSearches.length && !loading ? (
            <>
              <IonItemDivider>Recent searches</IonItemDivider>
              {recentSearches.map((element: any) => (
                <SearchResult
                  key={element.id}
                  id={element.id}
                  text={element.text}
                />
              ))}
            </>
          ) : (
            <>{loading && <SkeletonResults />}</>
          )}
        </>
      )}
    </IonContent>
  );
};

export default SearchModalContent;
