import React, { Fragment } from 'react';
import { RootState, useAppDispatch } from '@store';
import { setRecentQuery } from '@slices/searchSlice';
import { getWeather } from '@slices/weatherSlice';
import { useSelector } from 'react-redux';
import { SkeletonResults } from '@pages/Main/SearchDrawer/SkeletonResults';
import { ButtonWithIcon } from '@components/ButtonWithIcon';
import { useHistory } from 'react-router';
import { Icon } from '@iconify/react';

type Text = { mainText: string; secondaryText: string };

export const LocationResults = () => {
  const history = useHistory();

  const dispatch = useAppDispatch();

  const { queries, recentQueries, loading, errors } = useSelector(
    (state: RootState) => state.searchSlice
  );

  const getLatLong = (text: Text, id: string) => {
    setTimeout(() => {
      dispatch(setRecentQuery({ text, id }));
    }, 200);
    dispatch(getWeather(id));

    history.goBack();
  };

  if (loading) {
    return <SkeletonResults />;
  }

  if (queries.length) {
    return (
      <Fragment>
        {queries.map(({ place_id, text }: any) => (
          <li key={place_id} className="w-full">
            <ButtonWithIcon
              icon="tabler:map-pin"
              onClick={() => getLatLong(text, place_id)}
            >
              {text.mainText}
              <span className="text-gray-400 block">{text.secondaryText}</span>
            </ButtonWithIcon>
          </li>
        ))}
      </Fragment>
    );
  }

  if (recentQueries.length) {
    return (
      <Fragment>
        <li>
          <span className="text-gray-500 text-sm pl-1 font-medium">
            Recent searches
          </span>
        </li>
        {recentQueries.map(({ text, id }: any, i) => (
          <li key={i} className="w-full">
            <ButtonWithIcon
              icon="tabler:map-pin"
              onClick={() => getLatLong(text, id)}
            >
              {text.mainText}
              <span className="text-gray-400">{text.secondaryText}</span>
            </ButtonWithIcon>
          </li>
        ))}
      </Fragment>
    );
  }

  if (errors.length) {
    return (
      <li className="space-y-4 flex flex-col items-center w-full mt-24">
        <Icon
          className="text-9xl text-blue-500/50 dark:text-blue-300/50"
          icon="tabler:map-off"
        />
        {errors.map((error, i) => (
          <span
            key={i}
            className="text-2xl font-medium text-gray-900/50 dark:text-stone-200/50"
          >
            {error}
          </span>
        ))}
      </li>
    );
  }

  return (
    <li className="space-y-4 flex flex-col items-center w-full mt-24">
      <Icon
        className="text-9xl text-blue-500/50 dark:text-blue-300/50"
        icon="tabler:map-search"
      />
      <span className="text-2xl font-medium text-gray-900/50 dark:text-stone-200/50">
        No recent cities
      </span>
    </li>
  );
};
