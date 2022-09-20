import { useEffect } from 'react';
import { LocationInput } from '@pages/search/LocationInput';
import { LocationSelection } from '@pages/search/LocationSelection';
import { GoogleAttribution } from '@pages/search/GoogleAttribution';
import { HeaderWithBackButton } from '@components/HeaderWithBackButton';
import { useAppDispatch } from '@store';
import { resetPredictions } from '@slices/searchSlice';

export const Search = () => {
  const dispatch = useAppDispatch();

  useEffect(
    () => () => {
      dispatch(resetPredictions());
    },
    [dispatch]
  );

  return (
    <div className="flex h-screen flex-col">
      <HeaderWithBackButton title="Search" />
      <LocationInput />

      <LocationSelection />

      <GoogleAttribution />
    </div>
  );
};
