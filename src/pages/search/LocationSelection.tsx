import { useAppDispatch } from '@store';
import { getWeatherByGeolocation } from '@slices/weatherSlice';
import { LocationResults } from '@pages/search/LocationResults';

import { ButtonWithIcon } from '@components/ButtonWithIcon';

export const LocationSelection = () => {
  const dispatch = useAppDispatch();

  const getLocation = () => dispatch(getWeatherByGeolocation());

  return (
    <div className="mt-2 grow space-y-4 px-3">
      <div className="mt-3 md:mt-5">
        <ButtonWithIcon onClick={getLocation} icon="tabler:current-location">
          Use your current location
        </ButtonWithIcon>
      </div>

      <ul className="flex flex-col items-start gap-y-3">
        <LocationResults />
      </ul>
    </div>
  );
};
