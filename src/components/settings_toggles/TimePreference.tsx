import React from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@store';
import { changeTimePreference } from '@slices/settingsSlice';
import { Switch } from '@mantine/core';

export const TimePreference = () => {
  const timePreference = useSelector(
    (state: RootState) => state.settingsSlice.timePreference
  );
  const dispatch = useAppDispatch();

  const checked = timePreference === 'HH:mm';

  return (
    <Switch
      checked={checked}
      label="24 Hour Format"
      onLabel="24 hours"
      offLabel="12 hours"
      size="md"
      onChange={() => dispatch(changeTimePreference(checked ? 'h a' : 'HH:mm'))}
    />
  );
};
