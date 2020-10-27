import React, { CSSProperties } from "react";
import Searchbar from "./Searchbar";
import SearchModalContent from "./SearchModalContent";
import { IonToolbar, IonNote, IonPage, IonHeader } from "@ionic/react";
import lightLogo from "../assets/google_light.png";
import darkLogo from "../assets/google_dark.png";

const SearchModal = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <Searchbar />
        </IonToolbar>
      </IonHeader>

      <SearchModalContent />
      <IonNote className="ion-padding-end ion-padding-bottom">
        <div style={imgDiv}>
          <picture>
            <source srcSet={darkLogo} media="(prefers-color-scheme: dark)" />
            <img style={imgStyle} src={lightLogo} alt={"google logo"} />
          </picture>
        </div>
      </IonNote>
    </IonPage>
  );
};

const imgDiv: CSSProperties = { display: "flex", justifyContent: "flex-end" };
const imgStyle: CSSProperties = {
  height: "25px",
  width: "150px",
  objectFit: "contain",
};

export default SearchModal;
