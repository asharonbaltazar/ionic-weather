import { LocationInput } from '@pages/search/LocationInput';
import { GoogleAttribution } from '@pages/search/GoogleAttribution';
import { HeaderWithBackButton } from '@components/HeaderWithBackButton';
import { useLazyLocationQuery } from '@slices/location';
import { LocationResults } from '@pages/search/LocationResults';
import { GeolocationButton } from '@pages/search/GeolocationButton';

export const Search = () => {
  const [getLocationByQuery, { data: locations = [], isFetching }] =
    useLazyLocationQuery();

  return (
    <div className="flex h-screen flex-col">
      <HeaderWithBackButton title="Search" />
      <LocationInput getLocation={getLocationByQuery} />

      <div className="mt-2 grow space-y-4 px-3">
        <GeolocationButton />

        <ul className="flex flex-col items-start gap-y-3">
          <LocationResults locations={locations} isFetching={isFetching} />
        </ul>
      </div>

      <GoogleAttribution />
    </div>
  );
};
