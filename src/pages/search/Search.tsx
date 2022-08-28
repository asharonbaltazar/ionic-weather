import React, { useEffect } from 'react';
import { LocationInput } from '@pages/search/LocationInput';
import { LocationSelection } from '@pages/search/LocationSelection';
import { GoogleAttribution } from '@pages/search/GoogleAttribution';
import { HeaderWithBackButton } from '@components/HeaderWithBackButton';
import { useAppDispatch } from '@store';
import { resetQueries } from '@slices/searchSlice';

export const Search = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetQueries());
    };
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <HeaderWithBackButton title="Search" />
      <LocationInput />

      <LocationSelection />

      <GoogleAttribution />
    </div>
  );
};
