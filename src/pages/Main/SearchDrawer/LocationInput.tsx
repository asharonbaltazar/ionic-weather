import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPlacesBySearch,
  resetQueries,
  setSearchLoading,
} from '@slices/searchSlice';
import { TextInput } from '@mantine/core';
import { useDebouncedValue, useDidUpdate } from '@mantine/hooks';
import { RootState } from 'src/store';

export const LocationInput = () => {
  const [locationQuery, setLocationQuery] = useState('');
  const [debouncedLocationQuery] = useDebouncedValue(locationQuery, 750);

  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.searchSlice);

  useDidUpdate(() => {
    if (debouncedLocationQuery.trim().length) {
      dispatch(getPlacesBySearch(debouncedLocationQuery));
    } else {
      dispatch(resetQueries());
    }
  }, [debouncedLocationQuery]);

  const onSearch = (newQuery: string) => {
    if (!loading && newQuery.trim().length) {
      dispatch(setSearchLoading(true));
    }

    setLocationQuery(newQuery);
  };

  return (
    <label className="space-y-2">
      <h1 className="text-3xl text-gray-900 mt-16 font-semibold">
        Search Locations
      </h1>
      <TextInput
        placeholder="e.g. Baltimore"
        value={locationQuery}
        onChange={(e) => onSearch(e.currentTarget.value)}
        size="md"
        type="text"
      />
    </label>
  );
};
