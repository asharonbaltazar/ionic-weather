import { Fragment, useState } from 'react';
import { useAppDispatch } from '@store';
import { changeTempPreference, Temperature } from '@slices/settingsSlice';
import { Modal } from '@components/Modal';
import { RadioGroup } from '@components/RadioGroup';
import { useSettings } from '@utilities/hooks';

const TEMP_MAP: { [key in Temperature]: string } = {
  c: 'Celsius',
  f: 'Fahrenheit',
  k: 'Kelvin',
};

const TEMP_OPTIONS: { value: Temperature; label: string }[] = [
  { value: 'c', label: 'Celsius' },
  { value: 'f', label: 'Fahrenheit' },
  { value: 'k', label: 'Kelvin' },
];

export const TempPreference = () => {
  const [modalState, setModalState] = useState(false);

  const { temperature } = useSettings();

  const dispatch = useAppDispatch();

  const onTempChange = (newValue: Temperature) => {
    dispatch(changeTempPreference(newValue));
    setModalState(false);
  };

  return (
    <Fragment>
      <button
        className="flex w-full items-center justify-between gap-x-2 rounded bg-slate-100 p-2 font-medium dark:bg-zinc-800 dark:text-stone-200 dark:hover:bg-slate-700"
        onClick={() => setModalState(!modalState)}
      >
        Temperature: <span className="capitalize">{TEMP_MAP[temperature]}</span>
      </button>

      <Modal
        open={modalState}
        onClose={() => setModalState(false)}
        title="Units"
      >
        <RadioGroup
          value={temperature}
          options={TEMP_OPTIONS}
          onChange={onTempChange}
        />
      </Modal>
    </Fragment>
  );
};
