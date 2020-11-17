import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { IonSearchbar, useIonViewDidEnter } from "@ionic/react";
import { useDispatch } from "react-redux";
import {
  getPlacesBySearch,
  resetQueries,
  setSearchLoading,
} from "../slices/searchSlice";
import { useDebouncedCallback } from "use-debounce";
import "../css/searchbar.css";

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  // Debounce function for queries
  const debounced = useDebouncedCallback(() => {
    searchTerm.length && dispatch(getPlacesBySearch(searchTerm));
  }, 750);

  useEffect(() => {
    if (!searchTerm.length) dispatch(resetQueries());

    // Second condtional tests for whitespace
    if (searchTerm.length && /\S/.test(searchTerm)) {
      dispatch(setSearchLoading(true));
      debounced.callback();
    }
  }, [searchTerm, dispatch, debounced]);

  // History
  const history = useHistory();
  // Ref required for focusing on <Searchbar />
  const keyboard = useRef<HTMLIonSearchbarElement>(null);
  // Lifecycle method for setFocus for the keyboard
  useIonViewDidEnter(() => keyboard.current?.setFocus());

  return (
    <IonSearchbar
      placeholder="Search cities"
      value={searchTerm}
      onInput={e => setSearchTerm(e.currentTarget.value!)}
      autoCorrect={"off"}
      enterkeyhint={"search"}
      showCancelButton="always"
      onIonCancel={() => history.goBack()}
      ref={keyboard}
    />
  );
};

export default Searchbar;
