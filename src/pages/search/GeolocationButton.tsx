import { ButtonWithIcon } from '@components/ButtonWithIcon';
import { unwrapResult } from '@reduxjs/toolkit';
import { useAppDispatch } from '@store';
import { getGeolocationGeocodeResult } from '@slices/searchSlice.thunks';
import { getWeather } from '@slices/weatherSlice.thunks';

export const GeolocationButton = () => {
  const dispatch = useAppDispatch();

  const getLocation = async () =>
    dispatch(getGeolocationGeocodeResult())
      .then(unwrapResult)
      .then((g) => getWeather(g));

  return (
    <div className="mt-3 md:mt-5">
      <ButtonWithIcon onClick={getLocation} icon="tabler:current-location">
        Use your current location
      </ButtonWithIcon>
    </div>
  );
};
