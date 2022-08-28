import React, { useEffect } from 'react';
import { LocationInput } from 'src/pages/Search/LocationInput';
import { LocationSelection } from 'src/pages/Search/LocationSelection';
import { GoogleAttribution } from 'src/pages/Search/GoogleAttribution';
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
