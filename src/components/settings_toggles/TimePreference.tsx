import React from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@store';
import { changeTimePreference } from '@slices/settingsSlice';
import { Switch } from '../Switch';

export const TimePreference = () => {
  const { timePreference } = useSelector(
    (state: RootState) => state.settingsSlice
  );

  const dispatch = useAppDispatch();

  const checked = timePreference === 'HH:mm';

  const onClick = () =>
    dispatch(changeTimePreference(checked ? 'h a' : 'HH:mm'));

  return (
    <div className="flex justify-between items-center">
      <button
        className="p-2 flex items-center justify-between gap-x-2 w-full dark:hover:bg-slate-700 font-medium dark:text-stone-200 rounded bg-slate-100 dark:bg-zinc-800"
        onClick={onClick}
      >
        24 Hour Format:
        <Switch checked={checked} />
      </button>
    </div>
  );
};
