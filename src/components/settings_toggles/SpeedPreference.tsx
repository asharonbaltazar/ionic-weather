import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@store';
import { changeWindSpeedPreference } from '@slices/settingsSlice';
import { State } from '@components/State';
import { Modal, Radio } from '@mantine/core';

export const SpeedPreference = () => {
  const { windSpeedPreference } = useSelector(
    (state: RootState) => state.settingsSlice
  );

  const dispatch = useAppDispatch();

  return (
    <State state={false}>
      {([modalState, setModalState]) => (
        <Fragment>
          <button onClick={() => setModalState(!modalState)}>
            Wind Speed:{' '}
            <span className="capitalize">{windSpeedPreference}</span>
          </button>

          <Modal opened={modalState} onClose={() => setModalState(false)}>
            <Radio.Group
              value={windSpeedPreference}
              onChange={(newTempPreference) =>
                dispatch(changeWindSpeedPreference(newTempPreference))
              }
              label="Units"
            >
              <Radio value="kilometers" label="Kilometers" />
              <Radio value="miles" label="Miles" />
            </Radio.Group>
          </Modal>
        </Fragment>
      )}
    </State>
  );
};
