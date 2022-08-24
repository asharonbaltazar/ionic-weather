import React from 'react';
import { RootState, useAppDispatch } from '@store';
import { setRecentQuery } from '@slices/searchSlice';
import { getWeather } from '@slices/weatherSlice';
import { Button } from '@mantine/core';
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import { SkeletonResults } from '@pages/Main/SearchDrawer/SkeletonResults';

type Text = { mainText: string; secondaryText: string };

export const Result = () => {
  const dispatch = useAppDispatch();

  const { queries, recentQueries, loading } = useSelector(
    (state: RootState) => state.searchSlice
  );

  const getLatLong = (text: Text, id: string) => {
    setTimeout(() => {
      dispatch(setRecentQuery({ text, id }));
    }, 200);
    dispatch(getWeather(id));
  };

  if (loading) {
    return <SkeletonResults />;
  }

  if (queries.length) {
    return (
      <div className="flex flex-col items-start gap-y-2">
        {queries.map(({ place_id, text }: any) => (
          <Button
            key={place_id}
            className="p-0 text-xl text-blue-500"
            onClick={() => getLatLong(text, place_id)}
            leftIcon={<Icon className="text-3xl" icon="tabler:map-pin" />}
            variant="white"
          >
            {text.mainText} {text.secondaryText}
          </Button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-y-2">
      <span className="text-gray-500 text-sm pl-2"> Recent searches</span>
      {recentQueries.map(({ text, id }: any, i) => (
        <Button
          key={i}
          className="p-0 text-xl text-blue-500"
          onClick={() => getLatLong(text, id)}
          leftIcon={<Icon className="text-3xl" icon="tabler:map-pin" />}
          variant="white"
        >
          {text.mainText} {text.secondaryText}
        </Button>
      ))}
    </div>
  );
};
