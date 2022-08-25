import React, { useEffect } from 'react';
import { LocationInput } from '@pages/Main/SearchDrawer/LocationInput';
import { LocationSelection } from '@pages/Main/SearchDrawer/LocationSelection';
import { GoogleAttribution } from '@pages/Main/SearchDrawer/GoogleAttribution';
import { HeaderWithBackButton } from '@components/HeaderWithBackButton';
import { useAppDispatch } from '@store';
import { resetQueries } from 'src/slices/searchSlice';

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
