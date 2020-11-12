import React, { CSSProperties } from "react";
import Searchbar from "../components/Searchbar";
import SearchContent from "../components/SearchContent";
import {
  IonToolbar,
  IonPage,
  IonHeader,
  IonFooter,
  IonTitle,
} from "@ionic/react";
import lightLogo from "../assets/google_light.png";
import darkLogo from "../assets/google_dark.png";

const SearchModal = () => {
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <Searchbar />
        </IonToolbar>
      </IonHeader>
      <SearchContent />
      <IonFooter className="ion-no-border">
        <IonToolbar>
          <IonTitle slot="end">
            <picture>
              <source srcSet={darkLogo} media="(prefers-color-scheme: dark)" />
              <img style={imgStyle} src={lightLogo} alt={"google logo"} />
            </picture>
          </IonTitle>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

const imgStyle: CSSProperties = {
  height: "25px",
  width: "150px",
  objectFit: "contain",
};

export default SearchModal;
