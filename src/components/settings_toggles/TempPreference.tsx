import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@store';
import { changeTempPreference } from '@slices/settingsSlice';
import { Modal, Radio } from '@mantine/core';
import { State } from '@components/State';

export const TempPreference = () => {
  const { tempPreference } = useSelector(
    (state: RootState) => state.settingsSlice
  );

  const dispatch = useAppDispatch();

  return (
    <State state={false}>
      {([modalState, setModalState]) => (
        <Fragment>
          <button onClick={() => setModalState(!modalState)}>
            Temperature: <span className="capitalize">{tempPreference}</span>
          </button>

          <Modal opened={modalState} onClose={() => setModalState(false)}>
            <Radio.Group
              value={tempPreference}
              onChange={(newTempPreference) =>
                dispatch(changeTempPreference(newTempPreference))
              }
              label="Units"
            >
              <Radio value="celsius" label="Celsius" />
              <Radio value="fahrenheit" label="Fahrenheit" />
              <Radio value="kelvin" label="Kelvin" />
            </Radio.Group>
          </Modal>
        </Fragment>
      )}
    </State>
  );
};
