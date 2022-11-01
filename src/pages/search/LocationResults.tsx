import { Fragment } from 'react';
import { useAppDispatch } from '@store';
import { setRecentLocation } from '@slices/searchSlice';
import { getWeather } from '@slices/weatherSlice.thunks';
import { SkeletonResults } from '@pages/search/SkeletonResults';
import { getGeocode } from '@slices/searchSlice.thunks';
import { ButtonWithIcon } from '@components/ButtonWithIcon';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useSearch } from '@utilities/hooks';
import { unwrapResult } from '@reduxjs/toolkit';

type Text = { mainText: string; secondaryText: string };

export const LocationResults = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { locations, recentLocations, loading, errors } = useSearch();

  const getGeocoding = async (text: Text, placeId: string) => {
    const geocodeLocation = unwrapResult(await dispatch(getGeocode(placeId)));

    return dispatch(getWeather(geocodeLocation))
      .then(() => navigate('/'))
      .then(() => dispatch(setRecentLocation({ text, placeId })));
  };

  if (loading) {
    return <SkeletonResults />;
  }

  if (locations.length) {
    return (
      <Fragment>
        {locations.map(({ placeId, text }) => (
          <li key={placeId} className="w-full">
            <ButtonWithIcon
              icon="tabler:map-pin"
              onClick={() => getGeocoding(text, placeId)}
            >
              {text.mainText}
              <span className="block text-gray-400">{text.secondaryText}</span>
            </ButtonWithIcon>
          </li>
        ))}
      </Fragment>
    );
  }

  if (recentLocations.length) {
    return (
      <Fragment>
        <li>
          <span className="pl-1 text-sm font-medium text-gray-500">
            Recent searches
          </span>
        </li>
        {recentLocations.map(({ text, placeId }, i) => (
          <li key={i} className="w-full">
            <ButtonWithIcon
              icon="tabler:map-pin"
              onClick={() => getGeocoding(text, placeId)}
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
