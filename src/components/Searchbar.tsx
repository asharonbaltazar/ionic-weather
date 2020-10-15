import React, { useState, useEffect } from "react";
import { IonSearchbar } from "@ionic/react";
import { useDispatch } from "react-redux";
import {
  getPlacesBySearch,
  displaySearchQueries,
  setLoading,
} from "../slices/searchSlice";
// import { useDebouncedCallback } from "use-debounce";

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingTerm, setLoadingTerm] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!searchTerm.length) dispatch(displaySearchQueries([]));

    dispatch(getPlacesBySearch(searchTerm));
  }, [searchTerm, dispatch]);

  // const debounced = useDebouncedCallback(value => {
  //   setSearchTerm(value);
  // }, 750);

  return (
    <IonSearchbar
      placeholder="Search places"
      value={searchTerm}
      onIonChange={e => setSearchTerm(e.detail.value!)}
      debounce={750}
      autoCorrect={"off"}
      enterkeyhint={"search"}
      animated
    />
  );
};

export default Searchbar;
