import React from 'react';
import { Badge } from '@mantine/core';
import { useSelector } from 'react-redux';
import { RootState } from '@store';

interface RainChipProps {
  day: 'today' | 'tomorrow';
}

export const RainChip = ({ day }: RainChipProps) => {
  const { weather } = useSelector(
    (state: RootState) => state.weatherSlice.selectedWeather
  );

  const {
    details: { pop },
  } = weather[day];

  if (pop && pop < 0.1) {
    return null;
  }

  return (
    <Badge
      className="w-full justify-start"
      variant="outline"
      size="lg"
      fullWidth
    >
      {Math.floor(pop * 100)}% chance of rain
    </Badge>
  );
};
