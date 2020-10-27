import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { IonSearchbar, useIonViewWillEnter } from "@ionic/react";
import { useDispatch } from "react-redux";
import { getPlacesBySearch, displaySearchQueries } from "../slices/searchSlice";
import "../css/searchbar.css";

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!searchTerm.length) dispatch(displaySearchQueries([]));

    dispatch(getPlacesBySearch(searchTerm));
  }, [searchTerm, dispatch]);

  // History
  const history = useHistory();
  // Component ref
  const keyboard = useRef<HTMLIonSearchbarElement>(null);

  // Lifecycle method for setFocus for the keyboard
  useIonViewWillEnter(() => keyboard.current?.setFocus());

  return (
    <IonSearchbar
      placeholder="Search places"
      value={searchTerm}
      onIonChange={e => setSearchTerm(e.detail.value!)}
      debounce={750}
      autoCorrect={"off"}
      enterkeyhint={"search"}
      showCancelButton="always"
      onIonCancel={() => history.goBack()}
      ref={keyboard}
    />
  );
};

export default Searchbar;
