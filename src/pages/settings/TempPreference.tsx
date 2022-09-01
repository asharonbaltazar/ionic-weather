import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@store';
import { changeTempPreference } from '@slices/settingsSlice';
import { Modal } from '@components/Modal';
import { RadioGroup } from '@components/RadioGroup';

const TEMP_OPTIONS = [
  { value: 'celsius', label: 'Celsius' },
  { value: 'fahrenheit', label: 'Fahrenheit' },
  { value: 'kelvin', label: 'Kelvin' },
];

export const TempPreference = () => {
  const [modalState, setModalState] = useState(false);

  const { tempPreference } = useSelector(
    (state: RootState) => state.settingsSlice
  );

  const dispatch = useAppDispatch();

  const onTempChange = (newValue: string) => {
    dispatch(changeTempPreference(newValue));
    setModalState(false);
  };

  return (
    <Fragment>
      <button
        className="flex w-full items-center justify-between gap-x-2 rounded bg-slate-100 p-2 font-medium dark:bg-zinc-800 dark:text-stone-200 dark:hover:bg-slate-700"
        onClick={() => setModalState(!modalState)}
      >
        Temperature: <span className="capitalize">{tempPreference}</span>
      </button>

      <Modal
        open={modalState}
        onClose={() => setModalState(false)}
        title="Units"
      >
        <RadioGroup
          value={tempPreference}
          options={TEMP_OPTIONS}
          onChange={onTempChange}
        />
      </Modal>
    </Fragment>
  );
};