import { Fragment, useState } from 'react';
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
        className="text flex w-full items-center justify-between gap-x-2 rounded bg-slate-100 p-2 font-medium dark:bg-zinc-800 dark:hover:bg-slate-700"
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
