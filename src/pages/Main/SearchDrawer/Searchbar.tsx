import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPlacesBySearch,
  resetQueries,
  setSearchLoading,
} from '@slices/searchSlice';
import { Loader, TextInput } from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import { RootState } from '@store';

export const Searchbar = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.searchSlice);

  const [debouncedSearchState, setDebouncedSearchState] = useDebouncedState(
    '',
    750
  );

  useEffect(() => {
    if (debouncedSearchState.length) {
      dispatch(getPlacesBySearch(debouncedSearchState));
    }

    return () => {
      dispatch(resetQueries());
    };
  }, [debouncedSearchState]);

  const onSearch = (newSearchTerm: string) => {
    if (newSearchTerm.trim().length) {
      dispatch(setSearchLoading(true));
      setDebouncedSearchState(newSearchTerm);
    } else {
      dispatch(resetQueries());
    }
  };

  return (
    <label className="space-y-2">
      <h1 className="text-3xl text-gray-900 mt-16 font-semibold">
        Search Locations
      </h1>
      <TextInput
        placeholder="e.g. Baltimore"
        onChange={(e) => onSearch(e.currentTarget.value)}
        rightSection={loading && <Loader size="xs" />}
        size="md"
      />
    </label>
  );
};
