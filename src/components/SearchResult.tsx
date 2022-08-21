import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '@store';
import { setRecentQuery } from '@slices/searchSlice';
import { getWeather } from '@slices/weatherSlice';
import { Button } from '@mantine/core';
import { Icon } from '@iconify/react';

interface Text {
  mainText: string;
  secondaryText: string;
}
interface IProps {
  text: Text;
  id: string;
}

export const SearchResult = ({ text, id }: IProps) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const getLatLong = () => {
    // timeout so the setRecentQuery filtering doesn't happen on-screen
    setTimeout(() => {
      dispatch(setRecentQuery({ text, id }));
    }, 200);
    dispatch(getWeather(id));
    history.goBack();
  };

  return (
    <Button
      className="p-0"
      onClick={getLatLong}
      leftIcon={<Icon icon="tabler:map-pin" />}
      variant="white"
    >
      {text.mainText}
      <br />
      {text.secondaryText}
    </Button>
  );
};
