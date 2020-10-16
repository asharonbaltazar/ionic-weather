import React from "react";
import SkeletonResults from "./SkeletonResults";
import SearchResult from "./SearchResult";
import {
  IonItem,
  IonIcon,
  IonLabel,
  IonContent,
  IonItemDivider,
} from "@ionic/react";
import { locate, locateSharp } from "ionicons/icons";
import { RootStateOrAny, useSelector } from "react-redux";

const SearchModalContent = () => {
  // const dispatch = useDispatch();
  const searchResults = useSelector(
    (state: RootStateOrAny) => state.search.queries
  );
  const recentSearches = useSelector(
    (state: RootStateOrAny) => state.search.recentQueries
  );

  const loading: boolean = useSelector(
    (state: RootStateOrAny) => state.search.loading
  );

  return (
    <>
      <IonContent>
        <IonItem
          className="ion-margin-top ion-margin-bottom"
          button
          onClick={() => {}}
          detail={false}
        >
          <IonIcon
            color={"primary"}
            ios={locate}
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
    </>
  );
};

export default SearchModalContent;
