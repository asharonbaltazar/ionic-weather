import React, { useContext } from "react";
import Searchbar from "./Searchbar";
import {
  IonContent,
  IonModal,
  IonToolbar,
  IonButtons,
  IonButton,
} from "@ionic/react";
import { AppContext } from "../context/app-context";

const SearchModal = () => {
  const { searchModal, toggleSearchModal } = useContext(AppContext);

  return (
    <IonModal isOpen={searchModal} backdropDismiss={false}>
      <IonContent>
        <IonToolbar>
          <IonButtons slot="secondary">
            <IonButton onClick={() => toggleSearchModal()}>CLOSE</IonButton>
          </IonButtons>
          <Searchbar />
        </IonToolbar>
      </IonContent>
    </IonModal>
  );
};

export default SearchModal;
