import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPlacesBySearch,
  resetQueries,
  setSearchLoading,
} from '@slices/searchSlice';
import { useDebouncedValue, useDidUpdate } from '@mantine/hooks';
import { RootState } from '@store';
import { Input } from '@components/Input';

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
    <div className="px-3 mt-4">
      <Input
        placeholder="e.g. Baltimore"
        label="City Name"
        onChange={(e) => onSearch(e.currentTarget.value)}
        value={locationQuery}
      />
    </div>
  );
};
