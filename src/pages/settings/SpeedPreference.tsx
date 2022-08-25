import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@store';
import { changeWindSpeedPreference } from '@slices/settingsSlice';
import { Modal } from '@components/Modal';
import { RadioGroup } from '@components/RadioGroup';

const WIND_SPEED_OPTIONS = [
  { value: 'miles', label: 'Miles' },
  { value: 'kilometers', label: 'Kilometers' },
];

export const SpeedPreference = () => {
  const [modalState, setModalState] = useState(false);

  const { windSpeedPreference } = useSelector(
    (state: RootState) => state.settingsSlice
  );

  const dispatch = useAppDispatch();

  const onWindSpeedChange = (newValue: string) => {
    dispatch(changeWindSpeedPreference(newValue));
    setModalState(false);
  };

  return (
    <Fragment>
      <button
        className="p-2 flex items-center justify-between gap-x-2 w-full dark:hover:bg-slate-700 font-medium dark:text-stone-200 rounded bg-slate-100 dark:bg-zinc-800"
        onClick={() => setModalState(!modalState)}
      >
        Wind Speed:
        <span className="capitalize">{windSpeedPreference}</span>
      </button>

      <Modal
        open={modalState}
        onClose={() => setModalState(false)}
        title="Units"
      >
        <RadioGroup
          value={windSpeedPreference}
          options={WIND_SPEED_OPTIONS}
          onChange={onWindSpeedChange}
        />
      </Modal>
    </Fragment>
  );
};
