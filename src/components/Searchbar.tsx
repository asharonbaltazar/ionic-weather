import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { IonSearchbar, useIonViewDidEnter } from "@ionic/react";
import { useDispatch } from "react-redux";
import {
  getPlacesBySearch,
  displaySearchQueries,
  setSearchLoading,
} from "../slices/searchSlice";
import { useDebouncedCallback } from "use-debounce";
import "../css/searchbar.css";

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const debounced = useDebouncedCallback(() => {
    dispatch(getPlacesBySearch(searchTerm));
  }, 750);

  useEffect(() => {
    if (!searchTerm.length) dispatch(displaySearchQueries([]));

    if (searchTerm.length) {
      dispatch(setSearchLoading(true));
      debounced.callback();
    }
  }, [searchTerm, dispatch, debounced]);

  // History
  const history = useHistory();
  // Component ref
  const keyboard = useRef<HTMLIonSearchbarElement>(null);
  // Lifecycle method for setFocus for the keyboard
  useIonViewDidEnter(() => keyboard.current?.setFocus());

  return (
    <IonSearchbar
      placeholder="Search cities"
      value={searchTerm}
      onIonChange={e => setSearchTerm(e.detail.value!)}
      autoCorrect={"off"}
      enterkeyhint={"search"}
      showCancelButton="always"
      onIonCancel={() => history.goBack()}
      ref={keyboard}
    />
  );
};

export default Searchbar;
