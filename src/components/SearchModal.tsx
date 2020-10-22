import React, { useContext, CSSProperties } from "react";
import Searchbar from "./Searchbar";
import SearchModalContent from "./SearchModalContent";
import {
  IonModal,
  IonToolbar,
  IonButtons,
  IonButton,
  IonNote,
  IonTitle,
} from "@ionic/react";
import lightLogo from "../assets/google_light.png";
import darkLogo from "../assets/google_dark.png";
import { AppContext } from "../context/app-context";

const SearchModal = () => {
  const { searchModal, toggleSearchModal } = useContext(AppContext);

  return (
    <IonModal isOpen={searchModal} backdropDismiss={false}>
      <IonToolbar>
        <IonTitle>Search</IonTitle>
      </IonToolbar>
      <IonToolbar>
        <IonButtons slot="end">
          <IonButton onClick={() => toggleSearchModal()}>CLOSE</IonButton>
        </IonButtons>
        <Searchbar />
      </IonToolbar>
      <SearchModalContent />
      <IonNote className="ion-padding-end ion-padding-bottom">
        <div style={imgDiv}>
          <picture>
            <source srcSet={darkLogo} media="(prefers-color-scheme: dark)" />
            <img style={imgStyle} src={lightLogo} alt={"google logo"} />
          </picture>
        </div>
      </IonNote>
    </IonModal>
  );
};

const imgDiv: CSSProperties = { display: "flex", justifyContent: "flex-end" };
const imgStyle: CSSProperties = {
  height: "25px",
  width: "150px",
  objectFit: "contain",
};

export default SearchModal;
