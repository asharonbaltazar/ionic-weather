import { Fragment, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@store';
import { Modal } from '@components/Modal';
import { RadioGroup } from '@components/RadioGroup';
import { setWindSpeedPreference, WindSpeed } from '@slices/app';

const WIND_SPEED_MAP: { [key in WindSpeed]: string } = {
  mph: 'Miles',
  kph: 'Kilometers',
};

const WIND_SPEED_OPTIONS: { value: WindSpeed; label: string }[] = [
  { value: 'mph', label: 'Miles' },
  { value: 'kph', label: 'Kilometers' },
];

export const SpeedPreference = () => {
  const [modalState, setModalState] = useState(false);

  const { windSpeed } = useAppSelector((state) => state.app);

  const dispatch = useAppDispatch();

  const onWindSpeedChange = (newValue: WindSpeed) => {
    dispatch(setWindSpeedPreference(newValue));
    setModalState(false);
  };

  return (
    <Fragment>
      <button
        className="text flex w-full items-center justify-between gap-x-2 rounded bg-slate-100 p-2 font-medium dark:bg-zinc-800 dark:hover:bg-slate-700"
        onClick={() => setModalState(!modalState)}
      >
        Wind Speed:
        <span className="capitalize">{WIND_SPEED_MAP[windSpeed]}</span>
      </button>

      <Modal
        open={modalState}
        onClose={() => setModalState(false)}
        title="Units"
      >
        <RadioGroup
          value={windSpeed}
          options={WIND_SPEED_OPTIONS}
          onChange={onWindSpeedChange}
        />
      </Modal>
    </Fragment>
  );
};
