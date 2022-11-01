import { LocationResults } from '@pages/search/LocationResults';
import { GeolocationButton } from '@pages/search/GeolocationButton';

export const LocationSelection = () => (
  <div className="mt-2 grow space-y-4 px-3">
    <GeolocationButton />

    <ul className="flex flex-col items-start gap-y-3">
      <LocationResults />
    </ul>
  </div>
);
