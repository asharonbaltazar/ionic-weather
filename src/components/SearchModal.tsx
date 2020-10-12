import React, { useContext } from "react";
import { IonModal } from "@ionic/react";
import { AppContext } from "../context/app-context";

const SearchModal = () => {
  const appContext = useContext(AppContext);
  const { searchModal } = appContext;

  return <IonModal isOpen={searchModal}></IonModal>;
};

export default SearchModal;
