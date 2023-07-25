import { Fragment } from 'react';
import { useAppSelector } from '@store';
import { SkeletonResults } from '@pages/search/SkeletonResults';
import { ButtonWithIcon } from '@components/ButtonWithIcon';
import { ClearRecentLocations } from '@pages/search/ClearRecentLocations';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { GMapPrediction } from '@functions/types';
import { useLazyGeocodeByPlaceIdQuery } from '@slices/location';

type Text = { mainText: string; secondaryText: string };

type LocationResultsProps = {
  locations: GMapPrediction[];
  isFetching: boolean;
};

export const LocationResults = ({
  locations,
  isFetching,
}: LocationResultsProps) => {
  const navigate = useNavigate();

  const [getGeocode] = useLazyGeocodeByPlaceIdQuery();
  const { recentLocations } = useAppSelector((state) => state.app);

  const selectGeoCode = async (text: Text, placeId: string) => {
    const { isSuccess } = await getGeocode({ text, placeId });

    if (isSuccess) {
      navigate('/');
    }
  };

  if (isFetching) {
    return <SkeletonResults />;
  }

  if (locations.length) {
    return (
      <Fragment>
        {locations.map(({ placeId, text }) => (
          <li key={placeId} className="w-full">
            <ButtonWithIcon
              icon="tabler:map-pin"
              onClick={() => selectGeoCode(text, placeId)}
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
        <li className="flex w-full items-center justify-between px-1">
          <span className="text-sm font-medium text-gray-500">
            Recent searches
          </span>

          <ClearRecentLocations />
        </li>
        {recentLocations.map(({ text, placeId }, i) => (
          <li key={i} className="w-full">
            <ButtonWithIcon
              icon="tabler:map-pin"
              onClick={() => selectGeoCode(text, placeId)}
            >
              {text.mainText}
              <span className="text-gray-400">{text.secondaryText}</span>
            </ButtonWithIcon>
          </li>
        ))}
      </Fragment>
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
