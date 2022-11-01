import { ButtonWithIcon } from '@components/ButtonWithIcon';
import { useAppDispatch } from '@store';
import { getGeolocationGeocode } from '@slices/searchSlice.thunks';
import { getWeather } from '@slices/weatherSlice.thunks';
import { unwrapResult } from '@reduxjs/toolkit';

export const GeolocationButton = () => {
  const dispatch = useAppDispatch();

  const getGeoLocation = async () =>
    dispatch(getGeolocationGeocode())
      .then(unwrapResult)
      .then((geolocationGeocode) => dispatch(getWeather(geolocationGeocode)));

  return (
    <div className="mt-3 md:mt-5">
      <ButtonWithIcon onClick={getGeoLocation} icon="tabler:current-location">
        Use your current location
      </ButtonWithIcon>
    </div>
  );
};
