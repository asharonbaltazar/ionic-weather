import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  getPlacesBySearch,
  resetQueries,
  setSearchLoading,
} from '@slices/searchSlice';
import { useDebouncedCallback } from 'use-debounce';
import { Loader, TextInput } from '@mantine/core';

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  // Debounce function for queries
  const debounced = useDebouncedCallback(() => {
    if (searchTerm.length) {
      dispatch(getPlacesBySearch(searchTerm));
    }
  }, 750);

  useEffect(() => {
    // Test for whitespace
    if (searchTerm.length && /\S/.test(searchTerm)) {
      dispatch(setSearchLoading(true));
      debounced.callback();
    } else {
      dispatch(resetQueries());
    }
  }, [searchTerm, dispatch, debounced]);

  return (
    <TextInput
      placeholder="Search cities"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.currentTarget.value ?? '')}
      rightSection={<Loader size="xs" />}
    />
  );
};

export default Searchbar;
