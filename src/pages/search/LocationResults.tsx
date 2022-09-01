import { Fragment } from 'react';
import { RootState, useAppDispatch } from '@store';
import { setRecentQuery } from '@slices/searchSlice';
import { getWeather } from '@slices/weatherSlice';
import { useSelector } from 'react-redux';
import { SkeletonResults } from '@pages/search/SkeletonResults';
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

  const getLatLong = (text: Text, placeId: string) => {
    setTimeout(() => {
      dispatch(setRecentQuery({ text, placeId }));
    }, 200);
    dispatch(getWeather(placeId));

    history.goBack();
  };

  if (loading) {
    return <SkeletonResults />;
  }

  if (queries.length) {
    return (
      <Fragment>
        {queries.map(({ placeId, text }) => (
          <li key={placeId} className="w-full">
            <ButtonWithIcon
              icon="tabler:map-pin"
              onClick={() => getLatLong(text, placeId)}
            >
              {text.mainText}
              <span className="block text-gray-400">{text.secondaryText}</span>
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
          <span className="pl-1 text-sm font-medium text-gray-500">
            Recent searches
          </span>
        </li>
        {recentQueries.map(({ text, placeId }, i) => (
          <li key={i} className="w-full">
            <ButtonWithIcon
              icon="tabler:map-pin"
              onClick={() => getLatLong(text, placeId)}
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
      <li className="mt-24 flex w-full flex-col items-center space-y-4">
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
    <li className="mt-24 flex w-full flex-col items-center space-y-4">
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
