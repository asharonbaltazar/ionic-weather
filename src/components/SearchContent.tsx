import React from 'react';
import { useHistory } from 'react-router';
import SkeletonResults from '@components/SkeletonResults';
import { SearchResult } from '@components/SearchResult';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@store';
import { getWeatherByGeolocation } from '@slices/weatherSlice';
import Toast from '@components/Toast';
import { Button, Divider } from '@mantine/core';
import { Icon } from '@iconify/react';

const SearchContent = () => {
  const dispatch = useAppDispatch();

  const { queries, recentQueries, errors } = useSelector(
    (state: RootState) => state.searchSlice
  );

  const loading: boolean = useSelector(
    (state: RootState) => state.searchSlice.loading
  );

  const history = useHistory();

  const getLocation = () => {
    dispatch(getWeatherByGeolocation());
    history.goBack();
  };

  const SearchItems = () => {
    if (queries.length) {
      return (
        <div className="flex flex-col items-start gap-y-2">
          {queries.map((element: any) => (
            <SearchResult
              key={element.place_id}
              id={element.place_id}
              text={element.text}
            />
          ))}
        </div>
      );
    } else if (recentQueries.length && !loading) {
      return (
        <>
          Recent searches
          <Divider />
          {recentQueries.map((element: any) => (
            <SearchResult
              key={element.id}
              id={element.id}
              text={element.text}
            />
          ))}
        </>
      );
    }
    return loading ? <SkeletonResults /> : null;
  };

  return (
    <div>
      <Button
        className="p-0"
        onClick={getLocation}
        leftIcon={<Icon icon="tabler:current-location" />}
        variant="white"
      >
        Use your current location
      </Button>
      <Divider />
      <SearchItems />
      {errors.map((element, index) => (
        <Toast key={index} error={element} time={2000} slice={'search'} />
      ))}
    </div>
  );
};

export default SearchContent;
