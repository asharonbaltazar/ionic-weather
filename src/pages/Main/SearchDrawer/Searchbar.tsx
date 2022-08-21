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

const Searchbar = () => {
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
    <TextInput
      placeholder="Search cities"
      onChange={(e) => onSearch(e.currentTarget.value)}
      rightSection={loading && <Loader size="xs" />}
    />
  );
};

export default Searchbar;
